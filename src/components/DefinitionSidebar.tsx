import React from 'react';

interface Definition {
  id: string;
  title: string;
  definition: string;
  emoji?: string;
  tags: string[];
  links?: string[];
}

interface DefinitionSidebarProps {
  definitions: Definition[];
  selectedDefinition: string | null;
  onSelect: (definitionId: string) => void;
  onShowAll: () => void;
  filterTag?: string;
}

const DefinitionSidebar: React.FC<DefinitionSidebarProps> = ({
  definitions,
  selectedDefinition,
  onSelect,
  onShowAll,
  filterTag
}) => {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: '60px',
      width: '280px',
      minWidth: '280px', // Prevent shrinking
      height: 'calc(100vh - 60px)',
      backgroundColor: 'var(--ifm-background-surface-color)',
      borderRight: '1px solid var(--ifm-color-emphasis-300)',
      padding: '20px',
      overflowY: 'auto',
      boxSizing: 'border-box',
      zIndex: 100
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: 'var(--ifm-font-color-base)'
        }}>
          Definitions {filterTag && `(${filterTag})`}
        </h3>
        <p style={{ 
          margin: '0 0 15px 0', 
          fontSize: '14px', 
          color: 'var(--ifm-font-color-secondary)'
        }}>
          {definitions.length} definition{definitions.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={onShowAll}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: selectedDefinition === null ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
            color: selectedDefinition === null ? 'white' : 'var(--ifm-font-color-base)',
            border: selectedDefinition === null ? 'none' : '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '15px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (selectedDefinition !== null) {
              e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-400)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedDefinition !== null) {
              e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-300)';
            }
          }}
        >
          Show All
        </button>
      </div>
      
      <div>
        {definitions.map((definition) => (
          <div
            key={definition.id}
            onClick={() => onSelect(definition.id)}
            style={{
              padding: '10px',
              marginBottom: '5px',
              backgroundColor: selectedDefinition === definition.id 
                ? 'var(--ifm-color-primary-contrast-background)' 
                : 'var(--ifm-background-color)',
              border: selectedDefinition === definition.id 
                ? '2px solid var(--ifm-color-primary)' 
                : '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedDefinition !== definition.id) {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-200)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedDefinition !== definition.id) {
                e.currentTarget.style.backgroundColor = 'var(--ifm-background-color)';
              }
            }}
          >
            <div style={{
              fontWeight: selectedDefinition === definition.id ? 'bold' : 'normal',
              fontSize: '14px',
              color: selectedDefinition === definition.id 
                ? 'var(--ifm-color-primary-dark)' 
                : 'var(--ifm-font-color-base)'
            }}>
              {definition.emoji ? `${definition.emoji} ` : 'fail '}{definition.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefinitionSidebar;