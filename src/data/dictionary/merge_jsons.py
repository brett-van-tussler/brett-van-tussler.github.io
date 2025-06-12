import os
import json

merged_dict = {}

# Loop through all files in the current directory
for filename in os.listdir('.'):
    if filename.endswith('.json') and filename != '_category_.json':
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Merge keys into the master dictionary
            merged_dict.update(data)

# Optional: Remove duplicates by converting values to a set if needed
# But JSON values must be serializable, so only do this if all values are hashable

# Write the output to a file
with open('dictionary2.json', 'w', encoding='utf-8') as f:
    json.dump(merged_dict, f, indent=2, ensure_ascii=False)