
import {User} from "../models/1-user.js";
import {simpleUpdate} from "../utils/queries.js";

export function addMoney(id, moneyPlayer, arg){
    try {
        const newMoney = moneyPlayer + Math.abs(arg);
        simpleUpdate(User, {money : newMoney}, {discordId : id} )
        return newMoney
    }catch( error){
        console.log(error);
    }
}

export function removeMoney(id, moneyPlayer, arg){
    try {
        User.update({
                money: moneyPlayer - Math.abs(arg),
            },
            {
                where: {
                    discordId: id,
                },
            },);
    }catch( error){
        console.log(error);
    }
}





