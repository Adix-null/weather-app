import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend requests

// Endpoint to log user actions
app.post('/log-action', (req, res) => {
    const { city, timestamp } = req.body;
    console.log(`[${timestamp}] City selected: ${city.city}`);
    res.status(200).send({ message: 'Action logged successfully.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
