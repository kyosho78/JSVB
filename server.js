const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static('public')); // Staattisten tiedostojen hakemisto
app.use(`/images`, express.static('images')); // Kuvien hakemisto

// Henkilökunnan tiedot JSON-muodossa
const staffData = [
  { id: 1, name: 'Matti Lehtonen', title: 'CEO', email: 'matti@example.com', phone: '040 123 4567'},
  { id: 2, name: 'Kalle Lindemark', title: 'CTO', email: 'kalle@example.com', phone: '050 891 0111'},
  { id: 3, name: 'Svante Svensson', title: 'Lead Developer', email: 'svante@example.com', phone: '060 131 4151'}
];



// Hakee henkilökunnan dataa
app.get('/api/staff', (req, res) => {
  res.json(staffData);
});

// Chat
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Lähettää viestin kaikille
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
