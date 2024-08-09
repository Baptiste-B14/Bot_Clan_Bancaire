import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';
import { readdirSync } from 'fs';

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
const ALL_COMMANDS = [];

for(const file of commandFiles){
  const {COMMAND_DEF} = await import('./commands/'+file)
  console.log("Cette commande va être ajoutée : " + COMMAND_DEF.name)
  ALL_COMMANDS.push(COMMAND_DEF)  
}

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

console.log(ALL_COMMANDS)
InstallGlobalCommands( process.env.APP_ID, ALL_COMMANDS);
