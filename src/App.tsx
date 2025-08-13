import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MiraculousBoxCanonical from './components/MiraculousBox/MiraculousBoxCanonical';
import CursorEffect from './components/UI/CursorEffect';
import { useCharacterState } from './hooks/useCharacterState';
import { soundManager } from './utils/soundManager';
import './App.css';

// Import logo or use a placeholder
import miraculousIcon from './assets/images/box/miraculousbox_icon.png';

function App() {
  const {
    characters,
    selectedCharacter,
    selectCharacter
  } = useCharacterState();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleKwamiClick = (characterId: string) => {
    selectCharacter(characterId);
  };

  const toggleSound = () => {
    const isEnabled = soundManager.toggleSound();
    setIsSoundEnabled(isEnabled);
  };

  return (
    <div className="app">
      {/* Magical Cursor Effect */}
      <CursorEffect />
      
      <header className="app-header">
        <img src={miraculousIcon} alt="Miraculous Box" className="app-logo" />
      </header>
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="app-container"
          key={selectedCharacter || 'main'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <main className="app-main">
            <MiraculousBoxCanonical
              characters={characters}
              onKwamiClick={handleKwamiClick}
              selectedCharacter={selectedCharacter}
            />
          </main>
        </motion.div>
      </AnimatePresence>

      <motion.button 
        className="sound-toggle"
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isSoundEnabled ? (
            <>
              <path d="M12 4L8 8H4V16H8L12 20V4Z" fill="currentColor" />
              <path d="M16.5 8.5C17.7 9.77 18.5 11.38 18.5 13C18.5 14.62 17.7 16.23 16.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M19.5 5.5C21.4 7.4 22.5 10 22.5 12.5C22.5 15 21.4 17.6 19.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M12 4L8 8H4V16H8L12 20V4Z" fill="currentColor" />
              <path d="M20 9L16 13M16 9L20 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </motion.button>
    </div>
  );
}

export default App;
