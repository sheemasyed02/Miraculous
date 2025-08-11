import React from 'react';
import { motion } from 'framer-motion';
import './TransformationButton.css';

export interface TransformationButtonProps {
  spell: string;
  onClick: () => void;
  variant: 'transform' | 'detransform' | 'power-up' | 'power-off';
  color?: string;
}

const TransformationButton: React.FC<TransformationButtonProps> = ({
  spell,
  onClick,
  variant,
  color
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case 'transform':
        return 'btn-transform';
      case 'detransform':
        return 'btn-detransform';
      case 'power-up':
        return 'btn-power-up';
      case 'power-off':
        return 'btn-power-off';
      default:
        return 'btn-transform';
    }
  };

  const getButtonIcon = () => {
    switch (variant) {
      case 'transform':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'detransform':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 8L20 4M20 4L20 8M20 4L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'power-up':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 4L13 12M13 12L13 20M13 12L21 12M13 12L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'power-off':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 4L13 12M13 12L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 15L16 20M16 20L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const getAriaLabel = () => {
    switch (variant) {
      case 'transform':
        return `Transform with ${spell}`;
      case 'detransform':
        return `Detransform with ${spell}`;
      case 'power-up':
        return `Power up with ${spell}`;
      case 'power-off':
        return `Power off with ${spell}`;
      default:
        return spell;
    }
  };

  // Apply custom styles if color is provided
  const buttonStyle = color ? {
    '--button-color': color,
    background: `linear-gradient(135deg, ${color}90, ${color}40)`,
    borderColor: `${color}80`,
    boxShadow: `0 5px 15px ${color}40`
  } as React.CSSProperties : {};

  return (
    <motion.button
      className={`transformation-button ${getButtonClass()}`}
      onClick={onClick}
      aria-label={getAriaLabel()}
      style={buttonStyle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
    >
      <span className="button-icon">{getButtonIcon()}</span>
      <span className="spell-text">{spell}</span>
    </motion.button>
  );
};

export default TransformationButton;
