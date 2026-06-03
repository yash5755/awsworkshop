import os

directory = "src"
output_file = "search_results.txt"
keyword = "techverse"

results = []

if os.path.exists(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html')):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                if keyword in content.lower():
                    results.append(f"File: {path}")
                    for line_no, line in enumerate(content.split('\n'), 1):
                        if keyword in line.lower():
                            results.append(f"  {line_no}: {line.strip()}")
                    results.append("")
else:
    results.append("Directory not found")

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(results))
print("Done searching")
