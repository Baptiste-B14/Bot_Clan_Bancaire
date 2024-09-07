import {User} from './models/user.js';
import {Planet} from './models/planet.js';
import { HasPlanet} from "./models/hasPlanet.js";

//userData.sync({force: true}); //reset la bd, perte de données
//planetData.sync({force: true});


try {
    await User.sync({force: true});
    await HasPlanet.sync({force: true});
    await Planet.sync({force: true});

    console.log("Sync done")
//User.sync({alter: true});

}catch (error){
    console.log(error);
}