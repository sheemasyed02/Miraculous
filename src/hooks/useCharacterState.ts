import { useState, useCallback } from 'react';
import type { Character, CharacterState } from '../types';
import { CHARACTERS_DATA } from '../data/characters';
import { audioManager } from '../utils/audioManager';

export const useCharacterState = () => {
  const [characters, setCharacters] = useState<Character[]>(CHARACTERS_DATA);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const updateCharacterState = useCallback((characterId: string, newState: CharacterState) => {
    setCharacters(prev => 
      prev.map(char => 
        char.id === characterId 
          ? { ...char, state: newState }
          : char
      )
    );
  }, []);

  const transformCharacter = useCallback((characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (!character || character.state !== 'civilian') return;

    audioManager.playTransformation(character.kwami.id);
    updateCharacterState(characterId, 'superhero');
  }, [characters, updateCharacterState]);

  const detransformCharacter = useCallback((characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (!character || character.state !== 'superhero') return;

    audioManager.playDetransformation(character.kwami.id);
    updateCharacterState(characterId, 'civilian');
  }, [characters, updateCharacterState]);

  const powerUpCharacter = useCallback((characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (!character || character.state !== 'superhero' || !character.canPowerUp) return;

    audioManager.playPowerUp(character.kwami.id);
    updateCharacterState(characterId, 'power-up');
  }, [characters, updateCharacterState]);

  const powerOffCharacter = useCallback((characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (!character || character.state !== 'power-up') return;

    audioManager.playPowerOff(character.kwami.id);
    updateCharacterState(characterId, 'superhero');
  }, [characters, updateCharacterState]);

  const selectCharacter = useCallback((characterId: string | null) => {
    setSelectedCharacter(characterId);
  }, []);

  const getCharacter = useCallback((characterId: string) => {
    return characters.find(c => c.id === characterId);
  }, [characters]);

  return {
    characters,
    selectedCharacter,
    transformCharacter,
    detransformCharacter,
    powerUpCharacter,
    powerOffCharacter,
    selectCharacter,
    getCharacter
  };
};
