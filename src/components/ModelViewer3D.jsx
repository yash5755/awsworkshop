import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, useProgress } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ShaderBackground from "./ShaderBackground";

// ─── UV helper ────────────────────────────────────────────────────────────────
const projectUVs = (geometry) => {
  if (!geometry) return geometry;
  const cloned = geometry.clone();
  const positionAttr = cloned.attributes.position;
  if (!positionAttr) return cloned;
  const count = positionAttr.count;
  const uvs = new Float32Array(count * 2);
  const bbox = new THREE.Box3().setFromBufferAttribute(positionAttr);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const width = Math.max(size.x, 1e-5);
  const height = Math.max(size.y, 1e-5);
  for (let i = 0; i < count; i++) {
    const x = positionAttr.getX(i);
    const y = positionAttr.getY(i);
    uvs[i * 2]     = (x - bbox.min.x) / width;
    uvs[i * 2 + 1] = (y - bbox.min.y) / height;
  }
  cloned.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  cloned.attributes.uv.needsUpdate = true;
  return cloned;
};

// ─── Video element + texture factory ─────────────────────────────────────────
// Returns a stable { video, texture } pair.
// flipY = false  →  matches bounding-box UVs (Y=0 at bottom in WebGL space)
const createVideoTexture = (src) => {
  const video = document.createElement("video");
  video.src = src;
  video.crossOrigin = "anonymous";
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  // Attempt immediate play; register a gesture retry on failure
  const tryPlay = () =>
    video.play().catch(() => {
      const retry = () => { video.play().catch(() => {}); };
      document.addEventListener("click",      retry, { once: true });
      document.addEventListener("touchstart", retry, { once: true });
    });
  tryPlay();

  const texture = new THREE.VideoTexture(video);
  texture.flipY       = false;            // must match bounding-box UV orientation
  texture.colorSpace  = THREE.SRGBColorSpace;
  texture.wrapS       = THREE.ClampToEdgeWrapping;
  texture.wrapT       = THREE.ClampToEdgeWrapping;
  texture.minFilter   = THREE.LinearFilter;
  texture.magFilter   = THREE.LinearFilter;
  texture.format      = THREE.RGBAFormat;
  return { texture, video };
};

// ─── Image texture ────────────────────────────────────────────────────────────
const createImageTexture = (src) => {
  const loader  = new THREE.TextureLoader();
  const texture = loader.load(src);
  texture.flipY      = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// ─── 1. Mobile model (Laptop) ─────────────────────────────────────────────────
const MobileModel = ({ onLoad }) => {
  const { scene }                         = useGLTF("/Model/laptop-transformed.glb");
  const modelRef                          = useRef();
  const videoRef                          = useRef();   // holds the raw <video> for useFrame
  const textureRef                        = useRef();   // holds the THREE.VideoTexture

  const { texture: videoTexture, video }  = useMemo(() => createVideoTexture("/Videos/video.mp4"), []);

  // Keep a ref so useFrame can reach it without re-creating the hook
  useEffect(() => {
    videoRef.current   = video;
    textureRef.current = videoTexture;
  }, [video, videoTexture]);

  // CRITICAL: VideoTexture does NOT self-update — we must mark needsUpdate every frame
  useFrame(() => {
    if (textureRef.current && videoRef.current && !videoRef.current.paused) {
      textureRef.current.needsUpdate = true;
    }
  });

  const videoMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map:       videoTexture,
        toneMapped: false,
        side:      THREE.DoubleSide,
      }),
    [videoTexture]
  );

  useEffect(() => {
    if (!scene) return;

    // ── DEBUG: log every mesh name so you can verify "Object_4" is correct ──
    console.group("MobileModel — mesh names");
    scene.traverse((child) => {
      if (child.isMesh) console.log(child.name, child);
    });
    console.groupEnd();
    // ─────────────────────────────────────────────────────────────────────────

    scene.traverse((child) => {
      if (!child.isMesh) return;
      if (child.name === "Object_4") {
        child.geometry = projectUVs(child.geometry);
        child.material = videoMaterial;
      } else {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });

    if (modelRef.current) {
      modelRef.current.position.set(0, -2, 0);
      modelRef.current.scale.set(0.1, 0.1, 0.1);
      modelRef.current.rotation.set(0, Math.PI / 6, 0);
      gsap.timeline({ delay: 0.3 })
        .to(modelRef.current.position, { y: -0.8, duration: 1.2, ease: "power3.out" })
        .to(modelRef.current.scale,    { x: 0.65, y: 0.65, z: 0.65, duration: 1.2, ease: "back.out(1.4)" }, "<")
        .to(modelRef.current.rotation, { y: 2 * Math.PI + Math.PI / 6, duration: 1.8, ease: "power2.inOut" }, "<");
    }

    if (onLoad) onLoad();

    return () => {
      video.pause();
      video.src = "";
      video.load();
    };
  }, [scene, videoMaterial, video, onLoad]);

  return <primitive ref={modelRef} object={scene} />;
};

// ─── 2. Desktop model (Computers) ────────────────────────────────────────────
// Screen mesh names expected in computers.glb — CHANGE THESE if your GLB differs.
// Check the browser console after first load; MobileModel and DesktopModel both
// log every mesh name so you can copy the correct ones here.
const VIDEO_SCREEN_NAMES = [
  "Object_207", "Object_213", "Object_219", "Object_225", "Object_231",
];
const IMAGE_SCREEN_NAMES = [
  "Object_210", "Object_216", "Object_222", "Object_228",
];

const DesktopModel = ({ onVideoHover, onLoad }) => {
  const { scene }               = useGLTF("/Model/computers.glb");
  const { camera, gl }          = useThree();
  const modelRef                = useRef();
  const screensRef              = useRef({});
  const raycasterRef            = useRef(new THREE.Raycaster());
  const pointerRef              = useRef(new THREE.Vector2());
  const hoveredMeshRef          = useRef(null);
  const hasRotated              = useRef(false);
  const hoverOffTimerRef        = useRef(null);
  const videoRef                = useRef();
  const textureRef              = useRef();

  const { texture: videoTexture, video } = useMemo(
    () => createVideoTexture("/Videos/video.mp4"),
    []
  );
  const imageTexture = useMemo(() => createImageTexture("/image.jpg"), []);

  useEffect(() => {
    videoRef.current   = video;
    textureRef.current = videoTexture;
  }, [video, videoTexture]);

  // CRITICAL: tick VideoTexture every frame
  useFrame(() => {
    if (textureRef.current && videoRef.current && !videoRef.current.paused) {
      textureRef.current.needsUpdate = true;
    }
  });

  // Base materials — we clone per-screen below so hover can target individual meshes
  const baseVideoMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map:       videoTexture,
        toneMapped: false,
        side:      THREE.DoubleSide,
      }),
    [videoTexture]
  );

  const imageMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map:       imageTexture,
        toneMapped: false,
        side:      THREE.DoubleSide,
      }),
    [imageTexture]
  );

  const animateScreen = (mesh, isHovered) => {
    if (!mesh) return;
    gsap.to(mesh.scale, {
      x: isHovered ? 1.05 : 1,
      y: isHovered ? 1.05 : 1,
      z: isHovered ? 1.05 : 1,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  useEffect(() => {
    if (!scene) return;

    // ── DEBUG: log every mesh name ──────────────────────────────────────────
    console.group("DesktopModel — mesh names");
    scene.traverse((child) => {
      if (child.isMesh) console.log(child.name, child);
    });
    console.groupEnd();
    // ───────────────────────────────────────────────────────────────────────

    scene.traverse((child) => {
      if (!child.isMesh) return;
      if (VIDEO_SCREEN_NAMES.includes(child.name)) {
        child.geometry = projectUVs(child.geometry);
        // Clone so each screen is independently animatable
        const mat = baseVideoMat.clone();
        mat.map = videoTexture;          // share the same VideoTexture
        child.material = mat;
        screensRef.current[child.name]  = child;
      } else if (IMAGE_SCREEN_NAMES.includes(child.name)) {
        child.geometry = projectUVs(child.geometry);
        child.material = imageMaterial;
      } else {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });

    if (modelRef.current) {
      modelRef.current.position.set(0, -5, 0);
      modelRef.current.scale.set(0.5, 0.5, 0.5);
      modelRef.current.rotation.set(0, Math.PI / 4, 0);
      gsap.timeline({ delay: 0.3 })
        .to(modelRef.current.position, { y: 0, duration: 1.5, ease: "power3.out" })
        .to(
          modelRef.current.scale,
          {
            x: 1, y: 1, z: 1,
            duration: 1.5,
            ease: "back.out(1.2)",
            onComplete: () =>
              window.dispatchEvent(new CustomEvent("desktop-animation-complete")),
          },
          "<"
        );
    }

    if (onLoad) onLoad();

    return () => {
      video.pause();
      video.src = "";
      video.load();
    };
  }, [scene, baseVideoMat, imageMaterial, video, onLoad, videoTexture]);

  // ── Pointer / hover logic ─────────────────────────────────────────────────
  useEffect(() => {
    const dom = gl?.domElement;
    if (!dom) return;

    const scheduleHoverOff = () => {
      if (hoverOffTimerRef.current) return;
      hoverOffTimerRef.current = setTimeout(() => {
        hoverOffTimerRef.current = null;
        if (hoveredMeshRef.current) {
          animateScreen(hoveredMeshRef.current, false);
          hoveredMeshRef.current = null;
        }
        if (onVideoHover) onVideoHover(false);
        dom.style.cursor = "default";
      }, 120);
    };

    const cancelHoverOff = () => {
      if (hoverOffTimerRef.current) {
        clearTimeout(hoverOffTimerRef.current);
        hoverOffTimerRef.current = null;
      }
    };

    const handlePointerMove = (event) => {
      if (!hasRotated.current && modelRef.current) {
        hasRotated.current = true;
        gsap.to(modelRef.current.rotation, {
          y: modelRef.current.rotation.y + 2 * Math.PI,
          duration: 1.8,
          ease: "power2.inOut",
        });
      }

      const targets = Object.values(screensRef.current);
      if (!targets.length) { scheduleHoverOff(); return; }

      const rect = dom.getBoundingClientRect();
      pointerRef.current.x =  ((event.clientX - rect.left) / rect.width)  * 2 - 1;
      pointerRef.current.y = -((event.clientY - rect.top)  / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(pointerRef.current, camera);
      const hits = raycasterRef.current.intersectObjects(targets, true);

      if (!hits.length) { scheduleHoverOff(); return; }

      cancelHoverOff();
      const hitMesh = hits[0].object;
      if (hoveredMeshRef.current !== hitMesh) {
        if (hoveredMeshRef.current) animateScreen(hoveredMeshRef.current, false);
        hoveredMeshRef.current = hitMesh;
        animateScreen(hitMesh, true);
      }
      if (onVideoHover) onVideoHover(true);
      dom.style.cursor = "pointer";
    };

    const handlePointerLeave = () => {
      if (hoverOffTimerRef.current) clearTimeout(hoverOffTimerRef.current);
      hoverOffTimerRef.current = setTimeout(() => {
        hoverOffTimerRef.current = null;
        if (hoveredMeshRef.current) {
          animateScreen(hoveredMeshRef.current, false);
          hoveredMeshRef.current = null;
        }
        if (onVideoHover) onVideoHover(false);
        dom.style.cursor = "default";
      }, 300);
    };

    dom.addEventListener("pointermove",  handlePointerMove);
    dom.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      dom.removeEventListener("pointermove",  handlePointerMove);
      dom.removeEventListener("pointerleave", handlePointerLeave);
      cancelHoverOff();
      if (hoveredMeshRef.current) animateScreen(hoveredMeshRef.current, false);
      if (onVideoHover) onVideoHover(false);
    };
  }, [camera, gl, onVideoHover]);

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

// ─── 3. Video zoom popup ──────────────────────────────────────────────────────
const VideoZoomPopup = ({ isVisible, videoSrc }) => {
  const overlayRef   = useRef(null);
  const containerRef = useRef(null);
  const borderRef    = useRef(null);
  const videoRef     = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !containerRef.current) return;
    if (isVisible) {
      if (videoRef.current) {
        videoRef.current.muted  = false;
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {});
      }
      gsap.timeline()
        .to(overlayRef.current,   { opacity: 1, duration: 0.3, ease: "power2.out" })
        .to(containerRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");

      const shakeTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      shakeTl
        .to(borderRef.current, { x: -5, duration: 0.05 })
        .to(borderRef.current, { x:  5, duration: 0.05 })
        .to(borderRef.current, { x: -3, duration: 0.05 })
        .to(borderRef.current, { x:  0, duration: 0.05 });
      return () => shakeTl.kill();
    } else {
      if (videoRef.current) videoRef.current.muted = true;
      gsap.to(overlayRef.current,   { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(containerRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isVisible]);

  return (
    <div
      ref={overlayRef}
      style={{
        opacity: 0,
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)",
        pointerEvents: "none",
      }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div ref={containerRef} style={{ opacity: 0, transform: "scale(0.8)" }} className="relative">
        <div
          style={{ boxShadow: "0 0 60px rgba(0,217,255,0.3), 0 0 100px rgba(184,79,255,0.2)" }}
          className="absolute inset-0 rounded-lg pointer-events-none"
        />
        <div
          ref={borderRef}
          style={{
            borderImage: "linear-gradient(135deg,#00D9FF 0%,#B84FFF 100%) 1",
            boxShadow: "0 0 20px rgba(0,217,255,0.4), inset 0 0 30px rgba(184,79,255,0.1)",
          }}
          className="absolute inset-0 rounded-lg border-2 pointer-events-none"
        />
        <div
          style={{ width: "60vw", height: "60vh", maxWidth: "900px", maxHeight: "600px" }}
          className="relative bg-[#070708] rounded-lg overflow-hidden flex items-center justify-center border border-[#00D9FF]/30"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay loop muted
            style={{ filter: "contrast(1.15) brightness(1.05)" }}
            className="w-full h-full object-contain relative z-0"
          />
          <div
            style={{
              background: "repeating-linear-gradient(0deg,rgba(0,217,255,0.02) 0px,rgba(0,217,255,0.02) 1px,transparent 1px,transparent 3px)",
              animation: "scanline 12s linear infinite",
            }}
            className="absolute inset-0 pointer-events-none z-10 opacity-20"
          />
          {[
            "top-3 left-3 border-t-2 border-l-2 border-[#00D9FF] rounded-tl-sm",
            "top-3 right-3 border-t-2 border-r-2 border-[#B84FFF] rounded-tr-sm",
            "bottom-3 left-3 border-b-2 border-l-2 border-[#B84FFF] rounded-bl-sm",
            "bottom-3 right-3 border-b-2 border-r-2 border-[#00D9FF] rounded-br-sm",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-12 h-12 ${cls} opacity-80 pointer-events-none z-10`} />
          ))}
        </div>
      </div>
      <style>{`@keyframes scanline{0%{transform:translateY(0)}100%{transform:translateY(100%)}}`}</style>
    </div>
  );
};

// ─── 4. Preloader ─────────────────────────────────────────────────────────────
const Loader = ({ onLoadComplete }) => {
  const { active, progress, loaded, total } = useProgress();
  const [visible,  setVisible]  = useState(true);
  const [slowWarn, setSlowWarn] = useState(false);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => { setVisible(false); onLoadComplete?.(); }, 300);
      return () => clearTimeout(t);
    }
  }, [active, progress, onLoadComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setSlowWarn(true), 8000);
    const t2 = setTimeout(() => {
      if (visible) { setVisible(false); onLoadComplete?.(); }
    }, 15000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible, onLoadComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0015] to-black" />
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            AWS & DevOps<span className="text-[#9810FA]">Workshop</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Loading immersive 3D goodness</p>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="text-white text-4xl font-semibold tracking-tight">{Math.round(progress)}%</div>
          <div className="w-full max-w-xs sm:max-w-sm mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9810FA] via-[#c77dff] to-[#9810FA] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round(progress))}%`, boxShadow: "0 0 20px rgba(152,16,250,0.4)" }}
              />
            </div>
          </div>
          <div className="text-gray-400 text-xs mt-2 text-center">
            {slowWarn
              ? "Hmm still loading. Perhaps the model is having a coffee break. If it doesn't wake up, refresh?"
              : `Loading assets (${loaded}/${total})`}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 5. Main export ───────────────────────────────────────────────────────────
const ModelViewer3D = ({ onModelLoaded }) => {
  const [videoHovered,     setVideoHovered]     = useState(false);
  const [isLoading,        setIsLoading]        = useState(true);
  const [isMobile,         setIsMobile]         = useState(false);
  const [animationComplete,setAnimationComplete] = useState(false);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.01 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const h = () => setAnimationComplete(true);
    window.addEventListener("desktop-animation-complete", h);
    return () => window.removeEventListener("desktop-animation-complete", h);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    onModelLoaded?.();
    window.dispatchEvent(new CustomEvent("techverse-model-loaded"));
  };

  const cameraPos = isMobile ? [0, 1.5, 5] : [7, 4, 10];
  const fov       = isMobile ? 50 : 35;
  const scale     = isMobile ? 0.7 : 1.0;

  return (
    <div
      ref={containerRef}
      style={{ visibility: inView ? "visible" : "hidden" }}
      className="w-full h-full absolute inset-0 bg-black flex items-center justify-center overflow-hidden"
    >
      {isLoading && <Loader onLoadComplete={handleLoad} />}

      <div className="relative box-border h-full w-full pt-8 sm:pt-10 md:pt-12">
        {isMobile && (
          <div className="absolute left-0 right-0 bottom-0 top-32 z-0 opacity-40 pointer-events-none blur-sm">
            <ShaderBackground color="#9810FA" />
          </div>
        )}

        <Canvas
          shadows
          camera={{ position: cameraPos, fov }}
          gl={{ preserveDrawingBuffer: true, antialias: !isMobile, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
          className={isMobile ? "pointer-events-none" : ""}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <spotLight position={[-5, 10, 5]} intensity={0.5} />

          <Suspense fallback={null}>
            <group scale={[scale, scale, scale]}>
              {isMobile ? (
                <MobileModel onLoad={handleLoad} />
              ) : (
                <DesktopModel
                  onVideoHover={setVideoHovered}
                  onLoad={handleLoad}
                  animationComplete={animationComplete}
                />
              )}
            </group>

            <OrbitControls
              enableZoom enablePan={false}
              maxPolarAngle={Math.PI / 2}
              target={isMobile ? [0, 0, 0] : [0, 2.15, 0]}
              minDistance={isMobile ? 2 : 4}
              maxDistance={isMobile ? 5 : 12}
              enableDamping dampingFactor={0.05}
              autoRotate={false}
            />

            <Environment files="/hdri/potsdamer_platz_2k.hdr" />
          </Suspense>
        </Canvas>
      </div>

      {!isMobile && (
        <VideoZoomPopup isVisible={videoHovered} videoSrc="/Videos/inaguration.mp4" />
      )}

      {isMobile && !isLoading && (
        <button
          onClick={() => {
            const sec = document.querySelector("section");
            if (sec?.nextElementSibling)
              sec.nextElementSibling.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
          aria-label="Scroll to next section"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  );
};

useGLTF.preload("/Model/computers.glb");
useGLTF.preload("/Model/laptop-transformed.glb");

export default ModelViewer3D;