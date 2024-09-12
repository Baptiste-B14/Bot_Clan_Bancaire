import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../database/db.js'
import { simpleInsert, simpleSelect } from './queries.js'
import { askQuestion, getModel, modelExists } from './usefull.js';
import {writeFileSync} from 'fs';

const types = ['int', 'integer', 'string', 'date', 'bool', 'boolean', 'long', 'text', 'short']
const modelsPath = process.env.MODELS_PATH;

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
                    insert();
                    break;
                case 'd':
                    throwInfo("Déletion sélectionnée");
                    break;
                case 'a':
                    throwInfo("Modification sélectionnée");
                    break;
                case 't':
                    console.log("Test phase")
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
        colName = await askQuestion("Quel est le nom de la colonne ?")
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
                colType = DataTypes.INTEGER
                break;
            case 'string':
                colType = DataTypes.STRING;
                break;
            case 'bool':
            case 'boolean':
                colType = DataTypes.BOOLEAN;
                break;    
            default:
                throwError("Type de colonne inconnu")
                break;
        }
        modelDict[colName].type = colType
        if (!hasPrimareyKey) {
            primareyKey = await yesNo("' " + colName + " ' doit-elle être une clé primaire ? (Y\\N)");
            if (primareyKey) {
                hasPrimareyKey = true;
                
                
                autoIncrement = await yesNo("' " + colName + " ' doit-elle s'autoincrémenter ? (Y\\N)");
                if (autoIncrement) {
                    modelDict[colName].autoIncrement = true
                }
                modelDict[colName].unique = true
                modelDict[colName].primaryKey = true
            }
        }
        
    }

    timestamp = await yesNo(tableName + " doit-elle être suivie des timestamp ? (Y\\N)");
    if (timestamp) {
        timestamp = { timestamps: true,}
    }else{
        timestamp = { timestamps: false,}
    }


    console.clear()
    console.log(tableName)
    console.log(modelDict)
    console.log(timestamp)

    let synchro = await yesNo("Voici le format final de la table. Voulez vous le synchroniser avec la BD?")
    if (synchro) {
        
        //const Model = db.define(tableName, modelDict)
    }

    let writeToFile= await yesNo("Souhaitez-vous l'écrire ?");
    if (writeToFile) {
        const location = modelsPath+tableName+'.js';
        writeFileSync(location, "import { Sequelize } from 'sequelize'\n", {flag: 'a'}, err=>{console.log(err)});
        writeFileSync(location, `import { db } from '${process.env.DB_SCRIPT_PATH}'\n\n`, {flag: 'a'}, err=>{console.log(err)});
        writeFileSync(location, 'export const Model = db.define(\n', {flag: 'a'}, err=>{console.log(err)});
        writeFileSync(location, `\t\'${tableName}\',\n`, {flag: 'a'}, err=>{console.log(err)});
        writeDictToFile(modelDict, location)
        writeDictToFile(timestamp, location)
        writeFileSync(location, ');', {flag: 'a'}, err=>{console.log(err)});

        //writeFileSync(location, ``, {flag: 'a'}, err=>{console.log(err)});
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
    console.log('\x1b[34m%s\x1b[0m', "INFO : " + message);
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

async function yesNo(question) {
    let answer = await askQuestion(question);
    while (answer.toLowerCase() != "y" && answer.toLowerCase() != "n" && answer.toLowerCase() != "yes" && answer.toLowerCase() != "no"){
        throwError("Réponse incorrete, veuillez recommencer. (Y\\N)");
        answer = await askQuestion(question);
    }

    return answer.toLowerCase() == "y" || answer.toLowerCase() == "yes";
}

function writeDictToFile(dict, location) {
    writeFileSync(location, `\t{\n`, {flag: 'a'}, err=>{console.log(err)});
    for (const colName in dict) {
        let line = '\t\t'+ colName + ': {\n'
        for(const colProperty in dict[colName]){
            line = line + `\t\t\t${colProperty}: `
            if(dict[colName][colProperty].toString() != "true"){
            line = line + 'DataTypes.'
            }
            line = line + dict[colName][colProperty].toString() + ',\n'
        }       
        line = line + '\t\t},\n'
        writeFileSync(location, `${line}`, {flag: 'a'}, err=>{console.log(err)});
    }
    writeFileSync(location, `\t},\n`, {flag: 'a'}, err=>{console.log(err)});
}

