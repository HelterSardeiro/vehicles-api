import express from 'express';
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';
import setupRoutes from './routers/vehicleRoutes';

async function createApp() {
    config();  // Carrega as variáveis de ambiente
    const app = express();
    app.use(express.json());

    // Conexão com o banco de dados
    try {
        await MongoClient.connect();
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        // Opção de encerrar o processo se não conectar ao banco de dados
        process.exit(1);
    }

    // Configuração das rotas
    setupRoutes(app);

    return app;
}

export default createApp;
