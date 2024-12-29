import { ActionRowBuilder, ActionRow } from "discord.js";
import { resEmbedComponent, resString, resEmbedComponentUpdate } from "./res.js";
import {
    InteractionType,
    InteractionResponseType,
} from 'discord-interactions';
import { ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from "discord.js";
import { selectorBuilder, buttonBuilder, cancelButton } from "./componentBuilder.js";
import { category, category_value } from "./categories.js";


const userCart = new Map(); 
let userSelections = {};
let selectedCategories = [];
let selectedItemsCart = [[]];
let itemsSelected= [];
let page_number = 1;
let embed = [];
let items = [];
let components = [];

export async function modifyMessage(res, req) {
    const { type, data, member } = req.body;
    const { custom_id } = data;
    const userId = member.user.id
    const itemsSelected = data.values;
    

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
      return await handleItemPurchase(res, req);
    }

    if (custom_id === 'cancel_action') {
        return await handleCancel(res, req);
    }

    if (custom_id === 'next_page'){
        return await changePage(res, req, selectedCategories, 1);
    }

    if (custom_id === 'previous_page'){
        return await changePage(res, req, selectedCategories, -1);
    }

    if (custom_id === 'item_select'){
        return await handleItemSelection(res, req);
    }
    if (custom_id === 'view_cart'){
        return await handleViewCart(res, req);
    }
 
    if (custom_id === 'buy_') {
        return await handleItemPurchase(res, req);
    }
    
    if (custom_id === 'select_item_to_modify') {
        return await handleSelectItemToModify(res, req);
    }
    
    if (custom_id === 'plus_quantity' || custom_id === 'minus_quantity') {
        return await handleQuantityAdjustment(res, req);
    }
    
    if (custom_id === 'confirm_quantity') {
        return await handleConfirmQuantity(res, req);
    }
    
    if (custom_id === 'confirm_cart') {
        return await handleConfirmCart(res, req);
    }
    
    if (custom_id === 'cancel_action') {
        return await handleCancel(res, req);
    }
    
}

export async function handleConfirmQuantity(res, req) {
    // Retourne au sélecteur d'items après confirmation de la quantité
    return await handleItemPurchase(res, req);
}

export async function handleCategoryConfirmation(res, req, selectedCategories) {
    try {
        embed = {
            title: `Boutique`,
            color: 0x0146b1,
            description: `Voici les articles disponibles pour les catégories sélectionnées :`,
            fields: selectedCategories.map((category) => ({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                value: `Sélectionnez les items dans la catégorie ${category}.`,
            })),
            timestamp: new Date().toISOString(),
        };

        
        const itemsOptions = await category_value(selectedCategories);
        items = itemsOptions.map((item) => ({
            label: item.name,
            value: item.name,
        }));
        


        
        const nextButton = new buttonBuilder('next_page', `page ${page_number+1}`, ButtonStyle.Secondary);
        const item_Menu = new selectorBuilder('item_select', 'Selectionner un ou plusieurs items', items.slice(25*page_number - 25, 25*page_number), 10);
        const buyButton = new buttonBuilder('buy_', 'Acheter', ButtonStyle.Primary);
        const viewCartButton = new buttonBuilder('view_cart', 'Voir Panier', ButtonStyle.Secondary);
    

        const buttonsRow = new ActionRowBuilder().addComponents(buyButton, nextButton, viewCartButton);
        const selectRow = new ActionRowBuilder().addComponents(item_Menu);
        components =  [selectRow, buttonsRow];

        resEmbedComponentUpdate(res, embed, components);
        
    } catch (error) {
        console.error("Erreur dans la confirmation de catégorie:", error.message);
        resString(res, `Erreur lors de la confirmation : ${error.message}`);
    }
}




