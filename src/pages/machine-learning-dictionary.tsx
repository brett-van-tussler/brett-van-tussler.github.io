import React from 'react';
import Layout from '@theme/Layout';
import InteractiveDictionary from '../components/InteractiveDictionary';

export default function MachineLearningDictionary() {
  return (
    <Layout
      title="Machine Learning Dictionary"
      description="Interactive machine learning definitions with cross-references"
    >
      <InteractiveDictionary 
        filterTag="machine-learning" 
        title="Machine Learning Dictionary"
      />
    </Layout>
  );
}