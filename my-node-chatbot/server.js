require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to securely provide the webhook URL to the client
app.get('/api/config', (req, res) => {
    res.json({
        webhookUrl: process.env.N8N_WEBHOOK_URL
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Webhook URL: ${process.env.N8N_WEBHOOK_URL}`);
});