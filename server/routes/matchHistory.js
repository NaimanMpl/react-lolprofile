import { PlatformId, RiotAPI } from '@fightmegg/riot-api';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const router = express.Router();
const RIOT_API_KEY = process.env.RIOT_API_KEY;

const riotApi = new RiotAPI(RIOT_API_KEY);

router
    .get('/:summonerName', (req, res) => {
        res.json(req.matchHistory);
    })

router.param('summonerName', async (req, res, next, summonerName) => {
    try {
        const summoner = await riotApi.summoner.getBySummonerName({
            region: PlatformId.EUW1,
            summonerName: summonerName
        });
        const matchIds = await riotApi.matchV5.getIdsbyPuuid({
            cluster: PlatformId.EUROPE,
            puuid: summoner.puuid,
            params: {
                count: 5
            }
        });
        const matchPromise = []
        matchIds.forEach((id) => {
            const promise = riotApi.matchV5.getMatchById({
                cluster: PlatformId.EUROPE,
                matchId: id
            });
            matchPromise.push(promise);
        });
        const matches = await Promise.all(matchPromise);
        const matchData = []
        matches.forEach((m) => {
            matchData.push(m);
        });

        let wins = 0;
        matchData.forEach(match => {
            const participant = match.info.participants.find(player => player.summonerId === summoner.id);
            if (participant.win) wins++;
        });
        matchData.push(wins/matchData.length);

        req.matchHistory = matchData;
    } catch (e) {
        console.error(e);
    }
    next();
});

export default router;
