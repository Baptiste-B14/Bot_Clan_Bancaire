import {User} from "../models/userData.js";

import {
    InteractionResponseType
} from "discord-interactions";

export const COMMAND_DEF = {
    name: 'account',
    description: 'Create a new account',
    type: 1,
    options: [{
        name: 'pseudo',
        description: 'The pseudonyme of your character',
        required: true,
        type: 4,
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

        return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `User  ${user.pseudo} created.`,
                },
            });
    }
    catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'You already posess an account',
                    },
                });
        }
        console.log(error);
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Something went wrong with creating an account.',
            },
        });
    }
}
