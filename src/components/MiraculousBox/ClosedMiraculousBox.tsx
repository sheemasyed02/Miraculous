import React from 'react';
import { motion } from 'framer-motion';
import './ClosedMiraculousBox.css';

interface ClosedMiraculousBoxProps {
  onOpen: () => void;
}

const ClosedMiraculousBox: React.FC<ClosedMiraculousBoxProps> = ({ onOpen }) => {
  return (
    <motion.div
      className="closed-miraculous-box"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <div className="box-exterior-closed">
        <motion.div 
          className="box-lid-closed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
        >
          <div className="guardian-symbol-closed">
            <motion.div 
              className="symbol-glow"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="symbol-pattern">
              <div className="symbol-center"></div>
              <div className="symbol-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
              <div className="symbol-ornaments">
                <div className="ornament ornament-1"></div>
                <div className="ornament ornament-2"></div>
                <div className="ornament ornament-3"></div>
                <div className="ornament ornament-4"></div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="open-instruction"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p>Click to open the Miraculous Box</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClosedMiraculousBox;
