import { ActionRowBuilder, ButtonStyle } from "discord.js";
import { InteractionResponseType } from "discord-interactions";
import { resString, resEmbed, resEmbedComponent } from "../utils/res.js";
import { selectorBuilder, buttonBuilder } from "../utils/componentBuilder.js";

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

        const categoryMenu = new selectorBuilder('category_select', 'Sélectionnez une ou plusieurs catégories', [
            { label: 'Vaisseaux', value: 'vaisseaux' },
            { label: 'Armes', value: 'armes' },
            { label: 'Armures', value: 'armures' },
            { label: 'Objets divers', value: 'divers' },
        ], 1, 4);
            
        const confirmButton = new buttonBuilder('confirm_category', 'Confirmer' , ButtonStyle.Primary);
        const cancelButton = new buttonBuilder('cancel_action', 'Annuler', ButtonStyle.Danger);
        const viewCartButton = new buttonBuilder('view_cart', 'Voir Panier', ButtonStyle.Secondary);
    
    
        const categoryRow = new ActionRowBuilder().addComponents(categoryMenu);
        const buttonRow = new ActionRowBuilder().addComponents(confirmButton, cancelButton, viewCartButton);
        
        resEmbedComponent(res, embed, [categoryRow, buttonRow]);
            
            
    } catch (error) {
        console.error(error);
        resString(res, 'Une erreur est survenue');
    }
}


