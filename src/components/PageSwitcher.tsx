import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

type PageSwitcherProps = {
  folderName: string; // The folder where levels are stored (e.g., "set1")
};

const PageSwitcher: React.FC<PageSwitcherProps> = ({ folderName }) => {

  const [levels, setLevels] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>('');

  // Load the levels from the index.ts file for the given folder
  useEffect(() => {
    const loadLevels = async () => {
      try {
        const levelsModule = await import(`/docs/${folderName}/index.ts`);
        setLevels(levelsModule.set1Levels); // Get levels array from the imported index.ts file
      } catch (error) {
        console.error('Error loading levels:', error);
      }
    };

    loadLevels();
  }, [folderName]);

  const [levelIndex, setLevelIndex] = useState(0);

  // Handle arrow key navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      setLevelIndex((prevIndex) => Math.min(prevIndex + 1, levels.length - 1));
    }
    if (event.key === 'ArrowLeft') {
      setLevelIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  useEffect(() => {
    // Fetch the markdown content for the current level (use MDX)
    const fetchMarkdownContent = async (level: string) => {
      try {
        const response = await fetch(`/docs/${folderName}/${level}.mdx`);
        if (response.ok) {
          const markdown = await response.text();
          setMarkdownContent(markdown);
        } else {
          console.error('Error fetching markdown content:', response.status);
        }
      } catch (error) {
        console.error('Error fetching markdown file:', error);
      }
    };

    // Fetch the content for the current level when `levelIndex` changes
    if (levels.length > 0) {
      fetchMarkdownContent(levels[levelIndex]);
    }
  }, [levels, levelIndex, folderName]);

  useEffect(() => {
    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeydown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [levels]);

  return (
    <div>
      <div>
        {levels.length > 0 && (
          <div>
            <h3>Level {levelIndex + 1}</h3>
            {/* Render the markdown content dynamically */}
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageSwitcher;
