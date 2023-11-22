const express = require('express');
const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('voici la reponse du server');
});

server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);

  const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Cluster72255:T1pRYWBgbUJk@cluster72255.su3sktc.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée !', err));

});
