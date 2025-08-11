import { Howl } from 'howler';

interface SoundManager {
  transformation: Howl | null;
  detransformation: Howl | null;
  powerUp: Howl | null;
  powerOff: Howl | null;
}

class AudioManager {
  private sounds: Map<string, SoundManager> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Initialize sound for each character
    const characters = ['tikki', 'plagg', 'nooroo'];
    
    characters.forEach(character => {
      this.sounds.set(character, {
        transformation: new Howl({
          src: [`/src/assets/sounds/${character}-transform.mp3`],
          volume: 0.7,
          preload: false
        }),
        detransformation: new Howl({
          src: [`/src/assets/sounds/${character}-detransform.mp3`],
          volume: 0.7,
          preload: false
        }),
        powerUp: character === 'tikki' || character === 'plagg' ? new Howl({
          src: [`/src/assets/sounds/${character}-powerup.mp3`],
          volume: 0.7,
          preload: false
        }) : null,
        powerOff: character === 'tikki' || character === 'plagg' ? new Howl({
          src: [`/src/assets/sounds/${character}-poweroff.mp3`],
          volume: 0.7,
          preload: false
        }) : null
      });
    });
  }

  playTransformation(characterId: string) {
    if (!this.isEnabled) return;
    const sound = this.sounds.get(characterId)?.transformation;
    if (sound) {
      sound.play();
    }
  }

  playDetransformation(characterId: string) {
    if (!this.isEnabled) return;
    const sound = this.sounds.get(characterId)?.detransformation;
    if (sound) {
      sound.play();
    }
  }

  playPowerUp(characterId: string) {
    if (!this.isEnabled) return;
    const sound = this.sounds.get(characterId)?.powerUp;
    if (sound) {
      sound.play();
    }
  }

  playPowerOff(characterId: string) {
    if (!this.isEnabled) return;
    const sound = this.sounds.get(characterId)?.powerOff;
    if (sound) {
      sound.play();
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
  }

  setVolume(volume: number) {
    this.sounds.forEach(soundManager => {
      Object.values(soundManager).forEach(sound => {
        if (sound) {
          sound.volume(Math.max(0, Math.min(1, volume)));
        }
      });
    });
  }
}

export const audioManager = new AudioManager();
