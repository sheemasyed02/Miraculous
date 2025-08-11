import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../../types';
import './MiraculousBoxCanonical.css';
import miraculousBoxIcon from '../../assets/images/box/miraculousbox_icon.png';
import CharacterDisplay from '../Characters/CharacterDisplay';

// Import miraculous jewelry images
import ladybugJewel from '../../assets/images/Miraculous_Jewels/Ladybug.png';
import catJewel from '../../assets/images/Miraculous_Jewels/Cat.png';
import foxJewel from '../../assets/images/Miraculous_Jewels/Fox.png';
import beeJewel from '../../assets/images/Miraculous_Jewels/Bee.png';
import peacockJewel from '../../assets/images/Miraculous_Jewels/Peacock.png';
import butterflyJewel from '../../assets/images/Miraculous_Jewels/Butterfly.png';
import turtleJewel from '../../assets/images/Miraculous_Jewels/Turtle.png';
import rabbitJewel from '../../assets/images/Miraculous_Jewels/Bunny.png';
import dragonJewel from '../../assets/images/Miraculous_Jewels/Dragon.png';
import horseJewel from '../../assets/images/Miraculous_Jewels/Horse.png';
import monkeyJewel from '../../assets/images/Miraculous_Jewels/Monkey.png';
import roosterJewel from '../../assets/images/Miraculous_Jewels/Rooster.png';
import dogJewel from '../../assets/images/Miraculous_Jewels/Dog.png';
import pigJewel from '../../assets/images/Miraculous_Jewels/Pig.png';
import oxJewel from '../../assets/images/Miraculous_Jewels/Ox.png';
import tigerJewel from '../../assets/images/Miraculous_Jewels/Tiger.png';
import mouseJewel from '../../assets/images/Miraculous_Jewels/Mouse.png';
import goatJewel from '../../assets/images/Miraculous_Jewels/Goat.png';
import snakeJewel from '../../assets/images/Miraculous_Jewels/Snake.png';

interface MiraculousBoxCanonicalProps {
  characters: Character[];
  onKwamiClick: (characterId: string) => void;
  selectedCharacter: string | null;
}

// Helper function to get miraculous jewelry image
const getMiraculousImage = (miraculousId: string): string => {
  const miraculousImages: { [key: string]: string } = {
    ladybug: ladybugJewel,
    cat: catJewel,
    fox: foxJewel,
    bee: beeJewel,
    peacock: peacockJewel,
    butterfly: butterflyJewel,
    turtle: turtleJewel,
    rabbit: rabbitJewel,
    dragon: dragonJewel,
    horse: horseJewel,
    monkey: monkeyJewel,
    rooster: roosterJewel,
    dog: dogJewel,
    pig: pigJewel,
    ox: oxJewel,
    tiger: tigerJewel,
    mouse: mouseJewel,
    goat: goatJewel,
    snake: snakeJewel
  };
  return miraculousImages[miraculousId] || '';
};

