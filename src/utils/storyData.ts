import type { Story } from '../types/story';
import { createEndingChoices } from './validation/nodeValidator';

export const sampleStory: Story = {
  id: 'sample-story',
  title: 'The Enchanted Forest',
  startNodeId: 'start',
  currentNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      content: 'You find yourself at the edge of an ancient forest. The trees whisper secrets in the wind, and two paths lie before you.',
      choices: [
        {
          text: 'Take the winding path that glows with mysterious lights',
          nextNodeId: 'fairy-path'
        },
        {
          text: 'Follow the darker path that leads deeper into the woods',
          nextNodeId: 'dark-path'
        }
      ]
    },
    'fairy-path': {
      id: 'fairy-path',
      content: 'The glowing lights turn out to be tiny fairies! They circle around you playfully.',
      choices: [
        {
          text: 'Try to communicate with them',
          nextNodeId: 'fairy-communication'
        },
        {
          text: 'Follow them deeper into the forest',
          nextNodeId: 'fairy-follow'
        }
      ]
    },
    'dark-path': {
      id: 'dark-path',
      content: 'The path grows darker, and you hear strange sounds in the distance.',
      choices: [
        {
          text: 'Investigate the sounds',
          nextNodeId: 'mysterious-sounds'
        },
        {
          text: 'Find a safe place to hide',
          nextNodeId: 'hiding-spot'
        }
      ]
    },
    'fairy-communication': {
      id: 'fairy-communication',
      content: 'As you attempt to speak with the fairies, they respond with melodic chimes. They grant you the ability to understand the language of the forest. You have discovered one of the forest\'s greatest secrets!',
      choices: createEndingChoices()
    },
    'fairy-follow': {
      id: 'fairy-follow',
      content: 'The fairies lead you to a magical clearing where you find an ancient treasure chest filled with enchanted artifacts. Your adventure has led to a magnificent discovery!',
      choices: createEndingChoices()
    },
    'mysterious-sounds': {
      id: 'mysterious-sounds',
      content: 'You discover a hidden grove where magical creatures are having a celebration. They welcome you as their honored guest, and you spend an unforgettable evening in their company.',
      choices: createEndingChoices()
    },
    'hiding-spot': {
      id: 'hiding-spot',
      content: 'You find a cozy hollow in an ancient tree. Inside, you discover a magical book that contains the collected wisdom of the forest. You have found your own special sanctuary!',
      choices: createEndingChoices()
    }
  }
};