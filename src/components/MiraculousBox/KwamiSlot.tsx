import React from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../../types';
import './KwamiSlot.css';

interface KwamiSlotProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  position?: 'center' | 'outer';
}

const KwamiSlot: React.FC<KwamiSlotProps> = ({
  character,
  isSelected,
  onClick,
  index,
  position = 'outer'
}) => {
  return (
    <motion.div
      className={`kwami-slot ${isSelected ? 'selected' : ''} ${position}`}
      initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      whileHover={{ scale: 1.1, rotateY: 15 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onClick={onClick}
    >
      <motion.div
        className="miraculous-slot"
        initial={{ scale: 0 }}
        animate={{ scale: character.state === 'civilian' ? 1 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      >
        <div className="miraculous-container">
          <div className="miraculous-symbol" style={{ backgroundColor: character.kwami.color }}>
            <img
              src={character.kwami.image}
              alt={character.kwami.name}
              className="kwami-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="12" fill="${character.kwami.color}" opacity="0.8"/>
                    <text x="15" y="18" text-anchor="middle" fill="white" font-size="8" font-family="Arial">
                      ${character.kwami.name.charAt(0)}
                    </text>
                  </svg>
                `)}`;
              }}
            />
          </div>
          <div className="miraculous-glow" style={{ backgroundColor: character.kwami.color }} />
        </div>
      </motion.div>
      
      {position === 'center' && (
        <motion.div 
          className="slot-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {character.kwami.name}
        </motion.div>
      )}
    </motion.div>
  );
};

export default KwamiSlot;
