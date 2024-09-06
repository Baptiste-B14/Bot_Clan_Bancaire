import {
  InteractionResponseType,
} from 'discord-interactions';

import { simpleDelete, simpleInsert, simpleSelect } from '../utils/queries.js';
import { Model } from '../models/test.js';

export const COMMAND_DEF = {
    name: 'beep',
    description: 'Je suis la commande beep',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  }

export async function doSomething(res) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: await simpleSelect(Model, ['id', 'name', 'age'], true),
        },
      });
}
