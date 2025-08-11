// Sound effects for miraculous transformations
class SoundManager {
  private audio: HTMLAudioElement | null = null;
  private soundsPath = '/src/assets/sounds/';
  private isEnabled = true;

  constructor() {
    this.preloadSounds();
  }

  private preloadSounds() {
    // Preload commonly used sounds
    if (typeof window !== 'undefined') {
      const sounds = [
        'transform.mp3',
        'detransform.mp3',
        'powerup.mp3',
      ];

      sounds.forEach(sound => {
        const audio = new Audio();
        audio.src = this.soundsPath + sound;
        audio.preload = 'auto';
      });
    }
  }

  public playSound(soundType: string, characterId?: string) {
    if (!this.isEnabled) return;
    
    try {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      
      let soundPath = '';
      
      // Character-specific sounds
      if (characterId) {
        switch (soundType) {
          case 'transformation':
            soundPath = `${characterId}-transform.mp3`;
            break;
          case 'detransformation':
            soundPath = `${characterId}-detransform.mp3`;
            break;
          case 'powerUp':
            soundPath = `${characterId}-powerup.mp3`;
            break;
          case 'powerOff':
            soundPath = `${characterId}-poweroff.mp3`;
            break;
          default:
            soundPath = `${soundType}.mp3`;
        }
      } else {
        // Generic sounds
        soundPath = `${soundType}.mp3`;
      }
      
      // Fallback to generic sounds if character-specific not found
      this.audio = new Audio(this.soundsPath + soundPath);
      
      this.audio.volume = 0.7;
      this.audio.play().catch(err => {
        console.log('Audio play error:', err);
        
        // Try fallback sound if character-specific fails
        if (characterId) {
          this.audio = new Audio(this.soundsPath + `${soundType}.mp3`);
          this.audio.volume = 0.7;
          this.audio.play().catch(err => console.log('Fallback audio error:', err));
        }
      });
    } catch (error) {
      console.error('Sound playback error:', error);
    }
  }

  public toggleSound() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  public isSoundEnabled() {
    return this.isEnabled;
  }
}

export const soundManager = new SoundManager();

export const playSound = (soundType: string, characterId?: string) => {
  soundManager.playSound(soundType, characterId);
};
