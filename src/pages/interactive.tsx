// src/pages/interactive.tsx
import React from 'react';
import Layout from '@theme/Layout';
import PageSwitcher from '../components/PageSwitcher';

const InteractivePage: React.FC = () => {
  return (
    <Layout title="Interactive Navigation">
      <PageSwitcher />
    </Layout>
  );
};

export default InteractivePage;
