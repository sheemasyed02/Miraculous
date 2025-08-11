import type { Character } from '../types';

export const CHARACTERS_DATA: Character[] = [
  // Main Miraculous - Center positions
  {
    id: 'ladybug',
    kwami: {
      id: 'tikki',
      name: 'Tikki',
      image: '/src/assets/images/Ladybug/tikki.png',
      element: 'Creation',
      color: '#ff6b9d'
    },
    civilian: {
      name: 'Marinette Dupain-Cheng',
      image: '/src/assets/images/Ladybug/marenette.png'
    },
    superhero: {
      name: 'Ladybug',
      image: '/src/assets/images/Ladybug/ladybug.png',
      powerUpImage: '/src/assets/images/Ladybug/ladybugpowerup.png'
    },
    transformationSpell: 'Tikki, spots on!',
    detransformationSpell: 'Tikki, spots off!',
    canPowerUp: true,
    state: 'civilian'
  },
  {
    id: 'cat',
    kwami: {
      id: 'plagg',
      name: 'Plagg',
      image: '/src/assets/images/CatNoir/Plagg.png',
      element: 'Destruction',
      color: '#2c3e50'
    },
    civilian: {
      name: 'Adrien Agreste',
      image: '/src/assets/images/CatNoir/Adrien.png'
    },
    superhero: {
      name: 'Cat Noir',
      image: '/src/assets/images/CatNoir/Catnoir.png',
      powerUpImage: '/src/assets/images/CatNoir/catnoirpowerup.png'
    },
    transformationSpell: 'Plagg, claws out!',
    detransformationSpell: 'Plagg, claws in!',
    canPowerUp: true,
    state: 'civilian'
  }
];
