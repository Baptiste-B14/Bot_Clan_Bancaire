import { StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";


export function buttonBuilder(id, label, style) {
    
    return new ButtonBuilder()
       .setCustomId(id)
       .setLabel(label)
       .setStyle(style);
 
}

export function selectorBuilder(id, placeholder, options, maxValues){
    return new StringSelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder(placeholder)
    .addOptions(...options)
    .setMinValues(1)
    .setMaxValues(maxValues)
    
}

export const cancelButton = new buttonBuilder('cancel_action', 'Annuler', ButtonStyle.Danger);