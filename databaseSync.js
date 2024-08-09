import {Model} from './models/test.js'



//userData.sync({force: true}); //reset la bd, perte de données
//planetData.sync({force: true});





await Model.sync({force: true});