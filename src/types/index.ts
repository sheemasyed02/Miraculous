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
  } | {
    // Dual holders: old holder (left) and new holder (right)
    oldHolder: {
      name: string;
      image: string;
    };
    newHolder: {
      name: string;
      image: string;
    };
  };
  superhero: {
    name: string;
    image: string;
    powerUpImage?: string;
  } | {
    // Dual superheroes: old superhero (left) and new superhero (right)
    oldSuperhero: {
      name: string;
      image: string;
      powerUpImage?: string;
    };
    newSuperhero: {
      name: string;
      image: string;
      powerUpImage?: string;
    };
  };
  transformationSpell: string;
  detransformationSpell: string;
  canPowerUp: boolean;
  state: CharacterState;
  isDualHolder?: boolean; // Flag to identify dual holder characters
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
