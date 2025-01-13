const express = require('express');
const http = require('http');
const { createClient } = require('redis');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const publisher = createClient();
const subscriber = createClient();
const redisClient = createClient(); // Mesaj ve online kullanıcıları yönetmek için

(async () => {
    await publisher.connect();
    await subscriber.connect();
    await redisClient.connect();

    const CHANNEL = 'chatroom';
    const MESSAGES_KEY = 'chat_messages';
    const ONLINE_USERS_KEY = 'online_users';

    // Online kullanıcı sayısını sıfırla
    await redisClient.set(ONLINE_USERS_KEY, 0);

    // WebSocket bağlantısını dinle
    wss.on('connection', async (ws) => {
        console.log('Bir kullanıcı bağlandı.');

        // Kullanıcı bağlandığında online kullanıcı sayısını artır
        redisClient.incr(ONLINE_USERS_KEY).then(async () => {
            const onlineUsers = await redisClient.get(ONLINE_USERS_KEY);
            broadcastOnlineUsers(onlineUsers);
        });

        // Yeni kullanıcı bağlandığında geçmiş mesajları gönder
        const previousMessages = await redisClient.lRange(MESSAGES_KEY, 0, -1);
        previousMessages.forEach((message) => {
            ws.send(JSON.stringify({ type: 'message', data: message }));
        });

        // Kullanıcıdan gelen mesajları yayınla ve Redis'e kaydet
        ws.on('message', async (message) => {
            // Mesajı Redis listesine kaydet
            await redisClient.rPush(MESSAGES_KEY, message);

            // Mesajı Redis PUB/SUB ile yayınla
            await publisher.publish(CHANNEL, message);
        });

        // Kullanıcı bağlantısını keserse online kullanıcı sayısını azalt
        ws.on('close', async () => {
            console.log('Bir kullanıcı bağlantıyı kesti.');

            redisClient.decr(ONLINE_USERS_KEY).then(async () => {
                const onlineUsers = await redisClient.get(ONLINE_USERS_KEY);
                broadcastOnlineUsers(onlineUsers);
            });
        });
    });

    // Redis'ten gelen mesajları tüm WebSocket istemcilerine gönder
    await subscriber.subscribe(CHANNEL, (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'message', data: message }));
            }
        });
    });

    // Online kullanıcı sayısını istemcilere ilet
    function broadcastOnlineUsers(onlineUsers) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'online_users', data: onlineUsers }));
            }
        });
    }
})();

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});