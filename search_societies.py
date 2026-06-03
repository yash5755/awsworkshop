import os
import re

# Search in the downloaded directory one level up
directory = "../downloaded/chunks"
keywords = ["ACM UMT", "Gamer Lounge", "Cyber Security", "gdgocumt"]

if not os.path.exists(directory):
    # Try another possible path
    directory = "C:/Users/HP/.gemini/antigravity/scratch/downloaded/chunks"

if os.path.exists(directory):
    for fn in os.listdir(directory):
        if not fn.endswith(".js"):
            continue
        path = os.path.join(directory, fn)
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        
        for kw in keywords:
            if kw in content:
                print(f"Found keyword '{kw}' in file: {fn}")
                # Print around the match
                idx = content.find(kw)
                start = max(0, idx - 300)
                end = min(len(content), idx + 1000)
                print("Context:")
                print(content[start:end].replace("\n", " "))
                print("-" * 50)
else:
    print("Could not find downloaded directory.")
