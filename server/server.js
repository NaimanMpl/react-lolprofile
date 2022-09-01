import dotenv from 'dotenv';
import express from 'express';
import championStatsRouter from './routes/championStats.js';
import matchHistoryRouter from './routes/matchHistory.js';
import summonerRouter from './routes/summoners.js';

dotenv.config();

const app = express();
const PORT = 3080;

app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message : 'Hello from server !'});
});

app.use('/summoners', summonerRouter);
app.use('/matchHistory', matchHistoryRouter);
app.use('/championsStats', championStatsRouter);

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });