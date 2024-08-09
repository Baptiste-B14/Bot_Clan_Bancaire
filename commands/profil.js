import {User} from "../models/userData.js";
import {
    InteractionResponseType
} from "discord-interactions";

export const COMMAND_DEF = {
    name: 'profil',
    description: 'Print the informations of the player',
    type: 1,
    options: [{
        name: 'player',
        description: 'The player you want to know more about',
        required: false,
        type: 6,
    }
    ],
}

export async function doSomething(res, req) {

        const player = req.body.data.options.find(option => option.name === 'player').value ?? req.body.member.user.id;
        console.log(player);
        try {
            const users = await User.findOne({
                where: {discordId: player },
                attributes: ['pseudo', 'money']
            });
            console.log(users);

            if(users === null) {
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'Le joueur que vous avez sélectionné n\'est pas référencé dans le jeu',
                    },
                });
            }

            const { pseudo, money } = users.dataValues;
        const embed  = {
            title: `${pseudo}\'s profile.`,
            color: 0x0146b1,
            author: {
                name: 'Some name',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.js.org',
            },
            description: `Argent : ${money}\nPlanètes : `,
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
                embeds: [embed],
            },
        });
    }catch (error){
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Error',
            },
        });
    }

}


