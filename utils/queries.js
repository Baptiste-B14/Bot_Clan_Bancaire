export async function simpleSelect(model, champs, debug) {
    const models = await model.findAll({attributes: champs})
    const modelsJSON = JSON.parse(JSON.stringify(models))
    if(debug == true){
        console.log(modelsJSON)
    }
    return modelsJSON
}

export async function simpleInsert(model, insertDict){
    await model.create(insertDict)
}

export async function simpleDelete(model, wheres){
    await model.destroy({
        where: wheres
    })Z
}

export async function alterTable(model, isForced) {
    await model.sync({force: isForced})
}

export async function selectWithWhere(model, champs, conditions, debug) {
    const models = await model.findAll({
        attributes: champs,
        where: conditions
    });
    const modelsJSON = JSON.parse(JSON.stringify(models));
    if(debug == true){
        console.log(modelsJSON)
    }
    return modelsJSON;
}


export async function simpleUpdate(model, champs, conditions) {
    const [affectedRows] = await model.update(
       champs,
       {
           where: conditions
       });

    return affectedRows;
}


//update tuple

//create Table
