import { useState, useCallback } from 'react';
import type { Character } from '../types';
import { playSound } from '../utils/soundManager';

export const useTransformation = (character: Character | null) => {
  const [transformationState, setTransformationState] = useState<'civilian' | 'superhero' | 'power-up'>('civilian');
  const [isTransforming, setIsTransforming] = useState(false);

  const transform = useCallback(() => {
    if (!character || isTransforming) return;
    
    setIsTransforming(true);
    
    // Play transformation sound based on character
    playSound('transformation', character.id);
    
    // Use a longer animation time for a more dramatic effect
    setTimeout(() => {
      setTransformationState('superhero');
      setIsTransforming(false);
      
      // Play success sound
      playSound('transformationComplete', character.id);
    }, 3000); // Longer transformation time for dramatic effect
  }, [character, isTransforming]);

  const detransform = useCallback(() => {
    if (!character || isTransforming) return;
    
    setIsTransforming(true);
    
    // Play detransformation sound
    playSound('detransformation', character.id);
    
    setTimeout(() => {
      setTransformationState('civilian');
      setIsTransforming(false);
      
      // Play success sound
      playSound('detransformationComplete', character.id);
    }, 2000);
  }, [character, isTransforming]);

  const powerUp = useCallback(() => {
    if (!character || isTransforming || !character.canPowerUp) return;
    
    setIsTransforming(true);
    
    // Play power up sound
    playSound('powerUp', character.id);
    
    setTimeout(() => {
      setTransformationState('power-up');
      setIsTransforming(false);
      
      // Play success sound
      playSound('powerUpComplete', character.id);
    }, 2500);
  }, [character, isTransforming]);

  const powerOff = useCallback(() => {
    if (!character || isTransforming) return;
    
    setIsTransforming(true);
    
    // Play power off sound
    playSound('powerOff', character.id);
    
    setTimeout(() => {
      setTransformationState('superhero');
      setIsTransforming(false);
      
      // Play success sound
      playSound('powerOffComplete', character.id);
    }, 2000);
  }, [character, isTransforming]);

  return {
    transformationState,
    isTransforming,
    transform,
    detransform,
    powerUp,
    powerOff
  };
};
