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

  // Render the new beautiful circular miraculous box
  const miraculousOrder = [
    'ladybug', 'cat', 'fox', 'bee', 'peacock', 'butterfly', 'turtle',
    'rabbit', 'dragon', 'horse', 'monkey', 'rooster', 'dog', 'pig',
    'ox', 'tiger', 'mouse', 'goat', 'snake'
  ];

  const renderCanonicalBox = () => (
    <div className="miraculous-box-replica">
      <div className="miraculous-jewel-circle">
        {/* Center: Ladybug (left) and Cat Noir (right) side by side */}
        <div className="center-jewels">
          <div
            className="miraculous-jewel center center-ladybug"
            style={{ left: '50%', top: '50%', transform: 'translate(-110%, -50%)' }}
            onClick={() => handleMiraculousClick('ladybug')}
            data-character="ladybug"
          >
            <img src={getMiraculousImage('ladybug')} alt="Ladybug Miraculous" />
            <div className="miraculous-tooltip">
              {(() => {
                const character = characters.find(char => char.id === 'ladybug');
                return character ? (
                  <div className="tooltip-content">
                    <div className="miraculous-info">
                      Ladybug ({character.kwami.element})
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
          <div
            className="miraculous-jewel center center-catnoir"
            style={{ left: '50%', top: '50%', transform: 'translate(10%, -50%)' }}
            onClick={() => handleMiraculousClick('cat')}
            data-character="cat"
          >
            <img src={getMiraculousImage('cat')} alt="Cat Noir Miraculous" />
            <div className="miraculous-tooltip">
              {(() => {
                const character = characters.find(char => char.id === 'cat');
                return character ? (
                  <div className="tooltip-content">
                    <div className="miraculous-info">
                      Cat ({character.kwami.element})
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
        {/* Place the other 17 miraculous evenly around the circle */}
        {miraculousOrder.filter(m => m !== 'ladybug' && m !== 'cat').map((miraculousId, idx) => {
          // 17 jewels around the circle
          const angle = (idx * (360 / 17));
          return (
            <div
              key={miraculousId}
              className="miraculous-jewel"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`
              }}
              onClick={() => handleMiraculousClick(miraculousId)}
              data-character={miraculousId}
            >
              <img src={getMiraculousImage(miraculousId)} alt={`${miraculousId.charAt(0).toUpperCase() + miraculousId.slice(1)} Miraculous`} />
              <div className="miraculous-tooltip">
                {(() => {
                  const character = characters.find(char => char.id === miraculousId);
                  return character ? (
                    <div className="tooltip-content">
                      <div className="miraculous-info">
                        {miraculousId.charAt(0).toUpperCase() + miraculousId.slice(1)} ({character.kwami.element})
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          );
        })}
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
