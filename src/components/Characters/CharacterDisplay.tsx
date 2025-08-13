import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Character } from '../../types';
import TransformationButton from '../UI/TransformationButton';
import { useTransformation } from '../../hooks/useTransformation';
import './CharacterDisplay.css';

interface CharacterDisplayProps {
  character: Character | null;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character }) => {
  const {
    transformationState,
    isTransforming,
    transform,
    detransform,
    powerUp,
    powerOff
  } = useTransformation(character);
  
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create sparkles for transformation effect
  useEffect(() => {
    if (isTransforming && containerRef.current) {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Clear existing sparkles
      setSparkles([]);
      
      // Create new sparkles
      const interval = setInterval(() => {
        const newSparkles: Sparkle[] = [];
        for (let i = 0; i < 5; i++) {
          const sparkleX = Math.random() * containerRect.width;
          const sparkleY = Math.random() * containerRect.height;
          const sparkleSize = Math.random() * 10 + 4;
          const colors = [
            'rgba(255, 204, 0, 0.8)',   // Gold
            character?.id === 'ladybug' ? 'rgba(230, 57, 70, 0.8)' : 'rgba(255, 204, 0, 0.8)', // Ladybug red
            character?.id === 'cat' ? 'rgba(42, 157, 143, 0.8)' : 'rgba(255, 204, 0, 0.8)',   // Cat Noir green
            'rgba(255, 255, 255, 0.8)',  // White
          ];
          const sparkleColor = colors[Math.floor(Math.random() * colors.length)];
          
          newSparkles.push({
            id: Date.now() + i,
            x: sparkleX,
            y: sparkleY,
            size: sparkleSize,
            color: sparkleColor
          });
        }
        
        setSparkles(prev => [...prev, ...newSparkles]);
      }, 200);
      
      // Clean up interval and sparkles
      return () => {
        clearInterval(interval);
        setSparkles([]);
      };
    }
  }, [isTransforming, character]);
  
  // Clean up sparkles after they animate
  useEffect(() => {
    if (sparkles.length > 0) {
      const timer = setTimeout(() => {
        setSparkles(prev => prev.slice(5));
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [sparkles]);

  if (!character) {
    return (
      <div className="character-display-placeholder">
        <motion.div
          className="placeholder-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose a Miraculous holder to begin your journey
        </motion.div>
        <motion.div 
          className="miraculous-guide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="guide-arrow"></div>
          <p>Click on a Miraculous in the box</p>
        </motion.div>
      </div>
    );
  }

  const getCurrentImage = () => {
    switch (transformationState) {
      case 'civilian':
        return character.civilian.image;
      case 'superhero':
        return character.superhero.image;
      case 'power-up':
        return character.superhero.powerUpImage || character.superhero.image;
      default:
        return character.civilian.image;
    }
  };

  const getCurrentName = () => {
    switch (transformationState) {
      case 'civilian':
        return character.civilian.name;
      case 'superhero':
        return character.superhero.name;
      case 'power-up':
        return `${character.superhero.name} (Powered Up!)`;
      default:
        return character.civilian.name;
    }
  };
  
  // Get character-specific accent color based on the kwami
  const getAccentColor = () => {
    if (!character) return 'var(--kwami-gold)';
    
    switch (character.id) {
      case 'ladybug':
        return 'var(--ladybug-red)';
      case 'cat':
        return 'var(--catnoir-green)';
      case 'butterfly':
      case 'peacock':
        return 'var(--miraculous-purple)';
      default:
        return character.kwami.color || 'var(--kwami-gold)';
    }
  };

  const getActionButtons = () => {
    if (isTransforming) return null;
    
    switch (transformationState) {
      case 'civilian':
        return (
          <TransformationButton
            spell={character.transformationSpell}
            onClick={transform}
            variant="transform"
            color={getAccentColor()}
          />
        );
      case 'superhero':
        return (
          <div className="action-buttons">
            {character.canPowerUp && (
              <TransformationButton
                spell="Power Up!"
                onClick={powerUp}
                variant="power-up"
                color={getAccentColor()}
              />
            )}
            <TransformationButton
              spell={character.detransformationSpell || "Spots Off"}
              onClick={detransform}
              variant="detransform"
              color={getAccentColor()}
            />
          </div>
        );
      case 'power-up':
        return (
          <TransformationButton
            spell="Power Down"
            onClick={powerOff}
            variant="power-off"
            color={getAccentColor()}
          />
        );
      default:
        return null;
    }
  };

  // Determine animation styles based on character type
  const getTransformationAnimation = () => {
    // Specific character animation styles
    switch (character.id) {
      case 'ladybug':
        return {
          background: `radial-gradient(circle, rgba(247, 5, 45, 0.4) 0%, rgba(0, 0, 0, 0.8) 70%)`,
          boxShadow: `0 0 50px var(--ladybug-red)`
        };
      case 'cat':
        return {
          background: `radial-gradient(circle, rgba(60, 211, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 70%)`,
          boxShadow: `0 0 50px var(--catnoir-green)`
        };
      default:
        return {
          background: `radial-gradient(circle, ${character.kwami.color || 'rgba(255, 204, 0, 0.4)'} 0%, rgba(0, 0, 0, 0.8) 70%)`,
          boxShadow: `0 0 50px ${character.kwami.color || 'var(--kwami-gold)'}`
        };
    }
  };

  const transformationText = isTransforming ? 
    (transformationState === 'civilian' ? character.transformationSpell : character.detransformationSpell) : 
    '';

  return (
    <motion.div
      className="character-display"
      data-character={character.id}
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
      style={{
        '--accent-color': getAccentColor()
      } as React.CSSProperties}
      ref={containerRef}
    >
      {/* Render sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`
          }}
        />
      ))}

      <div className="character-info">
        <div className="character-content">
          <div className="character-top-row">
            <div className="kwami-display">
              <motion.img 
                src={character.kwami.image} 
                alt={character.kwami.name}
                className="kwami-image"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.textContent = `${character.kwami.name} (Image not found)`;
                }}
              />
              <motion.div 
                className="kwami-info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h4 className="kwami-name">{character.kwami.name}</h4>
                <p className="kwami-element">{character.kwami.element}</p>
              </motion.div>
            </div>
          </div>

          <div className="character-image-and-name-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${character.id}-${transformationState}`}
                className="character-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              >
                <img
                  src={getCurrentImage()}
                  alt={getCurrentName()}
                  className="character-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="${character.kwami.color || '#953ca0'}" opacity="0.3" rx="20"/>
                        <text x="100" y="100" text-anchor="middle" fill="white" font-size="16" font-family="Arial">
                          ${getCurrentName()}
                        </text>
                      </svg>
                    `)}`;
                  }}
                />
                {transformationState === 'power-up' && (
                  <div className="power-up-aura" style={{ backgroundColor: character.kwami.color || '#ffcc00' }} />
                )}
              </motion.div>
            </AnimatePresence>

            <motion.h2
              className="character-name character-name-vertical"
              key={getCurrentName()}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {getCurrentName()}
            </motion.h2>
          </div>

          <motion.div
            className="transformation-phrase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="transformation-spell">"{character.transformationSpell}"</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="action-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {isTransforming ? (
          <div className="transforming-animation" style={getTransformationAnimation()}>
            <div className="transforming-animation-inner">
              <div className="transforming-animation-circle">
                <div className="transforming-animation-center">
                  {transformationText}
                </div>
              </div>
            </div>
          </div>
        ) : (
          getActionButtons()
        )}
      </motion.div>
    </motion.div>
  );
};

export default CharacterDisplay;
