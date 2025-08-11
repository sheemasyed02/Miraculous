import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../../types';
import './MiraculousBox.css';
import miraculousBoxIcon from '../../assets/images/box/miraculousbox_icon.png';
import miraculousBoxOpen from '../../assets/images/box/miraculousbox_open.png';
import CharacterDisplay from '../Characters/CharacterDisplay';

interface MiraculousBoxProps {
  characters: Character[];
  onKwamiClick: (characterId: string) => void;
  selectedCharacter: string | null;
}

// Define precise clickable areas for each miraculous in the box image - each within their exact compartment
const miraculousAreas = [
  // Center compartments (Ladybug and Cat in the center)
  { id: 'ladybug', x: 46.5, y: 47.5, width: 7, height: 7, color: 'var(--ladybug-red)', name: 'Ladybug' }, // Left center (red ladybug earrings)
  { id: 'cat', x: 53.5, y: 47.5, width: 7, height: 7, color: 'var(--catnoir-green)', name: 'Cat Noir' }, // Right center (green cat ring)
  
  // Inner ring - triangular compartments around center
  { id: 'fox', x: 40, y: 40, width: 8.5, height: 8.5, color: '#ff7700', name: 'Fox' }, // Top left orange (fox necklace)
  { id: 'bee', x: 59, y: 40, width: 8.5, height: 8.5, color: '#ffee00', name: 'Bee' }, // Top right yellow (bee comb)
  { id: 'turtle', x: 63, y: 50, width: 8.5, height: 8.5, color: '#00cc66', name: 'Turtle' }, // Right green (turtle bracelet)
  { id: 'peacock', x: 59, y: 61, width: 8.5, height: 8.5, color: '#6633cc', name: 'Peacock' }, // Bottom right blue (peacock brooch)
  { id: 'butterfly', x: 40, y: 61, width: 8.5, height: 8.5, color: '#9900cc', name: 'Butterfly' }, // Bottom left purple (butterfly brooch)
  { id: 'mouse', x: 34, y: 50, width: 8.5, height: 8.5, color: '#ff9999', name: 'Mouse' }, // Left pink (mouse pendant)
  
  // Outer ring - square compartments around the edge
  { id: 'snake', x: 50, y: 24, width: 9, height: 9, color: '#00cccc', name: 'Snake' }, // Top cyan (snake bracelet)
  { id: 'dragon', x: 68, y: 33, width: 9, height: 9, color: '#cc0000', name: 'Dragon' }, // Top right red (dragon choker)
  { id: 'horse', x: 76, y: 50, width: 9, height: 9, color: '#996633', name: 'Horse' }, // Right brown (horse glasses)
  { id: 'monkey', x: 68, y: 68, width: 9, height: 9, color: '#ff9900', name: 'Monkey' }, // Bottom right orange (monkey circlet)
  { id: 'rooster', x: 50, y: 76, width: 9, height: 9, color: '#3366ff', name: 'Rooster' }, // Bottom blue (rooster ring)
  { id: 'dog', x: 33, y: 68, width: 9, height: 9, color: '#ff6699', name: 'Dog' }, // Bottom left pink (dog collar)
  { id: 'pig', x: 24, y: 50, width: 9, height: 9, color: '#ff99cc', name: 'Pig' }, // Left pink (pig anklet)
  { id: 'ox', x: 33, y: 33, width: 9, height: 9, color: '#ffcc33', name: 'Ox' }, // Top left yellow (ox nose ring)
  { id: 'tiger', x: 18, y: 33, width: 9, height: 9, color: '#ff9933', name: 'Tiger' }, // Far left orange (tiger panjas)
  { id: 'rabbit', x: 18, y: 68, width: 9, height: 9, color: '#ff66cc', name: 'Rabbit' }, // Far left bottom pink (rabbit watch)
  { id: 'goat', x: 83, y: 33, width: 9, height: 9, color: '#33cccc', name: 'Goat' }, // Far right top blue (goat hair clips)
  { id: 'sheep', x: 83, y: 68, width: 9, height: 9, color: '#6699ff', name: 'Sheep' }, // Far right bottom blue (sheep anklet)
];

