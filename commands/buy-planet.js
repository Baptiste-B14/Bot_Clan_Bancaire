import {
    InteractionResponseType
} from "discord-interactions";
import {User} from "../models/user.js";
import {Planet} from "../models/planet.js"
import {HasPlanet} from "../models/hasPlanet.js";
import {removeMoney} from "../utils/moneyFunction.js";
import {resString} from "../utils/res.js";
import {simpleSelect, selectWithWhere} from "../utils/queries.js";


export const COMMAND_DEF = {
    name: 'buy-planet',
    description: 'Buy a planet',
    type: 1,
    options: [{
        name: 'planet',
        description: 'The planet you want to buy',
        required: true,
        type: 7,
    }]
}

export async function doSomething(res, req) {

    try {
        const channel = req.body.data.options.find(options => options.name === 'planet').value;
        const user = req.body.member.user.id;
        const planetToBuy = selectWithWhere(Planet, ['cost'], { salon: channel });
        //const planetToBuy = await Planet.findOne({where: {salon: channel }, attributes: ['cost']});

        if (planetToBuy != null){
            if(await HasPlanet.findOne({where: {idPlanet: channel}}) == null){
                const money = await User.findOne({where: {discordId: user}, attributes: ['money']});
                const planetCost = planetToBuy.cost;
                if(planetCost > money.money){
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: 'You do not have enough money',
                        },
                    })
                }else {
                    await HasPlanet.create({
                            idPlanet: channel,
                            discordId: user,
                        }
                    )
                    await removeMoney(user, money.money - planetCost)
                }
                }else resString(res, 'This planet already belongs to someone');

        }else resString(res, 'This planet does not exist');

    }
    catch(error) {
        console.log(error);
        resString(res, 'Something went wrong with buying the planet.');
    }
}


