import { StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";


export function buttonBuilder(id, label, style) {
    
    return new ButtonBuilder()
       .setCustomId(id)
       .setLabel(label)
       .setStyle(style);
 
}

export function selectorBuilder(id, placeholder, options, minValue, maxValue){
    return new StringSelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder(placeholder)
    .addOptions(options)
    .setMinValues(minValue)
    .setMaxValues(maxValue);
}