const MiraculousBoxCanonical: React.FC<MiraculousBoxCanonicalProps> = ({
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

  // Render the canonical miraculous box
  const renderCanonicalBox = () => (
    <div className="miraculous-box-replica">
      {/* Center Circle - Ladybug & Cat Noir */}
      <div className="center-circle">
        <div className="center-jewel-ladybug" onClick={() => handleMiraculousClick('ladybug')}>
          <img src={getMiraculousImage('ladybug')} alt="Ladybug Miraculous" />
        </div>
        <div className="center-jewel-cat" onClick={() => handleMiraculousClick('cat')}>
          <img src={getMiraculousImage('cat')} alt="Cat Miraculous" />
        </div>
      </div>

      {/* Inner Pentagon - 5 Main Miraculous */}
      <div className="inner-hexagon">
        <div className="inner-jewel inner-top" onClick={() => handleMiraculousClick('fox')}>
          <img src={getMiraculousImage('fox')} alt="Fox Miraculous" />
        </div>
        <div className="inner-jewel inner-top-right" onClick={() => handleMiraculousClick('bee')}>
          <img src={getMiraculousImage('bee')} alt="Bee Miraculous" />
        </div>
        <div className="inner-jewel inner-bottom-right" onClick={() => handleMiraculousClick('peacock')}>
          <img src={getMiraculousImage('peacock')} alt="Peacock Miraculous" />
        </div>
        <div className="inner-jewel inner-bottom" onClick={() => handleMiraculousClick('butterfly')}>
          <img src={getMiraculousImage('butterfly')} alt="Butterfly Miraculous" />
        </div>
        <div className="inner-jewel inner-left" onClick={() => handleMiraculousClick('turtle')}>
          <img src={getMiraculousImage('turtle')} alt="Turtle Miraculous" />
        </div>
      </div>

      {/* Outer Ring - 12 Rectangular Compartments */}
      <div className="outer-jewel compartment-top-left" onClick={() => handleMiraculousClick('rabbit')}>
        <img src={getMiraculousImage('rabbit')} alt="Rabbit Miraculous" />
      </div>
      <div className="outer-jewel compartment-top-center" onClick={() => handleMiraculousClick('dragon')}>
        <img src={getMiraculousImage('dragon')} alt="Dragon Miraculous" />
      </div>
      <div className="outer-jewel compartment-top-right" onClick={() => handleMiraculousClick('horse')}>
        <img src={getMiraculousImage('horse')} alt="Horse Miraculous" />
      </div>
      <div className="outer-jewel compartment-right-top" onClick={() => handleMiraculousClick('monkey')}>
        <img src={getMiraculousImage('monkey')} alt="Monkey Miraculous" />
      </div>
      <div className="outer-jewel compartment-right-bottom" onClick={() => handleMiraculousClick('rooster')}>
        <img src={getMiraculousImage('rooster')} alt="Rooster Miraculous" />
      </div>
      <div className="outer-jewel compartment-bottom-right" onClick={() => handleMiraculousClick('dog')}>
        <img src={getMiraculousImage('dog')} alt="Dog Miraculous" />
      </div>
      <div className="outer-jewel compartment-bottom-center" onClick={() => handleMiraculousClick('pig')}>
        <img src={getMiraculousImage('pig')} alt="Pig Miraculous" />
      </div>
      <div className="outer-jewel compartment-bottom-left" onClick={() => handleMiraculousClick('ox')}>
        <img src={getMiraculousImage('ox')} alt="Ox Miraculous" />
      </div>
      <div className="outer-jewel compartment-left-bottom" onClick={() => handleMiraculousClick('tiger')}>
        <img src={getMiraculousImage('tiger')} alt="Tiger Miraculous" />
      </div>
      <div className="outer-jewel compartment-left-center" onClick={() => handleMiraculousClick('mouse')}>
        <img src={getMiraculousImage('mouse')} alt="Mouse Miraculous" />
      </div>
      <div className="outer-jewel compartment-left-top" onClick={() => handleMiraculousClick('goat')}>
        <img src={getMiraculousImage('goat')} alt="Goat Miraculous" />
      </div>
      <div className="outer-jewel compartment-snake" onClick={() => handleMiraculousClick('snake')}>
        <img src={getMiraculousImage('snake')} alt="Snake Miraculous" />
      </div>
    </div>
  );

  // Show character display if one is selected
  if (displayCharacter) {
    return (
      <div className="replica-character-view">
        <div className="replica-box-section">
          {renderCanonicalBox()}
          <div className="replica-controls">
            <button className="replica-close-btn" onClick={handleCloseBox}>
              Close Box
            </button>
          </div>
        </div>
        <div className="replica-character-section">
          <CharacterDisplay character={displayCharacter} />
        </div>
      </div>
    );
  }

  // Show box selection view
  if (isBoxOpen) {
    return (
      <div className="replica-box-view">
        <div className="replica-container">
          <h1>Choose Your Miraculous</h1>
          {renderCanonicalBox()}
          <div className="replica-controls">
            <button className="replica-close-btn" onClick={handleCloseBox}>
              Close Box
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show closed box initially
  return (
    <div className="replica-closed-view">
      <div className="replica-closed-container">
        <motion.div
          className="replica-closed-box"
          onClick={handleBoxOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={miraculousBoxIcon} alt="Miraculous Box" />
        </motion.div>
        <p className="replica-instruction">Click to open the Miraculous Box</p>
      </div>
    </div>
  );
};

export default MiraculousBoxCanonical;
