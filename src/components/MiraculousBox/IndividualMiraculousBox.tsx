import React from 'react';
import { motion } from 'framer-motion';
import './IndividualMiraculousBox.css';

interface Miraculous {
  id: string;
  name: string;
  type: string;
  animal: string;
  color: string;
  design: string;
  layout: 'center' | 'inner' | 'outer';
  position: string;
}

interface IndividualMiraculousBoxProps {
  miraculous: Miraculous;
  isSelected: boolean;
  onClick: () => void;
}

const getPositionStyles = (layout: string, position: string) => {
  // Center compartments (2 segments - Ladybug & Cat Noir) - exactly in center
  if (layout === 'center') {
    if (position === 'center-left') {
      return { 
        top: '50%', 
        left: '42%', 
        transform: 'translate(-50%, -50%)',
        width: '35px',
        height: '35px'
      };
    }
    if (position === 'center-right') {
      return { 
        top: '50%', 
        left: '58%', 
        transform: 'translate(-50%, -50%)',
        width: '35px', 
        height: '35px'
      };
    }
  }

  // Inner octagon compartments (6 segments) - arranged around center
  if (layout === 'inner') {
    const positions = {
      'top-left': { top: '28%', left: '28%', transform: 'translate(-50%, -50%)' }, // Orange
      'top-right': { top: '28%', left: '72%', transform: 'translate(-50%, -50%)' }, // Yellow  
      'right': { top: '50%', left: '85%', transform: 'translate(-50%, -50%)' }, // Green
      'bottom-right': { top: '72%', left: '72%', transform: 'translate(-50%, -50%)' }, // Blue
      'bottom-left': { top: '72%', left: '28%', transform: 'translate(-50%, -50%)' }, // Purple
      'left': { top: '50%', left: '15%', transform: 'translate(-50%, -50%)' } // Pink/Gray
    };
    return { 
      ...positions[position as keyof typeof positions],
      width: '55px',
      height: '55px'
    };
  }

  // Outer ring compartments (12 segments) - around the perimeter
  if (layout === 'outer') {
    const positions = {
      'top-1': { top: '8%', left: '35%', transform: 'translate(-50%, -50%)' }, // Cyan
      'top-2': { top: '8%', left: '50%', transform: 'translate(-50%, -50%)' }, // Red
      'top-3': { top: '8%', left: '65%', transform: 'translate(-50%, -50%)' }, // Brown
      'right-1': { top: '25%', left: '92%', transform: 'translate(-50%, -50%)' }, // Pink
      'right-2': { top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }, // Blue
      'right-3': { top: '75%', left: '92%', transform: 'translate(-50%, -50%)' }, // White
      'bottom-1': { top: '92%', left: '75%', transform: 'translate(-50%, -50%)' }, // White
      'bottom-2': { top: '92%', left: '50%', transform: 'translate(-50%, -50%)' }, // Yellow
      'bottom-3': { top: '92%', left: '25%', transform: 'translate(-50%, -50%)' }, // Yellow
      'left-1': { top: '75%', left: '8%', transform: 'translate(-50%, -50%)' }, // Pink
      'left-2': { top: '50%', left: '0%', transform: 'translate(-50%, -50%)' }, // Blue
      'left-3': { top: '25%', left: '8%', transform: 'translate(-50%, -50%)' } // Blue
    };
    return { 
      ...positions[position as keyof typeof positions],
      width: '50px',
      height: '50px'
    };
  }

  // Default position
  return { 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    width: '50px',
    height: '50px'
  };
};

const IndividualMiraculousBox: React.FC<IndividualMiraculousBoxProps> = ({ 
  miraculous, 
  isSelected, 
  onClick 
}) => {
  const getMiraculousDesign = () => {
    // Simple text labels for now - you'll replace these with actual Miraculous images
    return (
      <div style={{ 
        fontSize: '8px', 
        fontWeight: 'bold', 
        color: '#333',
        textAlign: 'center',
        lineHeight: '1'
      }}>
        {miraculous.animal}
      </div>
    );
  };

  const positionStyles = getPositionStyles(miraculous.layout, miraculous.position);

  return (
    <motion.div
      className={`individual-miraculous-box ${isSelected ? 'selected' : ''}`}
      data-layout={miraculous.layout}
      onClick={onClick}
      style={positionStyles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <div className="miraculous-box-interior">
        <div className="red-velvet-interior"></div>
        <div className="miraculous-item">
          {getMiraculousDesign()}
        </div>
        {isSelected && (
          <div className="selection-glow">
            <div className="glow-ring"></div>
          </div>
        )}
      </div>
      <div className="miraculous-info">
        <span className="miraculous-name">{miraculous.name}</span>
        <span className="miraculous-animal">{miraculous.animal}</span>
      </div>
    </motion.div>
  );
};

export default IndividualMiraculousBox;
