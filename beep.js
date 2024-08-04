import 'dotenv/config';
import {
  InteractionResponseType,
} from 'discord-interactions';

const BEEP_COMMAND = {
    name: 'beep',
    description: 'Beep commmand Baptiste la pute',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  }


export function doSomething(res) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'boop',
        },
      });
}