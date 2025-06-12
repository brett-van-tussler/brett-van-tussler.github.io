import React, { useState } from 'react';
import definitionsData from '../data/definitions.json';

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

  const handleLinkClick = (termId: string) => {
    onDefinitionClick(termId);
  };

  // Render definition text with linked terms as clickable buttons
  const renderDefinitionText = (text: string) => {
    if (!definition.linkedTerms || definition.linkedTerms.length === 0) {
      return text;
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
    const filteredMatches = [];
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
      // Add text before this match
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }
  
      const matchText = text.substring(match.index, match.index + match.length);
      
      elements.push(
        <button
          key={`${match.termId}-${match.index}`}
          onClick={() => handleLinkClick(match.termId)}
          style={{
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '1px 4px',
            margin: '0 1px',
            fontSize: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            display: 'inline-block'
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
  
    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }
  
    return elements.length > 0 ? elements : text;
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

