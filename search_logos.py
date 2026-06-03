import os

directory = "C:/Users/HP/.gemini/antigravity/brain/ae26e466-18ba-4bdc-9bf4-f593dbc88cd9/scratch/chunks"
output_file = "C:/Users/HP/.gemini/antigravity/scratch/techverse-clone/search_results.txt"
keywords = ["ACM UMT", "Logo/", "Gamer Lounge", "Cyber Security", "gdgocumt"]

results = []

if os.path.exists(directory):
    for fn in os.listdir(directory):
        if not fn.endswith(".js"):
            continue
        path = os.path.join(directory, fn)
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        
        for kw in keywords:
            if kw in content:
                results.append(f"Keyword '{kw}' in file '{fn}':")
                idx = content.find(kw)
                snippet = content[max(0, idx-250):min(len(content), idx+650)].replace("\n", " ")
                results.append(snippet)
                results.append("-" * 50)
else:
    results.append(f"Directory not found: {directory}")

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(results))
print("Done writing results")
