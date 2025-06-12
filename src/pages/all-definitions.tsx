import React from 'react';
import Layout from '@theme/Layout';
import InteractiveDictionary from '../components/InteractiveDictionary';

export default function AllDefinitions() {
  return (
    <Layout
      title="All Definitions"
      description="Browse all definitions across all subjects"
    >
      <InteractiveDictionary title="All Definitions" />
    </Layout>
  );
}