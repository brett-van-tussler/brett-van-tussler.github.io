declare module '@theme/Layout' {
  import { ReactNode } from 'react';
  
  interface LayoutProps {
    children?: ReactNode;
    title?: string;
    description?: string;
    noFooter?: boolean;
    wrapperClassName?: string;
  }
  
  const Layout: React.ComponentType<LayoutProps>;
  export default Layout;
}

declare module '@theme/useDocusaurusContext' {
  interface DocusaurusConfig {
    title: string;
    tagline: string;
    url: string;
    baseUrl: string;
    favicon: string;
    organizationName?: string;
    projectName?: string;
    [key: string]: any;
  }
  
  interface DocusaurusContext {
    siteConfig: DocusaurusConfig;
    [key: string]: any;
  }
  
  const useDocusaurusContext: () => DocusaurusContext;
  export default useDocusaurusContext;
}

declare module '@theme/Head' {
  import { ReactNode } from 'react';
  
  interface HeadProps {
    children?: ReactNode;
  }
  
  const Head: React.ComponentType<HeadProps>;
  export default Head;
}

declare module '@theme/Link' {
  import { ReactNode } from 'react';
  
  interface LinkProps {
    children?: ReactNode;
    to?: string;
    href?: string;
    className?: string;
    [key: string]: any;
  }
  
  const Link: React.ComponentType<LinkProps>;
  export default Link;
}

declare module '@theme/Heading' {
  import { ReactNode } from 'react';
  
  interface HeadingProps {
    children?: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    [key: string]: any;
  }
  
  const Heading: React.ComponentType<HeadingProps>;
  export default Heading;
}

declare module '@theme/useBaseUrl' {
  const useBaseUrl: (url: string) => string;
  export default useBaseUrl;
}

declare module '@theme/CodeBlock' {
  import { ReactNode } from 'react';
  
  interface CodeBlockProps {
    children?: ReactNode;
    className?: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
    [key: string]: any;
  }
  
  const CodeBlock: React.ComponentType<CodeBlockProps>;
  export default CodeBlock;
}

// CSS Module declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

// Docusaurus core modules
declare module '@docusaurus/Link' {
  import { ReactNode } from 'react';
  
  interface LinkProps {
    children?: ReactNode;
    to?: string;
    href?: string;
    className?: string;
    [key: string]: any;
  }
  
  const Link: React.ComponentType<LinkProps>;
  export default Link;
}

declare module '@docusaurus/useDocusaurusContext' {
  interface DocusaurusConfig {
    title: string;
    tagline: string;
    url: string;
    baseUrl: string;
    favicon: string;
    organizationName?: string;
    projectName?: string;
    [key: string]: any;
  }
  
  interface DocusaurusContext {
    siteConfig: DocusaurusConfig;
    [key: string]: any;
  }
  
  const useDocusaurusContext: () => DocusaurusContext;
  export default useDocusaurusContext;
}

declare module '@docusaurus/useBaseUrl' {
  const useBaseUrl: (url: string) => string;
  export default useBaseUrl;
}