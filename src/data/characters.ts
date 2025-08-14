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
  },
  // Inner ring Miraculous
  {
    id: 'fox',
    kwami: {
      id: 'trixx',
      name: 'Trixx',
      image: '/src/assets/images/RenaRouge/trixx.png',
      element: 'Illusion',
      color: '#ff7700'
    },
    civilian: {
      name: 'Alya Césaire',
      image: '/src/assets/images/RenaRouge/Alya.png'
    },
    superhero: {
      name: 'Rena Rouge',
      image: '/src/assets/images/RenaRouge/RenaRouge.png'
    },
    transformationSpell: 'Trixx, let\'s pounce!',
    detransformationSpell: 'Trixx, let\'s rest!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'turtle',
    kwami: {
      id: 'wayzz',
      name: 'Wayzz',
      image: '/src/assets/images/Carapace/Wayzz.png',
      element: 'Protection',
      color: '#00cc66'
    },
    civilian: {
      oldHolder: {
        name: 'Master Fu',
        image: '/src/assets/images/Carapace/Master_Wang_Fu.png'
      },
      newHolder: {
        name: 'Nino Lahiffe',
        image: '/src/assets/images/Carapace/Nino.png'
      }
    },
    superhero: {
      oldSuperhero: {
        name: 'Master Fu',
        image: '/src/assets/images/Carapace/Master_Fu.png'
      },
      newSuperhero: {
        name: 'Carapace',
        image: '/src/assets/images/Carapace/Carapace.png'
      }
    },
    transformationSpell: 'Wayzz, shell on!',
    detransformationSpell: 'Wayzz, shell off!',
    canPowerUp: false,
    state: 'civilian',
    isDualHolder: true
  },
  {
    id: 'bee',
    kwami: {
      id: 'pollen',
      name: 'Pollen',
      image: '/src/assets/images/Vesperia/Pollen.png',
      element: 'Subjection',
      color: '#ffee00'
    },
    civilian: {
      oldHolder: {
        name: 'Chloé Bourgeois',
        image: '/src/assets/images/Vesperia/Chloe.png'
      },
      newHolder: {
        name: 'Zoé Lee',
        image: '/src/assets/images/Vesperia/Zoe.png'
      }
    },
    superhero: {
      oldSuperhero: {
        name: 'Queen Bee',
        image: '/src/assets/images/Vesperia/QueenBee.png'
      },
      newSuperhero: {
        name: 'Vesperia',
        image: '/src/assets/images/Vesperia/Vesperia.png'
      }
    },
    transformationSpell: 'Pollen, buzz on!',
    detransformationSpell: 'Pollen, buzz off!',
    canPowerUp: false,
    state: 'civilian',
    isDualHolder: true
  },
  {
    id: 'butterfly',
    kwami: {
      id: 'nooroo',
      name: 'Nooroo',
      image: '/src/assets/images/ShadowMoth/Nooroo.png',
      element: 'Transmission',
      color: '#9900cc'
    },
    civilian: {
      name: 'Gabriel Agreste',
      image: '/src/assets/images/ShadowMoth/Gabriel.png'
    },
    superhero: {
      name: 'Hawk Moth',
      image: '/src/assets/images/ShadowMoth/HawkMoth.png',
      powerUpImage: '/src/assets/images/ShadowMoth/ShadowMoth.png'
    },
    transformationSpell: 'Nooroo, dark wings rise!',
    detransformationSpell: 'Nooroo, dark wings fall!',
    canPowerUp: true,
    state: 'civilian'
  },
  {
    id: 'peacock',
    kwami: {
      id: 'duusu',
      name: 'Duusu',
      image: '/src/assets/images/Mayura/Duusu.png',
      element: 'Emotion',
      color: '#6633cc'
    },
    civilian: {
      oldHolder: {
        name: 'Nathalie Sancoeur',
        image: '/src/assets/images/Mayura/Nathalie.png'
      },
      newHolder: {
        name: 'Félix Fathom',
        image: '/src/assets/images/Mayura/Félix.png'
      }
    },
    superhero: {
      oldSuperhero: {
        name: 'Mayura',
        image: '/src/assets/images/Mayura/Mayura.png'
      },
      newSuperhero: {
        name: 'Argos',
        image: '/src/assets/images/Mayura/Argos.png'
      }
    },
    transformationSpell: 'Duusu, spread my feathers!',
    detransformationSpell: 'Duusu, fold my feathers!',
    canPowerUp: false,
    state: 'civilian',
    isDualHolder: true
  },
  {
    id: 'mouse',
    kwami: {
      id: 'mullo',
      name: 'Mullo',
      image: '/src/assets/images/Polymouse/Mullo.png',
      element: 'Multiplication',
      color: '#ff9999'
    },
    civilian: {
      name: 'Mylene Haprèle',
      image: '/src/assets/images/Polymouse/Mylene.png'
    },
    superhero: {
      name: 'Polymouse',
      image: '/src/assets/images/Polymouse/Polymouse.png'
    },
    transformationSpell: 'Mullo, get squeaky!',
    detransformationSpell: 'Mullo, quiet down!',
    canPowerUp: false,
    state: 'civilian'
  },
  
  // Outer ring Miraculous
  {
    id: 'snake',
    kwami: {
      id: 'sass',
      name: 'Sass',
      image: '/src/assets/images/Viperion/Sass.png',
      element: 'Second Chance',
      color: '#00cccc'
    },
    civilian: {
      name: 'Luka Couffaine',
      image: '/src/assets/images/Viperion/Luka.png'
    },
    superhero: {
      name: 'Viperion',
      image: '/src/assets/images/Viperion/Viperion.png'
    },
    transformationSpell: 'Sass, scales slither!',
    detransformationSpell: 'Sass, scales rest!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'dragon',
    kwami: {
      id: 'longg',
      name: 'Longg',
      image: '/src/assets/images/Ryuko/Longg.png',
      element: 'Perfection',
      color: '#cc0000'
    },
    civilian: {
      name: 'Kagami Tsurugi',
      image: '/src/assets/images/Ryuko/Kagami.png'
    },
    superhero: {
      name: 'Ryuko',
      image: '/src/assets/images/Ryuko/Ryuko.png'
    },
    transformationSpell: 'Longg, bring the storm!',
    detransformationSpell: 'Longg, open sky!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'horse',
    kwami: {
      id: 'kaalki',
      name: 'Kaalki',
      image: '/src/assets/images/Pegasus/Kaalki.png',
      element: 'Teleportation',
      color: '#996633'
    },
    civilian: {
      name: 'Max Kanté',
      image: '/src/assets/images/Pegasus/Max.png'
    },
    superhero: {
      name: 'Pegasus',
      image: '/src/assets/images/Pegasus/Pegasus.png'
    },
    transformationSpell: 'Kaalki, full gallop!',
    detransformationSpell: 'Kaalki, dismount!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'monkey',
    kwami: {
      id: 'xuppu',
      name: 'Xuppu',
      image: '/src/assets/images/KingMonkey/Xuppu.png',
      element: 'Jubilation',
      color: '#ff9900'
    },
    civilian: {
      name: 'Kim Lê Chiến',
      image: '/src/assets/images/KingMonkey/Kim.png'
    },
    superhero: {
      name: 'King Monkey',
      image: '/src/assets/images/KingMonkey/KingMonkey.png'
    },
    transformationSpell: 'Xuppu, showtime!',
    detransformationSpell: 'Xuppu, playtime\'s over!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'pig',
    kwami: {
      id: 'daizzi',
      name: 'Daizzi',
      image: '/src/assets/images/Pigella/Daizzi.png',
      element: 'Celebration',
      color: '#ff99cc'
    },
    civilian: {
      name: 'Rose Lavillant',
      image: '/src/assets/images/Pigella/Rose.png'
    },
    superhero: {
      name: 'Pigella',
      image: '/src/assets/images/Pigella/Pigella.png'
    },
    transformationSpell: 'Daizzi, oink up!',
    detransformationSpell: 'Daizzi, oink down!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'ox',
    kwami: {
      id: 'stompp',
      name: 'Stompp',
      image: '/src/assets/images/Minotaurox/Stompp.png',
      element: 'Strength',
      color: '#ffcc33'
    },
    civilian: {
      name: 'Ivan Bruel',
      image: '/src/assets/images/Minotaurox/Ivan.png'
    },
    superhero: {
      name: 'Minotaurox',
      image: '/src/assets/images/Minotaurox/Minotaurox.png'
    },
    transformationSpell: 'Stompp, make way!',
    detransformationSpell: 'Stompp, stand down!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'tiger',
    kwami: {
      id: 'roaar',
      name: 'Roaar',
      image: '/src/assets/images/PurpleTigress/Roaar.png',
      element: 'Passion',
      color: '#ff9933'
    },
    civilian: {
      name: 'Juleka Couffaine',
      image: '/src/assets/images/PurpleTigress/Juleka.png'
    },
    superhero: {
      name: 'Purple Tigress',
      image: '/src/assets/images/PurpleTigress/PurpleTigress.png'
    },
    transformationSpell: 'Roaar, stripes on!',
    detransformationSpell: 'Roaar, stripes off!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'rabbit',
    kwami: {
      id: 'fluff',
      name: 'Fluff',
      image: '/src/assets/images/Bunnyx/Fluff.png',
      element: 'Time',
      color: '#ff66cc'
    },
    civilian: {
      name: 'Alix Kubdel',
      image: '/src/assets/images/Bunnyx/Alix.png'
    },
    superhero: {
      name: 'Bunnyx',
      image: '/src/assets/images/Bunnyx/Bunnyx.png'
    },
    transformationSpell: 'Fluff, clockwise!',
    detransformationSpell: 'Fluff, counterclockwise!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'dog',
    kwami: {
      id: 'barkk',
      name: 'Barkk',
      image: '/src/assets/images/MissHound/Barkk.png',
      element: 'Fetching',
      color: '#ff6699'
    },
    civilian: {
      name: 'Sabrina Raincomprix',
      image: '/src/assets/images/MissHound/Sabrina.png'
    },
    superhero: {
      name: 'Miss Hound',
      image: '/src/assets/images/MissHound/MissHound.png'
    },
    transformationSpell: 'Barkk, on the hunt!',
    detransformationSpell: 'Barkk, good dog!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'rooster',
    kwami: {
      id: 'orikko',
      name: 'Orikko',
      image: '/src/assets/images/RoosterBold/Orikko.png',
      element: 'Boldness',
      color: '#3366ff'
    },
    civilian: {
      name: 'Marc Anciel',
      image: '/src/assets/images/RoosterBold/Marc.png'
    },
    superhero: {
      name: 'Rooster Bold',
      image: '/src/assets/images/RoosterBold/Rooster_Bold.png'
    },
    transformationSpell: 'Orikko, sunrise!',
    detransformationSpell: 'Orikko, sunset!',
    canPowerUp: false,
    state: 'civilian'
  },
  {
    id: 'goat',
    kwami: {
      id: 'ziggy',
      name: 'Ziggy',
      image: '/src/assets/images/Caprikid/Ziggy.png',
      element: 'Creativity',
      color: '#33cccc'
    },
    civilian: {
      name: 'Nathaniel Kurtzberg',
      image: '/src/assets/images/Caprikid/Nathaniel.png'
    },
    superhero: {
      name: 'Caprikid',
      image: '/src/assets/images/Caprikid/Caprikid.png'
    },
    transformationSpell: 'Ziggy, get bouncy!',
    detransformationSpell: 'Ziggy, settle down!',
    canPowerUp: false,
    state: 'civilian'
  }
];
