const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const helper = require('./app/helper')

app.use('/src', express.static('src'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/admin', (req, res) => {
    res.sendFile(`${__dirname}/admin.html`);
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('validate-code', (code) => {
        validateCode(socket, code);
    });

    socket.on('trigger-lock', triggerLock);
    
    socket.on('trigger-unlock', triggerUnlock);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

const validateCode = async (socket, code) => {
    io.emit('code-entered', code);
    
    const isValid = await helper.db.getValidCode(code);
    let isWinner = (isValid && isValid.TotalSubmitted === 0) ? 1 : 0;

    if (isWinner) {
        triggerUnlock();
    }
    
    await helper.db.insertTracking(code, isWinner);
    io.to(socket.id).emit('validate-response', isWinner ? 'success' : 'error');
}

const triggerLock = async () => {
    console.log('Triggering Lock');
    const triggerLock = await helper.axios.triggerLock();
    console.log(triggerLock);
}

const triggerUnlock = async () => {
    console.log('Triggering Unlock');
    const triggerUnlock = await helper.axios.triggerUnlock();
    console.log(triggerUnlock);
}