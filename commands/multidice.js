import {
    InteractionResponseType
} from "discord-interactions";

export const COMMAND_DEF = {
    name: 'multidice',
    description: 'Throw several dice at once',
    type: 1,
    options: [{
        name: 'faces',
        description: 'The amount of faces the dice has: 6, 20',
        required: false,
        type: 4,
        choices:[
            {
                name: '6',
                value: 6
            },
            {
                name: '20',
                value: 20
            }
            ]
        },
        {
            name: 'value',
            description: 'The number of throws',
            required: false,
            type: 4
        }],
}


export async function doSomething(res, req) {
    try {
        const faces = req.body.data.options.find(options => options.name === 'faces').value ?? 6;
        const value = req.body.data.options.find(options => options.name === 'value').value ?? 1;
        let results = [];

        for (let i = 0; i < value; i++) {
            results.push(Math.floor(Math.random() * faces) + 1);
        }

        const resultString = results.join(', ');

        const embed = {
            title: 'Dice Roll Results',
            color: 0x0146b1,
            author: {
            name: 'Some name',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.js.org',
            },
            description: `You rolled ${value} d${faces}:\n${resultString}`,
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
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        }


        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [embed],
            },
        });
    }
    catch(error) {
        console.log(error);
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Something went wrong with the throw.',
            },
        });
    }
}
