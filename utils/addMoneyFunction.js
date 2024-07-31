const User = require("../models/userData");


function addMoney(id, money){
    const user = User.update({
        money: money,
    }, {where: {discordId: id}});
}

module.exports = {
    addMoney: addMoney,

};
