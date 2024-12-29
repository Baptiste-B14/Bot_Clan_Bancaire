import {InteractionResponseType} from "discord-interactions";


export function resString(res, content) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: content,
        },
    })
}




export function resEmbed(res, embed) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
           embeds: [embed],
        },
    })
}

export function resEmbedComponent(res, embed, component) {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
           embeds: [embed],
           components: component
        },
    })
}

export function resEmbedComponentUpdate(res, embed, component) {
    return res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
            embeds: [embed],
            components: component,
        },
    });

}