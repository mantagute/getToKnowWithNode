const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const DEFAULT_EXPIRATION = 3600; 

// Inicializa o cliente do Redis
const redisClient = redis.createClient();
redisClient.on("error", (err) => console.error("Erro no Redis:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função auxiliar de Cache genérica usando Promises (Redis v4+)
async function getOrSetCache(key, callback) {
    const cachedData = await redisClient.get(key);
    
    if (cachedData != null) {
        return JSON.parse(cachedData);
    }
    
    const freshData = await callback();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
}

// Rota: Buscar fotos (com ou sem filtro de albumId)
app.get('/photos', async (req, res) => {
    try {
        const albumId = req.query.albumId;
        const cacheKey = albumId ? `photos?albumId=${albumId}` : 'photos';

        const photos = await getOrSetCache(cacheKey, async () => {
            const url = albumId
                ? `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
                : `https://jsonplaceholder.typicode.com/photos`;
            const { data } = await axios.get(url);
            return data;
        });

        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota: Buscar foto por ID
app.get('/photos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await getOrSetCache(`photos:${id}`, async () => {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
            return data;
        });

        res.json(photo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function startServer() {
    await redisClient.connect();
    console.log("Conectado ao Redis com sucesso!");

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000...");
    });
}

startServer();

