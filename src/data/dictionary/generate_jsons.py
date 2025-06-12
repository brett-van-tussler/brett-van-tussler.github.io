import re
import json
import os

def parse_markdown_to_json(md_text):
    # Remove frontmatter
    md_text = re.sub(r'^---[\s\S]*?---\s*', '', md_text.strip())

    # Split on headers
    sections = re.split(r'### ', md_text.strip())
    output = {}

    for section in sections:
        if not section.strip():
            continue

        # Extract title with emoji
        lines = section.strip().splitlines()
        title_line = lines[0].strip()
        match = re.match(r'(?P<emoji>[^a-zA-Z0-9\s\(\)\[\]\{\}\.,;:"\'`!@#\$%\^&\*\-=_\+\\|/<>?]+)\s*(?P<title>.+)', title_line)
        if not match:
            continue

        emoji = match.group('emoji')
        title = match.group('title').strip()
        id_key = title.lower().replace(' ', '-').replace(',', '').replace(':', '')

        # Preserve all content under the header as a single string
        body_lines = lines[1:]
        definition = '\n'.join(body_lines).strip()

        output[id_key] = {
            "id": id_key,
            "title": title,
            "emoji": emoji,
            "definition": definition,
            "tags": [],
            "linkedTerms": []
        }

    return output

# Example usage:
filename = 'dictionary_words.md'

with open(filename, 'r', encoding='utf-8') as markdown_file:
    markdown_input = markdown_file.read()
    parsed_json = parse_markdown_to_json(markdown_input)
    # Create output filename by replacing .md with .json
    output_filename = os.path.splitext(filename)[0] + '.json'

    with open(output_filename, 'w', encoding='utf-8') as json_file:
        json.dump(parsed_json, json_file, indent=2, ensure_ascii=False)