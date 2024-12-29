import {User} from "../models/1-user.js";

import {
    InteractionResponseType
} from "discord-interactions";
import {resString} from "../utils/res.js";

export const COMMAND_DEF = {
    name: 'account',
    description: 'Create a new account',
    type: 1,
    options: [{
        name: 'pseudo',
        description: 'The pseudonyme of your character',
        required: true,
        type: 3,
        }
        ],
}


export async function doSomething(res, req) {
    try {
        const user = await User.create({
               username: req.body.member.user.username,
               discordId: req.body.member.user.id,
               pseudo: req.body.data.options.find(option => option.name === 'pseudo').value,
               money:  0,
               moneyUsed: 0
        });
        resString(res, `User  ${user.pseudo} created.`);
    }
    catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            resString(res, 'You already posess an account');
        }
        console.log(error);
        resString(res, 'Something went wrong with creating an account.')
    }
}
