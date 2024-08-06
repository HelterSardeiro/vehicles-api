import createApp from './app';

async function startServer() {
    const app = await createApp();
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server listening on port ${port}.`));
}

startServer();
