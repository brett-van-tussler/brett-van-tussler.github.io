import json
import os
import re
from collections import defaultdict

def singular_and_plural(word):
    """Returns a set containing variants of a word including:
    - singular and plural forms
    - versions with hyphens replaced by spaces and vice versa
    """
    word = word.lower()
    variants = {word}
    
    # Add singular/plural variants
    if word.endswith('s'):
        variants.add(word[:-1])  # singular
    else:
        variants.add(word + 's')  # plural
    
    # Add hyphen/space variants
    if '-' in word:
        # Replace hyphens with spaces
        space_variant = word.replace('-', ' ')
        variants.add(space_variant)
        # Also add plural/singular of the space variant
        if space_variant.endswith('s'):
            variants.add(space_variant[:-1])
        else:
            variants.add(space_variant + 's')
    elif ' ' in word:
        # Replace spaces with hyphens
        hyphen_variant = word.replace(' ', '-')
        variants.add(hyphen_variant)
        # Also add plural/singular of the hyphen variant
        if hyphen_variant.endswith('s'):
            variants.add(hyphen_variant[:-1])
        else:
            variants.add(hyphen_variant + 's')
    
    return variants

def link_terms_in_definitions(data):
    all_ids = list(data.keys())

    for current_key, current_entry in data.items():
        current_terms = singular_and_plural(current_key)
        for other_key, other_entry in data.items():
            if current_key == other_key:
                continue

            def_text = other_entry["definition"].lower()

            # Check if any form of the current key appears in the other definition
            if any(re.search(r'\b' + re.escape(term) + r'\b', def_text) for term in current_terms):
                if current_key not in other_entry["linkedTerms"]:
                    other_entry["linkedTerms"].append(current_key)

    return data

# Load definitions.json
with open("definitions.json", "r", encoding="utf-8") as f:
    definitions = json.load(f)

# Update linkedTerms
updated_definitions = link_terms_in_definitions(definitions)

# Save the updated file
with open("definitions_linked.json", "w", encoding="utf-8") as f:
    json.dump(updated_definitions, f, indent=2, ensure_ascii=False)

print("✅ Updated definitions saved to 'definitions_linked.json'")