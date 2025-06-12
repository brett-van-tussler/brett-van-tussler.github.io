import React from 'react';
import Layout from '@theme/Layout';
import InteractiveDictionary from '../components/InteractiveDictionary';

export default function BioinformaticsDictionary() {
  return (
    <Layout
      title="Bioinformatics Dictionary"
      description="Interactive bioinformatics definitions with cross-references"
    >
      <InteractiveDictionary 
        filterTag="bioinformatics" 
        title="Bioinformatics Dictionary"
      />
    </Layout>
  );
}