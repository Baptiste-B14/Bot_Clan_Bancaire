
import {User} from "../models/userData.js"

export function addMoney(id, money){
    try {
        User.update({
                money: money,
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


