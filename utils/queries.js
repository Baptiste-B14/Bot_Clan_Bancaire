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
    })
}

export async function alterTable(model, isForced) {
    await model.sync({force: isForced})
}


//update tuple

//create Table