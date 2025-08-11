import React from 'react';
import { motion } from 'framer-motion';
import './KwamiOwnerDisplay.css';

interface Character {
  id: string;
  kwami: {
    id: string;
    name: string;
    image: string;
    element: string;
    color: string;
  };
  civilian: {
    name: string;
    image: string;
  };
  superhero: {
    name: string;
    image: string;
    powerUpImage?: string;
  };
  transformationSpell: string;
  detransformationSpell: string;
  canPowerUp: boolean;
  state: 'civilian' | 'superhero' | 'power-up';
}

interface KwamiOwnerDisplayProps {
  character: Character;
  onTransform: () => void;
  onDetransform: () => void;
  onPowerUp: () => void;
  onPowerOff: () => void;
}

const KwamiOwnerDisplay: React.FC<KwamiOwnerDisplayProps> = ({
  character,
  onTransform,
  onDetransform,
  onPowerUp,
  onPowerOff
}) => {
  const getDisplayImage = () => {
    switch (character.state) {
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

  const getDisplayName = () => {
    switch (character.state) {
      case 'civilian':
        return character.civilian.name;
      case 'superhero':
      case 'power-up':
        return character.superhero.name;
      default:
        return character.civilian.name;
    }
  };

  const getActionButton = () => {
    switch (character.state) {
      case 'civilian':
        return (
          <button className="action-button transform" onClick={onTransform}>
            Transform: "{character.transformationSpell}"
          </button>
        );
      case 'superhero':
        return (
          <div className="action-buttons">
            {character.canPowerUp && (
              <button className="action-button power-up" onClick={onPowerUp}>
                Power Up
              </button>
            )}
            <button className="action-button detransform" onClick={onDetransform}>
              Detransform: "{character.detransformationSpell}"
            </button>
          </div>
        );
      case 'power-up':
        return (
          <div className="action-buttons">
            <button className="action-button power-off" onClick={onPowerOff}>
              Power Off
            </button>
            <button className="action-button detransform" onClick={onDetransform}>
              Detransform: "{character.detransformationSpell}"
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="kwami-owner-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="display-container">
        {/* Kwami Section */}
        <motion.div 
          className="kwami-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="kwami-card">
            <div className="kwami-image-container">
              <img 
                src={character.kwami.image} 
                alt={character.kwami.name}
                className="kwami-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/kwamis/tikki.png.placeholder';
                }}
              />
              <div className="kwami-glow" style={{ backgroundColor: character.kwami.color }}></div>
            </div>
            <div className="kwami-info">
              <h3 className="kwami-name">{character.kwami.name}</h3>
              <p className="kwami-element">{character.kwami.element} Kwami</p>
            </div>
          </div>
        </motion.div>

        {/* Owner Section */}
        <motion.div 
          className="owner-section"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="owner-card">
            <div className="owner-image-container">
              <img 
                src={getDisplayImage()} 
                alt={getDisplayName()}
                className="owner-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/civilians/marinette.png.placeholder';
                }}
              />
              <div className="state-indicator">
                <span className={`state-badge ${character.state}`}>
                  {character.state === 'civilian' ? 'Civilian' : 
                   character.state === 'superhero' ? 'Hero' : 'Powered Up'}
                </span>
              </div>
            </div>
            <div className="owner-info">
              <h3 className="owner-name">{getDisplayName()}</h3>
              <p className="character-status">
                {character.state === 'civilian' ? 'Ready to Transform' : 
                 character.state === 'superhero' ? 'Transformed' : 'Powered Up'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div 
        className="actions-section"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {getActionButton()}
      </motion.div>
    </motion.div>
  );
};

export default KwamiOwnerDisplay;
