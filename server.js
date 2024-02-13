// BACK END
const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000; // Mahdollistaa julkaisualustan tarjoaman portin käytön
const app = express();
const server = createServer(app);
const io = new Server(server);

// Henkilökunnan tiedot JSON-muodossa
const staffData = [
    { id: 1, name: 'Matti Lehtonen', title: 'CEO', email: 'matti@example.com', phone: '040 123 4567'},
    { id: 2, name: 'Kalle Lindemark', title: 'CTO', email: 'kalle@example.com', phone: '050 891 0111'},
    { id: 3, name: 'Svante Svensson', title: 'Lead Developer', email: 'svante@example.com', phone: '060 131 4151'}
];



// Reitti henkilökunnan tietojen hakuun
app.get('/api/staff', (req, res) => {
    res.json(staffData);
});

// Tässä ei nyt käytetäkään express staticia vaan lähetetään html manuaalisesti
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/chat.html', (req, res) => {
    res.sendFile(join(__dirname, 'chat.html'));
  });

//CSS pyynnön käsittely
app.get('/style.css', (req, res) => {
    res.sendFile(join(__dirname, 'style.css'));
  });


io.on('connection', (socket) => {

  // Kun palvelin vastaanottaa viestin se emitoi sen kaikille clienteille heti
socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
});
});

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});