const MiraculousBox: React.FC<MiraculousBoxProps> = ({
  characters,
  onKwamiClick,
  selectedCharacter
}) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [showBoxIcon, setShowBoxIcon] = useState(true);
  const [debugMode, setDebugMode] = useState(true); // Debug mode enabled by default

  // Add keyboard shortcuts (Shift+D for debug, ESC for closing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift+D to toggle debug mode
      if (e.key === 'D' && e.shiftKey) {
        setDebugMode(prev => !prev);
        console.log('Debug mode:', !debugMode);
      }
      
      // ESC to close box or deselect character
      if (e.key === 'Escape') {
        if (selectedCharacter) {
          onKwamiClick('');
        } else if (!showBoxIcon) {
          handleCloseBox();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [debugMode, selectedCharacter, showBoxIcon]);

  const handleBoxClick = () => {
    setShowBoxIcon(false);
  };

  const handleMiraculousClick = (miraculousId: string) => {
    console.log('Clicked on miraculous:', miraculousId);
    const character = characters.find(char => char.id === miraculousId);
    if (character) {
      console.log('Found character:', character.kwami.name);
      onKwamiClick(character.id);
      // Keep the box open but show character details
    } else {
      console.log('No character found for this miraculous');
    }
  };

  const handleCloseBox = () => {
    onKwamiClick('');
    setShowBoxIcon(true);
  };
  
  const handleBackToClosedBox = () => {
    onKwamiClick('');
    setShowBoxIcon(true);
  };

  const getSelectedCharacter = () => {
    if (selectedCharacter) {
      return characters.find(char => char.id === selectedCharacter);
    }
    return null;
  };

  const getCharacterByMiraculousId = (miraculousId: string) => {
    return characters.find(char => char.id === miraculousId);
  };

  const displayCharacter = getSelectedCharacter();

  // Show only the box icon initially or when explicitly closed
  if (showBoxIcon) {
    return (
      <div className="app-container">
        <motion.div
          className="box-icon-container"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            type: "spring", 
            stiffness: 100,
            delay: 0.2 
          }}
          onClick={handleBoxClick}
          style={{ cursor: 'pointer' }}
        >
          <motion.img 
            src={miraculousBoxIcon} 
            alt="Miraculous Box" 
            className="box-icon"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.p 
            className="click-instruction"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Click to open the Miraculous Box
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Show both box and character details
  if (displayCharacter) {
    return (
      <motion.div
        className="miraculous-experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="miraculous-layout">
          <div className="box-section">
            <motion.div
              className="interactive-box-container"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              {/* Box Image */}
              <div className="box-image-wrapper">
                <img 
                  src={miraculousBoxOpen} 
                  alt="Miraculous Box Open" 
                  className="box-image"
                  useMap="#miraculous-map"
                />
                
                {/* Using HTML image map for precise clickable areas */}
                <map name="miraculous-map">
                  {miraculousAreas.map((area) => {
                    const character = getCharacterByMiraculousId(area.id);
                    const hasCharacter = character !== undefined;
                    
                    // Calculate coordinates for the area (convert from percentage to actual pixels)
                    const boxWidth = 600; // This is the max-width of the box image
                    const x1 = Math.floor((area.x - area.width/2) * boxWidth / 100);
                    const y1 = Math.floor((area.y - area.height/2) * boxWidth / 100);
                    const x2 = Math.floor((area.x + area.width/2) * boxWidth / 100);
                    const y2 = Math.floor((area.y + area.height/2) * boxWidth / 100);
                    
                    return (
                      <area 
                        key={area.id}
                        shape="rect"
                        coords={`${x1},${y1},${x2},${y2}`}
                        alt={area.name}
                        title={character ? `${character.kwami.name} - ${character.civilian.name}` : `${area.name} Miraculous`}
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Clicked on map area:', area.id);
                          if (hasCharacter) {
                            handleMiraculousClick(area.id);
                          } else {
                            alert(`${area.name} Miraculous holder coming soon!`);
                          }
                        }}
                        style={{cursor: hasCharacter ? 'pointer' : 'not-allowed'}}
                      />
                    );
                  })}
                </map>

                {/* Visual indicators for the clickable areas - INSIDE the image */}
                <div className="clickable-areas-overlay">
                  {miraculousAreas.map((area) => {
                    const character = getCharacterByMiraculousId(area.id);
                    const hasCharacter = character !== undefined;
                    const isSelected = selectedCharacter === area.id;
                    
                    return (
                      <motion.div
                        key={area.id}
                        className={`miraculous-area ${isSelected ? 'selected' : ''} ${hoveredArea === area.id ? 'hovered' : ''} ${debugMode ? 'debug' : ''}`}
                        style={{
                          left: `${area.x - area.width/2}%`,
                          top: `${area.y - area.height/2}%`,
                          width: `${area.width}%`,
                          height: `${area.height}%`,
                          '--miraculous-color': area.color,
                          pointerEvents: 'none',
                          opacity: isSelected ? 1 : (debugMode ? 0.6 : 0.3)
                        } as React.CSSProperties}
                        data-miraculous={area.id}
                        onMouseEnter={() => setHoveredArea(area.id)}
                        onMouseLeave={() => setHoveredArea(null)}
                        whileHover={{ 
                          opacity: hasCharacter ? 1 : 0.5,
                          boxShadow: `0 0 15px ${area.color}`
                        }}
                      >
                        {debugMode && (
                          <div className="miraculous-label">{area.id}</div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Buttons BELOW the image */}
              <div className="box-controls">
                <motion.button 
                  onClick={() => onKwamiClick('')} 
                  className="deselect-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Deselect Miraculous
                </motion.button>
                
                <motion.button 
                  onClick={handleBackToClosedBox} 
                  className="close-box-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="M3 9H21M9 20V9M15 20V9M5 9L5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V9M10 5H14C14.5523 5 15 5.44772 15 6V9H9V6C9 5.44772 9.44772 5 10 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Closed Box
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="character-section">
            <CharacterDisplay character={displayCharacter} />
          </div>
        </div>
      </motion.div>
    );
  }

  // Show the interactive miraculous box without character details
  return (
    <motion.div
      className="box-only-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="choose-title"
      >
        Choose Your Miraculous
        {debugMode && <span className="debug-indicator"> (Debug Mode - Press Shift+D to toggle)</span>}
      </motion.h1>
      
      <motion.div 
        className="interactive-box-container centered"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="box-image-wrapper">
          <img 
            src={miraculousBoxOpen} 
            alt="Miraculous Box Open" 
            className="box-image"
          />
          
          {/* Custom clickable areas overlaid on the image - precisely positioned in each compartment */}
          <div className="clickable-areas-overlay">
            {miraculousAreas.map((area) => {
              const character = getCharacterByMiraculousId(area.id);
              const hasCharacter = character !== undefined;
              
              return (
                <motion.div
                  key={area.id}
                  className={`miraculous-area ${hoveredArea === area.id ? 'hovered' : ''} ${debugMode ? 'debug' : ''}`}
                  style={{
                    left: `${area.x - area.width/2}%`,
                    top: `${area.y - area.height/2}%`,
                    width: `${area.width}%`,
                    height: `${area.height}%`,
                    '--miraculous-color': area.color,
                    cursor: hasCharacter ? 'pointer' : 'not-allowed',
                    opacity: debugMode ? 0.6 : 0.3
                  } as React.CSSProperties}
                  data-miraculous={area.id}
                  onClick={() => {
                    console.log('Clicked on area:', area.id);
                    if (hasCharacter) {
                      handleMiraculousClick(area.id);
                    } else {
                      alert(`${area.name} Miraculous holder coming soon!`);
                    }
                  }}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                  title={character ? `${character.kwami.name} - ${character.civilian.name}` : `${area.name} Miraculous`}
                  whileHover={{ 
                    opacity: hasCharacter ? 1 : 0.5,
                    boxShadow: `0 0 15px ${area.color}`,
                    scale: 1.1
                  }}
                >
                  <div className="miraculous-tooltip">
                    {hasCharacter 
                      ? `${area.name} Miraculous - ${character.kwami.name} (${character.civilian.name})` 
                      : `${area.name} Miraculous (Coming Soon)`}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <motion.button 
          onClick={handleBackToClosedBox} 
          className="close-box-button centered-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
            <path d="M3 9H21M9 20V9M15 20V9M5 9L5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V9M10 5H14C14.5523 5 15 5.44772 15 6V9H9V6C9 5.44772 9.44772 5 10 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Closed Box
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MiraculousBox;
