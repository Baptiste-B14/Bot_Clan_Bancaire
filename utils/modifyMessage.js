import { ActionRowBuilder, ActionRow } from "discord.js";
import { resString } from "./res.js";
import {
    InteractionType,
    InteractionResponseType,
  } from 'discord-interactions';
  import { ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from "discord.js";
  import { selectorBuilder, buttonBuilder } from "./componentBuilder.js";



const userCart = new Map(); 
let userSelections = {};  

export async function modifyMessage(res, req) {
    const { type, data, member } = req.body;
    const { custom_id } = data;
    const userId = member.user.id
    let selectedCategories = [];

    // Gérer la sélection des catégories
    if (custom_id === 'category_select') {
      selectedCategories = data.values;
      return await handleCategorySelection(res, req, selectedCategories);
    }

    // Gérer la confirmation
    if (custom_id === 'confirm_category') {
      return await handleCategoryConfirmation(res, req, selectedCategories);
    }

    // Gérer l'achat d'items spécifiques
    if (custom_id.startsWith('buy_')) {
      const category = custom_id.split('_')[1];
      return await handleItemPurchase(res, req, category);
    }

    if (custom_id === 'cancel_action') {
        return await handleCancel(res, req);
    }

}


export async function handleCategoryConfirmation(res, req, selectedCategories) {
    try {
        console.log("confirm");
        const categoryEmbed = {
            title: `Boutique`,
            color: 0x0146b1,
            description: `Voici les articles disponibles pour les catégories sélectionnées :`,
            fields: selectedCategories.map((category) => ({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                value: `Sélectionnez les items dans la catégorie ${category}.`,
            })),
            timestamp: new Date().toISOString(),
        };

        const itemsOptions = [{ label: 'Vaisseau qui va vite', value: 'vaisseaux' },
            { label: 'Lance-Kayou', value: 'armes' },
            { label: 'Patator', value: 'autre' },
            { label: 'Spoofer3000', value: 'divers' },
            ]

        const item_Menu = new selectorBuilder('item_select', 'Selectionner un ou plusieurs items', itemsOptions, 1, 4);
        const categoryButtons = 
            new ButtonBuilder()
                .setCustomId('buy_')
                .setLabel('Acheter')
                .setStyle(ButtonStyle.Primary);
        

        const buttonsRow = new ActionRowBuilder().addComponents(categoryButtons);
        const selectRow = new ActionRowBuilder().addComponents(item_Menu);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds: [categoryEmbed],
                components: [selectRow, buttonsRow],
            },
        });
    } catch (error) {
        console.error("Erreur dans la confirmation de catégorie:", error.message);
        resString(res, `Erreur lors de la confirmation : ${error.message}`);
    }
}


export async function handleCategorySelection(res, req, selectedCategories) {
    try {
        const categoryList = selectedCategories.join(', ');

        const options = [{ label: 'Vaisseaux', value: 'vaisseaux' },
        { label: 'Armes', value: 'armes' },
        { label: 'Armures', value: 'armures' },
        { label: 'Objets divers', value: 'divers' },
        ]

        const formattedOptions = options.map(option => ({
            label: option.label,
            value: option.value,
            default: selectedCategories.includes(option.value)  // Si l'option a été sélectionnée, on la marque par défaut
        }));
    
        const categoryMenu = new selectorBuilder('category_select', 'Sélectionnez une ou plusieurs catégories', formattedOptions, 1, 4);

        const confirmButton = new buttonBuilder('confirm_category', 'Confirmer' , ButtonStyle.Primary);
        const cancelButton = new buttonBuilder('cancel_action', 'Annuler', ButtonStyle.Danger);

        const selectRow = new ActionRowBuilder().addComponents(categoryMenu);
        const buttonRow = new ActionRowBuilder().addComponents(confirmButton, cancelButton);
        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: `Catégories sélectionnées : ${categoryList}. Veuillez confirmer.`,
                components: [selectRow, buttonRow],
            },
        });
    } catch (error) {
        console.error("Erreur lors de la sélection de catégorie:", error);
        resString(res, 'Erreur lors de la sélection de catégorie.');
    }
}

// Fonction pour gérer l'achat d'items avec gestion de la quantité
export async function handleItemPurchase(res, req, category) {
    try {
        const userId = req.body.member.user.id;
        const cart = userCart.get(userId) || [];

        // Quantité par défaut
        let quantity = 1;

        const itemEmbed = {
            title: `Achat de ${category}`,
            color: 0x0146b1,
            description: `Choisissez la quantité à acheter pour l'item ${category}.`,
            fields: [
                {
                    name: 'Quantité actuelle',
                    value: `${quantity}`,
                },
            ],
            timestamp: new Date().toISOString(),
        };

        // Boutons pour ajuster la quantité
        const minusButton = new ButtonBuilder()
            .setCustomId('minus_quantity')
            .setLabel('-')
            .setStyle(ButtonStyle.Secondary);

        const plusButton = new ButtonBuilder()
            .setCustomId('plus_quantity')
            .setLabel('+')
            .setStyle(ButtonStyle.Secondary);

        const addToCartButton = new ButtonBuilder()
            .setCustomId(`add_to_cart_${category}`)
            .setLabel('Ajouter au Panier')
            .setStyle(ButtonStyle.Success);

        const buttonRow = new ActionRowBuilder().addComponents(minusButton, plusButton, addToCartButton);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds: [itemEmbed],
                components: [buttonRow],
            },
        });

    } catch (error) {
        console.error("Erreur lors de l'achat de l'item:", error);
        resString(res, 'Erreur lors de l\'achat.');
    }
}

