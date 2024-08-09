import {db} from '../database/db.js'
import { simpleInsert, simpleSelect } from './queries.js'
import { askQuestion, getModel, modelExists } from './usefull.js';

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
                        create(args[1]);
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
    let insert = true;

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
                            console.log(insertDict)
                        }                    
                    }
                    await simpleInsert(model, insertDict)
                    
                }
            }
            
        }else{
            throwError(table + " ne fait pas partie des table connues.");
        }
}

function create(context){
    if (!context) {
        throwError("Pas de contexte passé en argument.");
        process.exit(1);
    }else{
        switch (context) {
            case 'table', 't':
                throwInfo("Menu de création de table");
                break;
            default:
                throwError("Contexte inconnu");
                break;
        }
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