export async function handleCategorySelection(res, req, selectedCategories) {
    try {
        const categoryList = selectedCategories.join(', ');    
        
        const categories = category;

        
        const formattedOptions = categories.map((option) => ({
            label: option.label,
            value: option.value,
            default: selectedCategories.includes(option.value)  // Si l'option a été sélectionnée, on la marque par défaut
        }));
    
        const categoryMenu = new selectorBuilder('category_select', 'Sélectionnez une ou plusieurs catégories', formattedOptions, category.length);

        const confirmButton = new buttonBuilder('confirm_category', 'Confirmer' , ButtonStyle.Primary);
        
        const selectRow = new ActionRowBuilder().addComponents(categoryMenu);
        const buttonRow = new ActionRowBuilder().addComponents(confirmButton, cancelButton);
        components = [selectRow, buttonRow]
        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: `Catégories sélectionnées : ${categoryList}. Veuillez confirmer.`,
                components: components,
            },
        });
    } catch (error) {
        console.error("Erreur lors de la sélection de catégorie:", error);
        resString(res, 'Erreur lors de la sélection de catégorie.');
    }
}


export async function changePage(res, req, selectedCategories, value) {
    page_number += value;
    
    const buyButton = new buttonBuilder('buy_', 'Acheter', ButtonStyle.Primary);
    const buttonsRow = new ActionRowBuilder().addComponents(buyButton);

    if (page_number > 1) {
        const previousPageButton = new buttonBuilder('previous_page', `page ${page_number - 1}`, ButtonStyle.Secondary);
        buttonsRow.addComponents(previousPageButton);
    }

    if (page_number < items.length / 25) {
        const nextPageButton = new buttonBuilder('next_page', `page ${page_number + 1}`, ButtonStyle.Secondary);
        buttonsRow.addComponents(nextPageButton);
    }

    const formattedOptions = items.map((option) => ({
        label: option.label,
        value: option.value,
        default: itemsSelected.includes(option.value)
    }));

    const item_Menu = new selectorBuilder('item_select', 'Sélectionner un ou plusieurs items', formattedOptions.slice(25 * page_number - 25, 25 * page_number), 10);
    const selectRow = new ActionRowBuilder().addComponents(item_Menu);

    components = [selectRow, buttonsRow];
    resEmbedComponentUpdate(res, embed, components);
}


export async function handleItemSelection(res, req){
    const { data }= req.body;
    const newlySelectedItems = data.values;
    
    itemsSelected = [...new Set([...itemsSelected, ...newlySelectedItems])];
    
    const formattedOptions = items.map((option) => ({
        label: option.label,
        value: option.value,
        default: itemsSelected.includes(option.value)  // Si l'option a été sélectionnée, on la marque par défaut
    }));

    const item_Menu = new selectorBuilder('item_select', 'Selectionner un ou plusieurs items', formattedOptions.slice(25*page_number - 25, 25*page_number), 10);
    selectedItemsCart = itemsSelected.map(item => [item, 1]);
    const viewCartButton = new buttonBuilder('view_cart', 'Voir Panier', ButtonStyle.Secondary);
    console.log(components[1]);
    components[1] = new ActionRowBuilder().addComponents(components[1].components, viewCartButton);
    //components[1].components.addComponents(viewCartButton);
    console.log(components[1]);
    components[0] = new ActionRowBuilder().addComponents(item_Menu),
    
    embed.description = `Items sélectionnées : ${itemsSelected}. Veuillez confirmer.`;
    resEmbedComponentUpdate(res, embed, components);

}



