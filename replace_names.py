import os
import re

files_to_update = [
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

replacements = [
    # 1. Email replacements
    (re.compile(r'techverse@umt\.edu\.pk', re.IGNORECASE), 'aws@umt.edu.pk'),
    
    # 2. HTML styled spans
    (re.compile(r'TECH<span className="text-\[\#9810FA\]">VERSE</span>'), 'AWS & <span className="text-[#9810FA]">DEVOPS</span>'),
    (re.compile(r'TECH<span className="text-\[\#9810FA\]">VERSE</span>'), 'AWS & <span className="text-[#9810FA]">DEVOPS</span>'),
    (re.compile(r'TECH<span className="text-purple-600">VERSE</span>', re.IGNORECASE), 'AWS & <span className="text-purple-600">DEVOPS</span>'),
    
    # 3. Uppercase text
    (re.compile(r'TECHVERSE\s+2026'), 'AWS & DEVOPS WORKSHOP 2026'),
    (re.compile(r'TECHVERSE'), 'AWS & DEVOPS WORKSHOP'),
    
    # 4. Standard Title Case
    (re.compile(r'TechVerse\s+2026'), 'AWS & DevOps Workshop 2026'),
    (re.compile(r'Techverse\s+2026'), 'AWS & DevOps Workshop 2026'),
    (re.compile(r'TechVerse'), 'AWS & DevOps Workshop'),
    (re.compile(r'Techverse'), 'AWS & DevOps Workshop'),
    (re.compile(r'techverse-model-loaded'), 'aws-model-loaded')
]

for file in files_to_update:
    if os.path.exists(file):
        with open(file, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        
        orig_content = content
        for pattern, replacement in replacements:
            content = pattern.sub(replacement, content)
        
        if content != orig_content:
            with open(file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated: {file}")
        else:
            print(f"No changes in: {file}")
            
print("Replacement script finished.")
