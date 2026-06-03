with open("src/pages/Register.jsx", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

results = []
for line_no, line in enumerate(content.split('\n'), 1):
    if "techverse" in line.lower():
        results.append(f"{line_no}: {line.strip()}")

with open("search_results.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(results))
print("Done")
