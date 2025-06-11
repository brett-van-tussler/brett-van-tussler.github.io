import React, { useState, useMemo, useEffect } from 'react';
import DefinitionViewer from './DefinitionViewer';
import DefinitionSidebar from './DefinitionSidebar';
import definitionsData from '../data/definitions.json';

// Convert object to array of definitions
const definitions = Array.isArray(definitionsData) 
  ? definitionsData 
  : Object.values(definitionsData as Record<string, any>);

interface Definition {
  id: string;
  title: string;
  emoji?: string;
  definition: string;
  tags: string[];
  linkedTerms?: string[];
}

// Linked List Node Structure
interface DefinitionNode {
  id: string;
  definition: Definition;
  next: DefinitionNode | null;
}

// Linked List State
interface DefinitionChain {
  head: DefinitionNode | null;
  length: number;
}

interface InteractiveDictionaryProps {
  filterTag?: string;
  title?: string;
}

const InteractiveDictionary: React.FC<InteractiveDictionaryProps> = ({ filterTag, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  
  // Multiple Linked Lists - one for each root definition
  const [definitionChains, setDefinitionChains] = useState<Record<string, DefinitionChain>>({});
  
  // Track which chain is currently being displayed
  const [activeChainId, setActiveChainId] = useState<string | null>(null);

  // Only load basic info initially (id, title, tags) for performance
  const definitionsList = useMemo(() => {
    return Object.keys(definitionsData).map(key => ({
      id: key,
      title: definitionsData[key].title,
      emoji: definitionsData[key].emoji,
      definition: definitionsData[key].definition,
      tags: definitionsData[key].tags || [],
      linkedTerms: definitionsData[key].linkedTerms || []
    }));
  }, []);

  // Get full definition data when needed
  const getFullDefinition = (id: string): Definition | null => {
    const defData = definitionsData[id];
    if (!defData) return null;
    
    return {
      id,
      title: defData.title,
      emoji: defData.emoji,
      definition: defData.definition,
      tags: defData.tags || [],
      linkedTerms: defData.linkedTerms || []
    };
  };

  // Filter definitions based on search and tag
  const filteredDefinitions = useMemo(() => {
    return definitionsList.filter(def => {
      const matchesSearch = def.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           def.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !filterTag || def.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    });
  }, [definitionsList, searchTerm, filterTag]);

  // Convert chain to array for easier rendering
  const getChainAsArray = (chainId: string): DefinitionNode[] => {
    const chain = definitionChains[chainId];
    if (!chain || !chain.head) return [];
    
    const result: DefinitionNode[] = [];
    let current = chain.head;
    while (current) {
      result.push(current);
      current = current.next;
    }
    return result;
  };

  // Find node at specific position in a chain
  const findNodeAtPosition = (chainId: string, position: number): DefinitionNode | null => {
    const chain = definitionChains[chainId];
    if (!chain || !chain.head || position < 0) return null;
    
    let current = chain.head;
    for (let i = 0; i < position && current; i++) {
      current = current.next;
    }
    return current;
  };

  // Check if definition is already in a specific chain
  const isDefinitionInChain = (chainId: string, definitionId: string): boolean => {
    const chain = definitionChains[chainId];
    if (!chain || !chain.head) return false;
    
    let current = chain.head;
    while (current) {
      if (current.id === definitionId) return true;
      current = current.next;
    }
    return false;
  };

  // Append definition to a specific chain
  const appendDefinition = (chainId: string, definitionId: string) => {
    if (isDefinitionInChain(chainId, definitionId)) {
      console.log(`Definition ${definitionId} already exists in chain ${chainId}`);
      return;
    }
    
    const fullDefinition = getFullDefinition(definitionId);
    if (!fullDefinition) {
      console.error(`Definition not found: ${definitionId}`);
      return;
    }
    
    const newNode: DefinitionNode = {
      id: definitionId,
      definition: fullDefinition,
      next: null
    };
    
    setDefinitionChains(prevChains => {
      const prevChain = prevChains[chainId] || { head: null, length: 0 };
      
      if (!prevChain.head) {
        return {
          ...prevChains,
          [chainId]: {
            head: newNode,
            length: 1
          }
        };
      } else {
        // Find tail and append
        let current = prevChain.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
        
        return {
          ...prevChains,
          [chainId]: {
            head: prevChain.head,
            length: prevChain.length + 1
          }
        };
      }
    });
    
    console.log(`Appended definition: ${definitionId} to chain: ${chainId}`);
  };

  // Remove from position and all following nodes in a specific chain
  const removeFromPosition = (chainId: string, position: number) => {
    const chain = definitionChains[chainId];
    if (!chain || position < 0 || position >= chain.length) return;
    
    setDefinitionChains(prevChains => {
      if (position === 0) {
        // Remove entire chain
        const newChains = { ...prevChains };
        delete newChains[chainId];
        return newChains;
      }
      
      // Find node before the position to remove
      const nodeBeforeRemoval = findNodeAtPosition(chainId, position - 1);
      if (nodeBeforeRemoval) {
        // Truncate chain at this point
        nodeBeforeRemoval.next = null;
        
        return {
          ...prevChains,
          [chainId]: {
            head: prevChains[chainId].head,
            length: position
          }
        };
      }
      
      return prevChains;
    });
    
    console.log(`Removed chain ${chainId} from position ${position} onwards`);
  };

  // Handle definition link click (append to current active chain)
  const handleDefinitionClick = (definitionId: string) => {
    if (activeChainId) {
      appendDefinition(activeChainId, definitionId);
    }
  };

  // Handle definition close (remove from position onwards in current chain)
  const handleDefinitionClose = (definitionId: string) => {
    if (!activeChainId) return;
    
    const chainArray = getChainAsArray(activeChainId);
    const position = chainArray.findIndex(node => node.id === definitionId);
    
    if (position !== -1) {
      removeFromPosition(activeChainId, position);
    }
  };

  // Handle sidebar selection
  const handleSidebarSelect = (definitionId: string) => {
    setSelectedDefinition(definitionId);
    setActiveChainId(definitionId);
    
    // Create chain if it doesn't exist
    if (!definitionChains[definitionId]) {
      appendDefinition(definitionId, definitionId);
    }
  };

  // Handle "Show All" button - show only root definitions
  const handleShowAll = () => {
    setSelectedDefinition(null);
    setActiveChainId(null);
  };

  // Clear chains when filter changes
  useEffect(() => {
    setDefinitionChains({});
    setActiveChainId(null);
  }, [filteredDefinitions]);

  // Get current chain to display
  const currentChainArray = activeChainId ? getChainAsArray(activeChainId) : [];
  
  // Get root definitions for "Show All" mode
  const rootDefinitions = filteredDefinitions.map(def => {
    const fullDef = getFullDefinition(def.id);
    return fullDef ? {
      id: def.id,
      definition: fullDef,
      next: null
    } : null;
  }).filter(Boolean) as DefinitionNode[];

  // Determine what to display
  const displayNodes = activeChainId ? currentChainArray : rootDefinitions;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
      <DefinitionSidebar
        definitions={filteredDefinitions}
        onSelect={handleSidebarSelect}
        selectedDefinition={selectedDefinition}
        onShowAll={handleShowAll}
      />
      
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1>{title || 'Interactive Dictionary'}</h1>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Breadcrumb Navigation - only show when viewing a specific chain */}
        {activeChainId && currentChainArray.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {/* Navigation Path */}
            {currentChainArray.length > 1 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  fontSize: '14px', 
                  color: 'var(--ifm-color-content-secondary)', 
                  marginBottom: '8px' 
                }}>
                  Navigation Path:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {currentChainArray.map((node, index) => (
                    <React.Fragment key={node.id}>
                      <button
                        onClick={() => removeFromPosition(activeChainId, index + 1)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--ifm-color-emphasis-200)',
                          border: '1px solid var(--ifm-color-emphasis-300)',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: 'var(--ifm-color-content)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-300)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-200)';
                        }}
                      >
                        {node.definition.emoji && `${node.definition.emoji} `}{node.definition.title}
                      </button>
                      {index < currentChainArray.length - 1 && (
                        <span style={{ color: 'var(--ifm-color-content-secondary)', fontSize: '12px' }}>→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Definition Display */}
        <div>
          {displayNodes.map((node, index) => (
            <DefinitionViewer
              key={`${node.id}-${index}`}
              definition={node.definition}
              onDefinitionClick={handleDefinitionClick}
              onClose={() => handleDefinitionClose(node.id)}
              showCloseButton={activeChainId !== null}
            />
          ))}
        </div>
        
        {displayNodes.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--ifm-color-content-secondary)', marginTop: '50px' }}>
            {searchTerm ? 'No definitions found matching your search.' : 'Select a definition from the sidebar to get started.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDictionary;