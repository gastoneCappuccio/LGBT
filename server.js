//dichiara una variabile app che rappresenta l'applicazione Express, imposta la porta del server su 3000 e avvia il server.
const express = require('express'); //importa modulo express
const app = express(); //crea una applicazione express e la assegna alla costante app. questo è il nostro webserver
const port = 3000;
const path = require('path'); // importa il modulo path di node
const musicistiLGBT = require('./musicistiLGBT.json');

app.use(express.static(path.join(__dirname, 'public'))); //middleware di Express express.static per servire i file statici come CSS e JavaScript

app.listen(port, () => {        //avvia il server e lo fa ascoltare sulla porta 3000
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/', function(req, res) {                               //definisce la rotta "/" utilizzando get
    res.sendFile(path.join(__dirname, 'index.html'));           //sendFile() è un metodo di risposta di Express che invia un file al client come risposta a una richiesta HTTP.
});

app.get('/musicisti', function(req, res) {
  res.json(musicistiLGBT);
});

app.get('/gayFamosi', async (req, res) => {
    try {
      const response = await fetch('https://tdpomo.vercel.app/api/gayfamosi');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    }
});

//nome musicista
app.get('/musicisti/:nomeMusicista', function(req, res) {
    const nomeMusicista = req.params.nomeMusicista;
    const musicista = musicistiLGBT.find(m => m.nome.toLowerCase() === nomeMusicista.toLowerCase());
    if (musicista) {
      res.json(musicista);
    } else {
      res.status(404).json({ message: "Musicista non trovato" });
    }
});

//nazionalità
app.get('/musicisti/nazionalita/:nazionalita', function(req, res) {
    const nazionalita = req.params.nazionalita;
    const musicisti = musicistiLGBT.filter(m => m.nazionalita.toLowerCase() === nazionalita.toLowerCase());
    if (musicisti.length > 0) {
      res.json(musicisti);
    } else {
      res.status(404).json({ message: "Nessun musicista LGBT trovato con questa nazionalità" });
    }
});

//orientamento sessuale
app.get('/musicisti/orientamento/:orientamentoSessuale', function(req, res) {
    const orientamentoSessuale = req.params.orientamentoSessuale;
    const musicisti = musicistiLGBT.filter(m => m.orientamento_sessuale.toLowerCase() === orientamentoSessuale.toLowerCase());
    if (musicisti.length > 0) {
      res.json(musicisti);
    } else {
      res.status(404).json({ message: "Nessun musicista LGBT trovato con questo orientamento sessuale" });
    }
});

//genere
app.get('/musicisti/genere/:genere', function(req, res) {
    const genere = req.params.genere;
    const musicisti = musicistiLGBT.filter(m => m.genere.toLowerCase().split(', ').includes(genere.toLowerCase()));
    if (musicisti.length > 0) {
      res.json(musicisti);
    } else {
      res.status(404).json({ message: "Nessun musicista LGBT trovato con questo genere" });
    }
});

//strumento
app.get('/musicisti/strumento/:strumento', function(req, res) {
    const strumento = req.params.strumento;
    const musicisti = musicistiLGBT.filter(m => m.strumento.toLowerCase().includes(strumento.toLowerCase()));
    if (musicisti.length > 0) {
      res.json(musicisti);
    } else {
      res.status(404).json({ message: "Nessun musicista LGBT trovato con questo strumento" });
    }
});

//premi
app.get('/musicisti/premi/:premio', function(req, res) {
    const premio = req.params.premio.toLowerCase(); // converti il valore del parametro in minuscolo
    const musicisti = musicistiLGBT.filter(m => m.premi.map(p => p.toLowerCase()).includes(premio)); // converti tutti i premi in minuscolo e cerca la corrispondenza
    if (musicisti.length > 0) {
      res.json(musicisti);
    } else {
      res.status(404).json({ message: "Nessun musicista LGBT trovato con questo premio" });
    }
});