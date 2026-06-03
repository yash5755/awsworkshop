import React, { useEffect, useRef } from "react";

const ShaderBackground = ({ color = "#471CE2" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    // Fragment Shader Source (Extracted from target site)
    const fsSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform vec3 u_color;

      void mainImage(out vec4 fragColor, in vec2 fragCoord){
          vec2 uv = (1.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
          float t = iTime * 0.5;

          vec2 mouse_uv = (4.0 * iMouse - iResolution.xy) / min(iResolution.x, iResolution.y);

          float mouseInfluence = 0.0;
          if (length(iMouse) > 0.0) {
              float dist_to_mouse = distance(uv, mouse_uv);
              mouseInfluence = smoothstep(0.8, 0.0, dist_to_mouse);
          }

          for(float i = 8.0; i < 20.0; i++) {
              uv.x += 0.6 / i * cos(i * 2.5 * uv.y + t);
              uv.y += 0.6 / i * cos(i * 1.5 * uv.x + t);
          }

          float wave = abs(sin(t - uv.y - uv.x + mouseInfluence * 8.0));
          float glow = smoothstep(0.9, 0.0, wave);

          vec3 base = u_color * 0.3;
          vec3 color = base + glow * u_color * 1.5;

          fragColor = vec4(color, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    // Helper: Compile Shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Create Program
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, "iResolution");
    const timeLoc = gl.getUniformLocation(program, "iTime");
    const mouseLoc = gl.getUniformLocation(program, "iMouse");
    const colorLoc = gl.getUniformLocation(program, "u_color");

    // Parse color hex to RGB vec3
    const hex = color.startsWith("#") ? color.substring(1) : color;
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    gl.uniform3f(colorLoc, r, g, b);

    // Mouse Tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      // Normalize coordinate systems matching original logic
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = rect.height - (e.clientY - rect.top); // flip Y axis for WebGL
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation variables
    let animationFrameId;
    const startTime = Date.now();

    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = () => {
      resizeCanvas();

      const time = (Date.now() - startTime) / 1000.0;
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, [color]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black" style={{ zIndex: -1, pointerEvents: "none" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
    </div>
  );
};

export default ShaderBackground;