export async function handleCancel(res, req){
     
     return res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
            content: 'Action annulée.',
            embeds : [],
            components: [],  
        },
    });

}

// Fonction pour ajuster la quantité
export async function handleQuantityAdjustment(res, req, action, category, quantity) {
    try {
        // Ajuster la quantité
        if (action === 'plus_quantity') {
            quantity += 1;
        } else if (action === 'minus_quantity' && quantity > 1) {
            quantity -= 1;
        }

        const updatedEmbed = {
            title: `Achat de ${category}`,
            color: 0x0146b1,
            description: `Quantité à acheter : ${quantity}`,
            fields: [
                {
                    name: 'Quantité actuelle',
                    value: `${quantity}`,
                },
            ],
            timestamp: new Date().toISOString(),
        };

        const minusButton = new ButtonBuilder()
            .setCustomId('minus_quantity')
            .setLabel('-')
            .setStyle(ButtonStyle.Secondary);

        const plusButton = new ButtonBuilder()
            .setCustomId('plus_quantity')
            .setLabel('+')
            .setStyle(ButtonStyle.Secondary);

        const addToCartButton = new ButtonBuilder()
            .setCustomId(`add_to_cart_${category}`)
            .setLabel('Ajouter au Panier')
            .setStyle(ButtonStyle.Success);

        const buttonRow = new ActionRowBuilder().addComponents(minusButton, plusButton, addToCartButton);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds: [updatedEmbed],
                components: [buttonRow],
            },
        });

    } catch (error) {
        console.error("Erreur lors de l'ajustement de la quantité:", error);
        resString(res, 'Erreur lors de l\'ajustement de la quantité.');
    }
}

// Fonction pour ajouter un item au panier
export async function handleAddToCart(res, req, category, quantity) {
    try {
        const userId = req.body.member.user.id;
        const cart = userCart.get(userId) || [];  // Initialise un tableau vide si pas de panier

        // Ajouter l'item au panier
        cart.push({ category, quantity });
        userCart.set(userId, cart);  // Mettre à jour le panier

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: `Vous avez ajouté ${quantity} ${category}(s) à votre panier.`,
                components: [],
            },
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        resString(res, 'Erreur lors de l\'ajout au panier.');
    }
}


export async function handleViewCart(res, req) {
    try {
        const userId = req.body.member.user.id;
        const cart = userCart.get(userId) || [];

        // Vérification si le panier est vide
        if (cart.length === 0) {
            return res.send({
                type: InteractionResponseType.UPDATE_MESSAGE,
                data: {
                    content: 'Votre panier est vide.',
                    components: [],
                },
            });
        }

        // Affichage des items dans le panier
        const cartEmbed = {
            title: `Votre Panier`,
            color: 0x0146b1,
            description: `Voici les items que vous avez ajoutés à votre panier :`,
            fields: cart.map((item, index) => ({
                name: `${index + 1}. ${item.category}`,
                value: `Quantité : ${item.quantity}`,
            })),
            timestamp: new Date().toISOString(),
        };

        const confirmPurchaseButton = new ButtonBuilder()
            .setCustomId('confirm_all_purchase')
            .setLabel('Confirmer tous les achats')
            .setStyle(ButtonStyle.Success);

        const clearCartButton = new ButtonBuilder()
            .setCustomId('clear_cart')
            .setLabel('Vider le panier')
            .setStyle(ButtonStyle.Danger);

        const buttonRow = new ActionRowBuilder().addComponents(confirmPurchaseButton, clearCartButton);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds: [cartEmbed],
                components: [buttonRow],
            },
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage du panier:", error);
        resString(res, 'Erreur lors de l\'affichage du panier.');
    }
}

// Fonction pour confirmer tous les achats dans le panier
export async function handleConfirmAllPurchases(res, req) {
    try {
        const userId = req.body.member.user.id;
        const cart = userCart.get(userId) || [];

        if (cart.length === 0) {
            return resString(res, 'Votre panier est vide.');
        }

        const totalItems = cart.map(item => `${item.quantity} ${item.category}(s)`).join(', ');

        // Vider le panier après la confirmation
        userCart.set(userId, []);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: `Vous avez acheté : ${totalItems}.`,
                components: [], // Retirer les boutons après la confirmation
            },
        });
    } catch (error) {
        console.error("Erreur lors de la confirmation de l'achat:", error);
        resString(res, 'Erreur lors de la confirmation de l\'achat.');
    }
}

// Fonction pour vider le panier
export async function handleClearCart(res, req) {
    try {
        const userId = req.body.member.user.id;
        userCart.set(userId, []);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: 'Votre panier a été vidé.',
                components: [],
            },
        });
    } catch (error) {
        console.error("Erreur lors du vidage du panier:", error);
        resString(res, 'Erreur lors du vidage du panier.');
    }
}