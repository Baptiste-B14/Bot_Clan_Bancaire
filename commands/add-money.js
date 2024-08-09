import {addMoney} from "../utils/addMoneyFunction.js";
import {User} from "../models/userData.js";

import {
    InteractionResponseType
} from "discord-interactions";


export const COMMAND_DEF = {
    name: 'add-money',
    description: 'Give money to a player',
    type: 1,
    options: [{
        name: 'amount',
        description: 'the amount of money you want to give',
        required: true,
        type: 4,
        },
        {
            name: 'player',
            description: 'the player you want to give money',
            required: true,
            type: 6,
        }
    ],
}

export async function doSomething(res, req) {

    const player = req.body.data.options.find(option => option.name === 'player').value;
    console.log(player);
    const amount = Math.abs(req.body.data.options.find(option => option.name === 'amount').value);
    try {
        const users = await User.findOne({
            where: {discordId: player },
            attributes: ['pseudo', 'money']
        });

        if(users === null) {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Le joueur que vous avez sélectionné n\'est pas référencé dans le jeu',
                },
            });
        }
        const { pseudo, money } = users.dataValues;

        try{
            const moneyUpdated = money+ amount;
            await addMoney(player , moneyUpdated);


            const embed  = {
                title: `${pseudo}\'s balance updated.`,
                color: 0x0146b1,
                author: {
                    name: 'Some name',
                    icon_url: 'https://i.imgur.com/AfFp7pu.png',
                    url: 'https://discord.js.org',
                },
                description: `New balance : ${moneyUpdated} ( ancien : ${money} )`,
                thumbnail: {
                    url: 'https://i.imgur.com/AfFp7pu.png',
                },
                fields: [
                    {
                        name: 'Regular field title',
                        value: 'Some value here',
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                    {
                        name: 'Inline field title',
                        value: 'Some value here',
                        inline: true,
                    },
                    {
                        name: 'Inline field title',
                        value: 'Some value here',
                        inline: true,
                    },
                    {
                        name: 'Inline field title',
                        value: 'Some value here',
                        inline: true,
                    },
                ],
                image: {
                    url: 'https://i.imgur.com/AfFp7pu.png',
                },
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Some footer text here',
                    icon_url: 'https://i.imgur.com/AfFp7pu.png',
                },
            };


            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    //content: `New balance : ${moneyUpdated} ( ancien : ${money} )`


                    embeds: [embed],

                }
            });



        }
        catch(error) {
            console.log(error);
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Something went wrong with updating.',
                },
            });

        }

    }catch(error){
        console.log(error);
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: error,
            },
        });

    }
}



