import React, { useState } from 'react';
import definitionsData from '../data/definitions.json';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface Definition {
  id: string;
  title: string;
  emoji?: string;
  definition: string;
  tags: string[];
  linkedTerms?: string[];
}

interface DefinitionViewerProps {
  definitionId: string;
  definition: Definition;
  onDefinitionClick: (definitionId: string) => void;
  onClose: () => void;
  showCloseButton?: boolean;
  chainPosition?: number;
}

const DefinitionViewer: React.FC<DefinitionViewerProps> = ({
  definitionId,
  definition,
  onDefinitionClick,
  onClose,
  showCloseButton = true,
  chainPosition = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!definition) {
    return <div>Definition not found for ID: {definitionId}</div>;
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDefinitionClick = (termId: string) => {
    onDefinitionClick(termId);
  };

  // Function to parse markdown links, LaTeX math expressions, and basic formatting (bold) and convert them to JSX
  const parseMarkdownLinks = (text: string): React.ReactNode[] => {
    if (!text) return [];
    
    // Combined regex to match images, links, LaTeX math expressions, and basic formatting (bold)
    // Using named capture groups to identify the type of match
    const combinedRegex = /(?:!\[([^\]]*)\]\(([^)]+)\))|(?:\[([^\]]+)\]\(([^)]+)\))|(?:\$\$([^$]+)\$\$)|(?:\*\*([^*]+)\*\*)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before the matched element
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Determine which type of element was matched
      if (match[1] !== undefined && match[2] !== undefined) {
        // This is an image
        const altText = match[1];
        const imageUrl = match[2];
        parts.push(
          <img
            key={`image-${match.index}`}
            src={imageUrl}
            alt={altText}
            style={{
              maxWidth: '100%',
              height: 'auto',
              margin: '1em 0',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'block'
            }}
          />
        );
      } else if (match[3] !== undefined && match[4] !== undefined) {
        // This is a link
        const linkText = match[3];
        const linkUrl = match[4];
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--ifm-color-primary)',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--ifm-color-primary-dark)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--ifm-color-primary)';
            }}
          >
            {linkText}
          </a>
        );
      } else if (match[5] !== undefined) {
        // This is a math expression
        const mathExpression = match[5];
        parts.push(
          <span
            key={`math-${match.index}`}
            style={{
              display: 'block',
              margin: '1em 0',
              padding: '0.5em',
              backgroundColor: 'var(--ifm-background-surface-color)',
              borderRadius: '4px',
              overflowX: 'auto',
              fontFamily: 'KaTeX_Main, Times New Roman, serif'
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(mathExpression, {
                displayMode: true,
                throwOnError: false,
                strict: false
              })
            }}
          />
        );
      } else if (match[6] !== undefined) {
        // This is bold text
        const boldText = match[6];
        parts.push(
          <strong key={`bold-${match.index}`}>
            {boldText}
          </strong>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after the last matched element
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  // Format text to preserve line breaks and parse markdown links
  const formatText = (text: string) => {
    if (!text) return text;
    
    return text.split('\n').map((line, index, array) => {
      const parsedLine = parseMarkdownLinks(line);
      return (
        <React.Fragment key={index}>
          {parsedLine}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // Render definition text with linked terms as clickable buttons
  const renderDefinitionText = (text: string) => {
    if (!definition.linkedTerms || definition.linkedTerms.length === 0) {
      // Preserve formatting even when no linked terms
      return formatText(text);
    }
  
    // Collect all matches first, then sort by position
    const allMatches: Array<{
      index: number;
      length: number;
      termId: string;
    }> = [];
  
    definition.linkedTerms.forEach(termId => {
      // Fix: Access the definition from the object structure
      const linkedDef = definitionsData[termId as keyof typeof definitionsData];
      if (!linkedDef) return;
  
      const title = linkedDef.title.toLowerCase();
      
      // Generate plural patterns
      const patterns = [title];
      
      // Add plural forms
      if (title.endsWith('y') && !['ay', 'ey', 'iy', 'oy', 'uy'].some(ending => title.endsWith(ending))) {
        patterns.push(title.slice(0, -1) + 'ies');
      } else if (title.endsWith('s') || title.endsWith('sh') || title.endsWith('ch') || title.endsWith('x') || title.endsWith('z')) {
        patterns.push(title + 'es');
      } else if (title.endsWith('f')) {
        patterns.push(title.slice(0, -1) + 'ves');
      } else if (title.endsWith('fe')) {
        patterns.push(title.slice(0, -2) + 'ves');
      } else {
        patterns.push(title + 's');
      }
      
      // Also check if the title is already plural and add singular
      if (title.endsWith('ies')) {
        patterns.push(title.slice(0, -3) + 'y');
      } else if (title.endsWith('ves')) {
        patterns.push(title.slice(0, -3) + 'f');
        patterns.push(title.slice(0, -3) + 'fe');
      } else if (title.endsWith('es') && (title.endsWith('ses') || title.endsWith('shes') || title.endsWith('ches') || title.endsWith('xes') || title.endsWith('zes'))) {
        patterns.push(title.slice(0, -2));
      } else if (title.endsWith('s') && !title.endsWith('ss')) {
        patterns.push(title.slice(0, -1));
      }
  
      const combinedPattern = patterns.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      const regex = new RegExp(`\\b(${combinedPattern})\\b`, 'gi');
      
      let match;
      while ((match = regex.exec(text)) !== null) {
        allMatches.push({
          index: match.index,
          length: match[0].length,
          termId
        });
      }
    });
  
    // Sort matches by position
    allMatches.sort((a, b) => a.index - b.index);
  
    // Filter out overlapping matches, keeping the first one
    const filteredMatches: Array<{index: number; length: number; termId: string}> = [];
    for (const match of allMatches) {
      const hasOverlap = filteredMatches.some(existing => 
        (match.index < existing.index + existing.length) && 
        (match.index + match.length > existing.index)
      );
      if (!hasOverlap) {
        filteredMatches.push(match);
      }
    }
  
    // Build the result with clickable links
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
  
    // Process matches in order
    filteredMatches.forEach((match) => {
      // Add text before this match with formatting preserved
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        elements.push(...(Array.isArray(formatText(beforeText)) ? formatText(beforeText) : [formatText(beforeText)]));
      }
  
      const matchText = text.substring(match.index, match.index + match.length);
      
      elements.push(
        <button
          key={`${match.termId}-${match.index}`}
          onClick={() => handleDefinitionClick(match.termId)}
          style={{
            background: 'linear-gradient(135deg, var(--ifm-color-primary-light), var(--ifm-color-primary))',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '2px 6px',
            margin: '0 1px',
            cursor: 'pointer',
            fontSize: 'inherit',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          {matchText}
        </button>
      );
  
      lastIndex = match.index + matchText.length;
    });
  
    // Add remaining text with formatting preserved
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      elements.push(...(Array.isArray(formatText(remainingText)) ? formatText(remainingText) : [formatText(remainingText)]));
    }
  
    return elements.length > 0 ? elements : formatText(text);
  };

  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '8px',
      marginBottom: '10px',
      backgroundColor: 'var(--ifm-background-color)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        padding: '15px',
        borderBottom: isExpanded ? '1px solid var(--ifm-color-emphasis-200)' : 'none',
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--ifm-font-color-base)' }}>
          {chainPosition > 0 && (
            <span style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.8em', marginRight: '10px' }}>
              #{chainPosition + 1}
            </span>
          )}
          {definition.emoji ? `${definition.emoji} ` : 'fail '}{definition.title}
        </h3>
        <div>
          <button
            onClick={handleToggleExpand}
            style={{
              background: 'var(--ifm-background-color)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              marginRight: showCloseButton ? '10px' : '0',
              color: 'var(--ifm-font-color-base)'
            }}
          >
            {isExpanded ? '−' : '+'}
          </button>
          {showCloseButton && (
            <button
              onClick={onClose}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div style={{ padding: '15px' }}>
          {definition.tags && definition.tags.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              {definition.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--ifm-color-emphasis-200)',
                    color: 'var(--ifm-color-emphasis-800)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    marginRight: '5px',
                    marginBottom: '5px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div style={{ lineHeight: '1.6', color: 'var(--ifm-font-color-base)' }}>
            {renderDefinitionText(definition.definition)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DefinitionViewer;

