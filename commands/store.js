import { ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";
import { resString, resEmbed, resEmbedComponent } from "../utils/res.js";
import { selectorBuilder, buttonBuilder } from "../utils/componentBuilder.js";
import { simpleSelect } from "../utils/queries.js";
import { Model as armed_entity } from "../models/armed_entity.js";
import { category } from "../utils/categories.js";

export const COMMAND_DEF = {
    name: 'store',
    description: 'Open the store',
    type: 1,
};

export async function doSomething(res, req) {
    try {
        const embed = {
            title: `Bienvenue dans la boutique`,
            color: 0x0146b1,
            description: `Choisissez une ou plusieurs catégories d'objets.`,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Utilisez les boutons ci-dessous pour interagir.',
            },
        };


        const categories = category;
        /*
        const categories = await simpleSelect(armed_entity, ['name'], false);
        const mapper = categories.map((category) => ({
            label: category.name,
            value: category.name,
        }));
        */

        const mapper = categories.map((category) => ({
            label: category.label,
            value: category.value,
        }));
       
        const categoryMenu = new selectorBuilder('category_select', 'Sélectionnez une ou plusieurs catégories', mapper, category.length);
            
        const confirmButton = new buttonBuilder('confirm_category', 'Confirmer' , ButtonStyle.Primary);
        const cancelButton = new buttonBuilder('cancel_action', 'Annuler', ButtonStyle.Danger);

    
    
        
        const buttonRow = new ActionRowBuilder().addComponents(confirmButton, cancelButton);
        const categoryRow = new ActionRowBuilder().addComponents(categoryMenu);
        
        resEmbedComponent(res, embed, [categoryRow, buttonRow]);
        
            
    } catch (error) {
        console.error(error);
        resString(res, error);
    }
}


