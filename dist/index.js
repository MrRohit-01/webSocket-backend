import express from 'express';
import { WebSocketServer } from 'ws';
const app = express();
const httpServer = app.listen(8080);
let count = 0;
const wss = new WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    wss.on('error', console.error);
    console.log("user count", ++count);
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send('Hello! Message From Server!!');
});
