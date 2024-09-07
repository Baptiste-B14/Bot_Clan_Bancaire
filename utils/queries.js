export async function simpleSelect(model, champs) {
    const models = await model.findAll({attributes: champs})
    const modelsJSON = JSON.parse(JSON.stringify(models))
    console.log(modelsJSON)
    return modelsJSON
}

export async function simpleInsert(model, insertDict){
    await model.create(insertDict)
}

export async function simpleDelete(model, wheres){
    await model.destroy({
        where: wheres
    })
}

export async function alterTable(model, sync, force) {
    return true
}

export async function selectWithWhere(model, champs, conditions) {
    const models = await model.findAll({
        attributes: champs,
        where: conditions
    });
    const modelsJSON = JSON.parse(JSON.stringify(models));
    console.log(modelsJSON);
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