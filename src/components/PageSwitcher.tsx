import React, { useState, useEffect } from 'react';
import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';

const PageSwitcher: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1); // Start with level 1
  
  // Handle keydown events for arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && currentLevel < 3) {
        setCurrentLevel(currentLevel + 1); // Go to next level
      } else if (event.key === 'ArrowLeft' && currentLevel > 1) {
        setCurrentLevel(currentLevel - 1); // Go to previous level
      }
    };
    console.log(currentLevel)
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLevel]); // Effect runs whenever currentLevel changes

  return (
    <div>
      {currentLevel === 1 && <Level1 />}
      {currentLevel === 2 && <Level2 />}
      {currentLevel === 3 && <Level3 />}
    </div>
  );
};

export default PageSwitcher;
