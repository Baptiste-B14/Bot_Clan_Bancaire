const userData = require('./models/userData');
const planetData = require('./models/planet');



//userData.sync({force: true}); //reset la bd, perte de données
//planetData.sync({force: true});





userData.sync({alter: true});
planetData.sync({alter: true});