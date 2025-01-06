import React from 'react';
import PageSwitcher from '../components/PageSwitcher';

const ParentPage: React.FC = () => {
  return (
    <div>
      <h1>Parent Page</h1>
      
      {/* First PageSwitcher for set1 levels */}
      <h2>Set 1</h2>
      <PageSwitcher levelsDirectory="set1" />
      
      {/* Second PageSwitcher for set2 levels */}
      <h2>Set 2</h2>
      <PageSwitcher levelsDirectory="set2" />
    </div>
  );
};

export default ParentPage;