export async function handleItemPurchase(res, req) {
    try {
        // Vérifie si des items ont été sélectionnés
        if (itemsSelected.length === 0) {
            embed = {
                title: `Boutique`,
                color: 0x0146b1,
                description: `Voici les articles disponibles pour les catégories sélectionnées :`,
                fields: 'Aucun item selectionné',
                timestamp: new Date().toISOString(),
            };
            resEmbedComponentUpdate(res, embed, components);
        }

        // Crée le sélecteur pour les items déjà sélectionnés
        const formattedOptions = itemsSelected.map((item, index) => ({
            label: item,
            value: String(index),  // Utilise l'index comme valeur pour faciliter la récupération
        }));

        // Sélecteur d'item
        const item_Menu = new selectorBuilder('select_item_to_modify', 'Sélectionner un item à modifier', formattedOptions, 1);  // Max 1 sélection
        const confirmCartButton = new buttonBuilder('confirm_cart', 'Confirmer l\'achat du panier', ButtonStyle.Success);
        
        // Action rows
        const selectRow = new ActionRowBuilder().addComponents(item_Menu);
        const buttonRow = new ActionRowBuilder().addComponents(confirmCartButton, cancelButton);
        
        components = [selectRow, buttonRow];

        // Mise à jour du message avec le sélecteur d'items
        embed = {
            title: 'Acheter des items',
            description: `Sélectionnez un item pour modifier la quantité ou confirmer l'achat du panier.`,
            timestamp: new Date().toISOString(),
        };

        resEmbedComponentUpdate(res, embed, components);

    } catch (error) {
        console.error("Erreur lors de l'achat de l'item:", error);
        resString(res, 'Erreur lors de l\'achat.');
    }
}

export async function handleSelectItemToModify(res, req) {
    const { data } = req.body;
    const selectedItemIndex = parseInt(data.values[0], 10);  // Récupère l'index de l'item sélectionné

    // Récupère l'item sélectionné et sa quantité
    const selectedItem = itemsSelected[selectedItemIndex];
    let selectedItemQuantity = selectedItemsCart[selectedItemIndex][1];  // Quantité actuelle

    embed = {
        title: `Modification de l'item : ${selectedItem}`,
        description: `Quantité actuelle : ${selectedItemQuantity}`,
        timestamp: new Date().toISOString(),
    };

    // Boutons pour ajuster la quantité
    const minusButton = new buttonBuilder('minus_quantity', '-', ButtonStyle.Secondary);
    const plusButton = new buttonBuilder('plus_quantity', '+', ButtonStyle.Secondary);
    const confirmQuantityButton = new buttonBuilder('confirm_quantity', 'Confirmer', ButtonStyle.Success);
    
    const buttonRow = new ActionRowBuilder().addComponents(minusButton, plusButton, confirmQuantityButton);

    components = [buttonRow];

    resEmbedComponentUpdate(res, embed, components);
}


export async function handleQuantityAdjustment(res, req) {
    const { custom_id } = req.body.data;

    // Trouve l'item en cours de modification et sa quantité actuelle
    const selectedItemIndex = itemsSelected.findIndex(item => item === embed.title.split(': ')[1]);
    let quantity = selectedItemsCart[selectedItemIndex][1];

    // Ajuste la quantité en fonction du bouton cliqué
    if (custom_id === 'plus_quantity') {
        quantity += 1;
    } else if (custom_id === 'minus_quantity' && quantity > 1) {
        quantity -= 1;
    }

    // Met à jour la quantité de l'item sélectionné dans le panier
    selectedItemsCart[selectedItemIndex][1] = quantity;

    // Met à jour l'embed avec la nouvelle quantité
    embed.description = `Quantité actuelle : ${quantity}`;

    resEmbedComponentUpdate(res, embed, components);
}


export async function handleConfirmCart(res, req) {
    const userId = req.body.member.user.id;
    const cart = selectedItemsCart;

    if (cart.length === 0) {
        return res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: 'Votre panier est vide.',
                components: [],
            },
        });
    }

    const totalItems = cart.map(item => `${item[1]} x ${item[0]}`).join(', ');

    // Réinitialise le panier après confirmation
    selectedItemsCart = [[]];
    itemsSelected = [];

    res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
            content: `Vous avez acheté : ${totalItems}.`,
            components: [],  // Supprime les boutons après la confirmation
        },
    });
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