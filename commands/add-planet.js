import {Planet} from "../models/planet.js";
import {getChannelInfo} from "../utils/channelInfo.js";
import {extractPlanetName} from "../utils/extractPlanetName.js";
import {
    InteractionResponseType
} from "discord-interactions";
import {resString} from "../utils/res.js";

export const COMMAND_DEF = {
    name: 'add-planet',
    description: 'Add a new planet',
    type: 1,
    options: [{
        name: 'planet',
        description: 'The channel of the planet you want to add',
        required: true,
        type: 7,
        },
        {
            name: 'role',
            description: 'The role associated to the planet',
            required: true,
            type: 8
        },
        {
            name: 'cost',
            description: 'The cost of the planet',
            required: true,
            type: 4
        }],
}


export async function doSomething(res, req) {

    try {
        const channel = req.body.data.options.find(options => options.name === 'planet').value;
        const name = await getChannelInfo(channel);
        const role = req.body.data.options.find(options => options.name === 'role').value;

        const planet = await Planet.create({
            name: extractPlanetName(name.name) ,
            role: role,
            salon: channel,
            cost: req.body.data.options.find(options => options.name === 'cost').value,
        });
        resString(res, `planet ${planet.name} added.`);

    }
    catch(error) {
        console.log(error);
        resString(res, 'Something went wrong with adding the planet.');
    }
}
