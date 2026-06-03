import os

files_to_search = [
    "src/App.jsx",
    "src/components/Footer.jsx",
    "src/components/HackathonCalendar.jsx",
    "src/components/ModelViewer3D.jsx",
    "src/components/TechverseMaskEffect.jsx",
    "src/components/ModulesCarousel.jsx",
    "src/components/SocietiesCarousel.jsx",
    "src/pages/Home.jsx",
    "src/pages/About.jsx",
    "src/pages/Contact.jsx",
    "src/pages/Modules.jsx",
    "src/pages/Register.jsx",
    "src/pages/Schedule.jsx",
    "src/pages/Sponsors.jsx",
    "index.html"
]

results = []
for file in files_to_search:
    if os.path.exists(file):
        with open(file, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        if "techverse" in content.lower():
            results.append(f"File: {file}")
            for line_no, line in enumerate(content.split("\n"), 1):
                if "techverse" in line.lower():
                    results.append(f"  {line_no}: {line.strip()}")
            results.append("")

with open("search_results.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(results))
print("Finished search")
