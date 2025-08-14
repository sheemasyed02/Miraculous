import React, { useRef, useState, useEffect } from 'react';
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
  opacity: number;
  duration: number;
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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Generate sparkles during transformation
  useEffect(() => {
    if (isTransforming && imageRef.current) {
      const interval = setInterval(() => {
        const imageRect = imageRef.current?.getBoundingClientRect();
        if (!imageRect) return;

        // Create sparkles focused on head and body area (upper 70% of image)
        const newSparkles: Sparkle[] = [];
        for (let i = 0; i < 8; i++) {
          const sparkle: Sparkle = {
            id: Date.now() + Math.random(),
            // Focus sparkles on head and body area (avoid legs/bottom 30%)
            x: Math.random() * imageRect.width * 0.8 + imageRect.width * 0.1, // Center 80% width
            y: Math.random() * imageRect.height * 0.7 + imageRect.height * 0.1, // Upper 70% height (head + body)
            size: Math.random() * 6 + 3,
            opacity: Math.random() * 0.8 + 0.4,
            duration: Math.random() * 1500 + 1000
          };
          newSparkles.push(sparkle);
        }
        
        setSparkles(prev => [...prev, ...newSparkles]);
      }, 200); 

      // Clean up sparkles after they expire
      const cleanupInterval = setInterval(() => {
        setSparkles(prev => prev.filter(sparkle => 
          Date.now() - sparkle.id < sparkle.duration
        ));
      }, 100);

      return () => {
        clearInterval(interval);
        clearInterval(cleanupInterval);
      };
    } else {
      // Clear sparkles when not transforming
      setSparkles([]);
    }
  }, [isTransforming]);

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

  const transformationText = isTransforming ? 
    (transformationState === 'civilian' ? character.transformationSpell : character.detransformationSpell) : 
    '';

  return (
    <motion.div
      className={`character-display ${isTransforming ? 'transforming' : ''}`}
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
      <div className="character-info">
        <div className="character-content">
          <div className="character-top-row">
            <AnimatePresence mode="wait">
              {transformationState === 'civilian' && (
                <motion.div 
                  className="kwami-display"
                  key="kwami-visible"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: -30 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="character-image-and-name-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${character.id}-${transformationState}`}
                className={`character-image-container ${isTransforming ? 'transforming' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              >
                <img
                  ref={imageRef}
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
                
                {/* Sparkles overlay for transformation */}
                {isTransforming && sparkles.map(sparkle => (
                  <div
                    key={sparkle.id}
                    className="transformation-sparkle"
                    style={{
                      left: sparkle.x,
                      top: sparkle.y,
                      width: sparkle.size,
                      height: sparkle.size,
                      opacity: sparkle.opacity,
                      animationDuration: `${sparkle.duration}ms`
                    }}
                  />
                ))}
                
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
        {getActionButtons()}
        {isTransforming && (
          <div className="modern-transformation-overlay">
            <div className="spell-text-display">
              {transformationText}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CharacterDisplay;
