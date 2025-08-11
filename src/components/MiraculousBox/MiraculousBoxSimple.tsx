import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../../types';
import './MiraculousBoxSimple.css';
import miraculousBoxIcon from '../../assets/images/box/miraculousbox_icon.png';
import miraculousBoxOpen from '../../assets/images/box/miraculousbox_open.png';
import CharacterDisplay from '../Characters/CharacterDisplay';

interface MiraculousBoxProps {
  characters: Character[];
  onKwamiClick: (characterId: string) => void;
  selectedCharacter: string | null;
}

const MiraculousBoxSimple: React.FC<MiraculousBoxProps> = ({
  characters,
  onKwamiClick,
  selectedCharacter
}) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleBoxOpen = () => {
    setIsBoxOpen(true);
  };

  const handleCloseBox = () => {
    setIsBoxOpen(false);
    onKwamiClick('');
  };

  const handleMiraculousClick = (characterId: string) => {
    const character = characters.find(char => char.id === characterId);
    if (character) {
      onKwamiClick(character.id);
    }
  };

  const getSelectedCharacter = () => {
    if (selectedCharacter) {
      return characters.find(char => char.id === selectedCharacter);
    }
    return null;
  };

  const displayCharacter = getSelectedCharacter();

  // Show closed box initially
  if (!isBoxOpen) {
    return (
      <div className="simple-box-container">
        <motion.div
          className="box-icon-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onClick={handleBoxOpen}
          style={{ cursor: 'pointer' }}
        >
          <img src={miraculousBoxIcon} alt="Miraculous Box" className="box-icon" />
          <p className="click-instruction">Click to open the Miraculous Box</p>
        </motion.div>
      </div>
    );
  }

  // Show character details view
  if (displayCharacter) {
    return (
      <div className="character-view">
        <div className="box-section-simple">
          <div className="box-image-simple">
            <img src={miraculousBoxOpen} alt="Miraculous Box Open" />
          </div>
          <div className="box-buttons">
            <button onClick={() => onKwamiClick('')} className="deselect-btn">
              Deselect Miraculous
            </button>
            {/* Removed the "Back to Closed Box" button as requested */}
          </div>
        </div>
        <div className="character-section">
          <CharacterDisplay character={displayCharacter} />
        </div>
      </div>
    );
  }

  // Show box selection view
  return (
    <div className="box-selection-view">
      <h1>Choose Your Miraculous</h1>
      <div className="box-container-simple">
        <div className="box-image-clickable">
          <img src={miraculousBoxOpen} alt="Miraculous Box Open" />
          
          {/* All 19 miraculous clickable areas */}
          {/* Center compartments */}
          <div className="click-area ladybug-area" onClick={() => handleMiraculousClick('ladybug')}>
            <span className="tooltip">Ladybug - Tikki</span>
          </div>
          <div className="click-area cat-area" onClick={() => handleMiraculousClick('cat')}>
            <span className="tooltip">Cat Noir - Plagg</span>
          </div>
          
          {/* Inner ring */}
          <div className="click-area fox-area" onClick={() => handleMiraculousClick('fox')}>
            <span className="tooltip">Fox - Trixx</span>
          </div>
          <div className="click-area bee-area" onClick={() => handleMiraculousClick('bee')}>
            <span className="tooltip">Bee - Pollen</span>
          </div>
          <div className="click-area turtle-area" onClick={() => handleMiraculousClick('turtle')}>
            <span className="tooltip">Turtle - Wayzz</span>
          </div>
          <div className="click-area peacock-area" onClick={() => handleMiraculousClick('peacock')}>
            <span className="tooltip">Peacock - Duusu</span>
          </div>
          <div className="click-area butterfly-area" onClick={() => handleMiraculousClick('butterfly')}>
            <span className="tooltip">Butterfly - Nooroo</span>
          </div>
          <div className="click-area mouse-area" onClick={() => handleMiraculousClick('mouse')}>
            <span className="tooltip">Mouse - Mullo</span>
          </div>
          
          {/* Outer ring */}
          <div className="click-area snake-area" onClick={() => handleMiraculousClick('snake')}>
            <span className="tooltip">Snake - Sass</span>
          </div>
          <div className="click-area dragon-area" onClick={() => handleMiraculousClick('dragon')}>
            <span className="tooltip">Dragon - Longg</span>
          </div>
          <div className="click-area horse-area" onClick={() => handleMiraculousClick('horse')}>
            <span className="tooltip">Horse - Kaalki</span>
          </div>
          <div className="click-area monkey-area" onClick={() => handleMiraculousClick('monkey')}>
            <span className="tooltip">Monkey - Xuppu</span>
          </div>
          <div className="click-area rooster-area" onClick={() => handleMiraculousClick('rooster')}>
            <span className="tooltip">Rooster - Orikko</span>
          </div>
          <div className="click-area dog-area" onClick={() => handleMiraculousClick('dog')}>
            <span className="tooltip">Dog - Barkk</span>
          </div>
          <div className="click-area pig-area" onClick={() => handleMiraculousClick('pig')}>
            <span className="tooltip">Pig - Daizzi</span>
          </div>
          <div className="click-area ox-area" onClick={() => handleMiraculousClick('ox')}>
            <span className="tooltip">Ox - Stompp</span>
          </div>
          <div className="click-area tiger-area" onClick={() => handleMiraculousClick('tiger')}>
            <span className="tooltip">Tiger - Roaar</span>
          </div>
          <div className="click-area rabbit-area" onClick={() => handleMiraculousClick('rabbit')}>
            <span className="tooltip">Rabbit - Fluff</span>
          </div>
          <div className="click-area goat-area" onClick={() => handleMiraculousClick('goat')}>
            <span className="tooltip">Goat - Ziggy</span>
          </div>
        </div>
        
        <button onClick={handleCloseBox} className="close-btn-center">
          Back to Closed Box
        </button>
      </div>
    </div>
  );
};

export default MiraculousBoxSimple;
