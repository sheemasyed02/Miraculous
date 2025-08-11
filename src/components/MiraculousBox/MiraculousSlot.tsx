import React from 'react';
import './MiraculousSlot.css';

interface Miraculous {
  id: string;
  name: string;
  type: 'earrings' | 'ring' | 'necklace' | 'bracelet' | 'anklet' | 'hairpin' | 'watch' | 'choker' | 'glasses';
  animal: string;
  color: string;
  position?: { x: number; y: number };
}

interface MiraculousSlotProps {
  miraculous: Miraculous;
  isSelected: boolean;
  onClick: () => void;
}

const MiraculousSlot: React.FC<MiraculousSlotProps> = ({ miraculous, isSelected, onClick }) => {
  const getSlotIcon = () => {
    switch (miraculous.type) {
      case 'earrings':
        return '⭐'; // Ladybug earrings
      case 'ring':
        return '🟡'; // Cat Noir ring
      case 'necklace':
        return '🦊'; // Fox necklace
      case 'bracelet':
        return '🐝'; // Bee bracelet
      case 'anklet':
        return '🐢'; // Turtle anklet
      case 'hairpin':
        return '🦚'; // Peacock hairpin
      case 'watch':
        return '🦋'; // Butterfly watch
      case 'choker':
        return '🐭'; // Mouse choker
      case 'glasses':
        return '🐍'; // Snake glasses
      default:
        return '💎';
    }
  };

  return (
    <div 
      className={`miraculous-slot ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={{
        left: miraculous.position?.x ? `${miraculous.position.x}%` : undefined,
        top: miraculous.position?.y ? `${miraculous.position.y}%` : undefined,
      }}
    >
      <div className="slot-container">
        <div className="slot-base" style={{ backgroundColor: miraculous.color }}>
          <div className="slot-icon">
            {getSlotIcon()}
          </div>
        </div>
        <div className="slot-glow" style={{ backgroundColor: miraculous.color }}></div>
        {isSelected && (
          <div className="selection-ring">
            <div className="ring-pulse"></div>
          </div>
        )}
      </div>
      <div className="slot-label">
        <span className="miraculous-name">{miraculous.name}</span>
        <span className="miraculous-animal">{miraculous.animal}</span>
      </div>
    </div>
  );
};

export default MiraculousSlot;
