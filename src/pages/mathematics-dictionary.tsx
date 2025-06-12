import React from 'react';
import Layout from '@theme/Layout';
import InteractiveDictionary from '../components/InteractiveDictionary';

export default function MathematicsDictionary() {
  return (
    <Layout
      title="Mathematics Dictionary"
      description="Interactive mathematics definitions with cross-references"
    >
      <InteractiveDictionary 
        filterTag="math" 
        title="Mathematics Dictionary"
      />
    </Layout>
  );
}