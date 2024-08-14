import { Sequelize } from 'sequelize';
import {db} from '../database/db.js'
import { simpleInsert, simpleSelect } from './queries.js'
import { askQuestion, getModel, modelExists } from './usefull.js';

const types = ['int', 'integer', 'string', 'date', 'bool', 'boolean', 'long', 'text', 'short']

console.clear()
    throwInfo("Bienvenue dans le Database Manager 1.0");
    const args = process.argv.slice(2);

    if (args.length < 1) {
        throwError("Aucun arguments passés en paramètres.");
        process.exit(1);
    }
    try {
        if (args[0].startsWith('-')) {
            if (!args[0].split('-')[1]) {
                throwError("Argument incomplet");
            } else {
                switch (args[0].split('-')[1]) {
                    case 'c':
                        throwInfo("Création sélectionnée");
                        create();
                        break;
                    case 's':
                        throwInfo("Sélection sélectionnée");
                        break;
                    case 'i':
                        throwInfo("Insertion sélectionnée");
                        insert()
                        break;
                    case 'd':
                        throwInfo("Déletion sélectionnée");
                        break;
                    case 'a':
                        throwInfo("Modification sélectionnée");
                        break;
                    default:
                        throwError("Argument inconnu");
                        break;
                }    
            }
        }
    } catch (error) {
        throwError(error);
    }

/*=================================
        MANAGING DATABASE
 =================================*/

async function insert(){
    let table;

        if (args[1]) {
            table = args[1]
        }else{
            table = await askQuestion("De quel modèle voulez rajouter un tuple ?");
        }
        if (await modelExists(table)) {
            const model = await getModel(table)
            let nbInsert = await askQuestion("De combien d'insert avez vous besoin ?");
            nbInsert = parseInt(nbInsert);
            if (!isNaN(nbInsert)) {
                for(let i = 0; i < nbInsert; i++){
                    
                    
                    const cols = model.rawAttributes;
                    let insertDict = {}
                    for(const colonne in cols){
                        if (!cols[colonne].autoIncrement) {
                            console.clear()
                            throwInfo("Renseignement du tuple n°"+(i+1));
                            throwInfo("Voici les champs à renseigner : ");
                            console.log(Object.keys(model.rawAttributes));
                            const value = await askQuestion("Veuillez renseigner le champ : " + colonne)
                            insertDict[colonne] = value
                        }                    
                    }
                    await simpleInsert(model, insertDict)
                    
                }
            }else{
                throwError(nbInsert + " n'est pas un nompbre valide")
            }
            
        }else{
            throwError(table + " ne fait pas partie des table connues.");
        }
}

async function create(){
    const tableName = await askQuestion("Quelle est le nom de la table que vous voulez créer ?");
    let nbColonne = await askQuestion("De combien de colonne avez vous besoin ?");
    nbColonne = parseInt(nbColonne);
    while(isNaN(nbColonne)) {
        throwError(nbColonne + " n'est pas un nombre valide.");
        nbColonne = await askQuestion("De combien de colonne avez vous besoin ?");
    }
    let modelDict = {};
    let colName;
    let colType;
    let colTypeName;
    let primareyKey;
    let autoIncrement;
    let timestamp;
    let hasPrimareyKey = false;

    for(let i = 0; i < nbColonne; i++){
        console.clear()
        console.log(modelDict)
        throwInfo("Création d'une colonne ("+(i+1)+"/"+nbColonne+")")
        let colName = await askQuestion("Quel est le nom de la colonne ?")
        modelDict[colName] = {}
        colTypeName = await askQuestion("Quel type souhaitez-vous pour la colonne " + colName + " ?")
        while (!checkType(colTypeName)) {
            console.clear()
            throwError(colTypeName + " n'est pas un type reconnu")
            colTypeName = await askQuestion("Quel type souhaitez-vous pour la colonne " + colName + " ?")
        }

        switch (colTypeName) {
            case 'int':
            case 'integer':
                colType = Sequelize.INTEGER
                break;
            case 'string':
                colType = Sequelize.toString;
                break;
            default:
                throwError("Type de colonne inconnu")
                break;
        }
        modelDict[colName].type = colType
        if (!hasPrimareyKey) {
            primareyKey = await askQuestion("' " + colName + " ' doit-elle être une clé primaire ? (Y\\N)")
            while (primareyKey !== 'Y' && primareyKey !== 'N') {
            console.log(primareyKey)
            throwError("Saisie incorrect, veuillez recommencer. (Y\\N)")
            primareyKey = await askQuestion("' " + colName + " ' doit-elle être une clé primaire ? (Y\\N)")
        }
        if (primareyKey === 'Y') {
            hasPrimareyKey = true;
            modelDict[colName].primareyKey = true
            modelDict[colName].unique = true
            autoIncrement = await askQuestion("' " + colName + " ' doit-elle s'autoincrémenter ? (Y\\N)")
            while (autoIncrement !== 'Y' && autoIncrement !== 'N') {
                throwError("Saisie incorrect, veuillez recommencer. (Y\\N)")
                autoIncrement = await askQuestion("' " + colName + " ' doit-elle s'autoincrémenter ? (Y\\N)")
            }
            if (autoIncrement === 'Y') {
                modelDict[colName].autoIncrement = true
            }
        }
        }
        
    }

    timestamp = await askQuestion(tableName + " doit-elle être suivie des timestamp ? (Y\\N)")
    while (timestamp !== 'Y' && timestamp !== 'N') {
        throwError("Saisie incorrect, veuillez recommencer. (Y\\N)")
        timestamp = await askQuestion(tableName + " doit-elle être suivie des timestamp ? (Y\\N)")
    }
    if (timestamp === 'N') {
        timestamp = { timestamps: false,}
    }else{
        timestamp = { timestamps: true,}
    }


    const synchro = await askQuestion("Voici le format final de la table. Voulez vous le synchroniser ?")
    while (synchro !== 'Y' && synchro !== 'N') {
        throwError("Saisie incorrect, veuillez recommencer. (Y\\N)")
        synchro = await askQuestion(tableName + " doit-elle être suivie des timestamp ? (Y\\N)")
    }
    if (synchro === 'Y') {
        console.log("Voici le modèle finale : ")
        const Model = db.define(tableName, modelDict, timestamp)
        console.log(tableName)
        console.log(modelDict)
        console.log(timestamp)
    }
    
}



/*=================================
        MESSAGE THROWING
 =================================*/
function throwError(message) {
    console.error('\x1b[31m%s\x1b[0m', "ERROR : " + message);
    console.error('\x1b[33m%s\x1b[0m', "WARN :  Pour consulter la documentation, utilisez \"node db_manager.js -h\"");
}

function throwInfo(message) {
    console.error('\x1b[34m%s\x1b[0m', "INFO : " + message);
}

function throwSuccess(message){
    console.log('✅ \x1b[32m%s\x1b[0m', " : " + message);
}

function checkType(type) {
    if(types.includes(type)){
        return true
    }

    return false;
}