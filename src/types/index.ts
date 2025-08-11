export type CharacterState = 'civilian' | 'superhero' | 'power-up';

export interface Kwami {
  id: string;
  name: string;
  image: string;
  element: string;
  color: string;
}

export interface Character {
  id: string;
  kwami: Kwami;
  civilian: {
    name: string;
    image: string;
  };
  superhero: {
    name: string;
    image: string;
    powerUpImage?: string;
  };
  transformationSpell: string;
  detransformationSpell: string;
  canPowerUp: boolean;
  state: CharacterState;
}

export interface SoundConfig {
  transformation: string;
  detransformation: string;
  powerUp?: string;
  powerOff?: string;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  stagger: number;
}
