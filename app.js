import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { modifyMessage } from './utils/modifyMessage.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  const { type, data, member } = req.body;
  const userId = member.user.id; // Utiliser l'ID de l'utilisateur pour stocker les sélections individuelles


  // Commande slash /store
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    try {
      const {doSomething} = await import('./commands/' + name + '.js');
          return await doSomething(res, req);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande ${name}:`, error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la commande' });
    }
  }


  if (type === InteractionType.MESSAGE_COMPONENT) {
   
    
    try{
      return await modifyMessage(res, req);
    }catch (error) {
      console.error(`Erreur lors de l'exécution l'interaction:`, error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la commande' });
    }


  }

  // Si l'interaction n'est pas gérée
  return res.status(400).json({ error: 'Interaction inconnue' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
