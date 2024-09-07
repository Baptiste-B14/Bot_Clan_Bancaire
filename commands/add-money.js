import {addMoney} from "../utils/moneyFunction.js";
import {User} from "../models/user.js";
import {resString, resEmbed} from "../utils/res.js";
import * as queries from "../utils/queries.js";


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
    try {
        const player = req.body.data.options.find(option => option.name === 'player').value;
        const amount = req.body.data.options.find(option => option.name === 'amount').value;

        const users = await queries.selectWithWhere(User, ['pseudo', 'money'], {discordId: player} );
        if(users === null) resString(res, 'Le joueur que vous avez sélectionné n\'est pas référencé dans le jeu');
        try{
            const newMoney = await addMoney(player, users[0].money, amount);


            const embed  = {
                title: `${users[0].pseudo}\'s balance updated.`,
                color: 0x0146b1,
                author: {
                    name: 'Some name',
                    icon_url: 'https://i.imgur.com/AfFp7pu.png',
                    url: 'https://discord.js.org',
                },
                description: `New balance : ${newMoney} ( ancien : ${users[0].money} )`,
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
            resEmbed(res, embed);
        }
        catch(error) {
            console.log(error);
            resString(res, 'Something went wrong with updating.')
        }

    }catch(error){
        console.log(error);
        resString(res, error);

    }
}



