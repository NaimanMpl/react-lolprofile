import { DDragon, PlatformId, RiotAPI, RiotAPITypes } from '@fightmegg/riot-api';
import dotenv from 'dotenv';
import express, { response } from 'express';
dotenv.config();

const router = express.Router();
const RIOT_API_KEY = process.env.RIOT_API_KEY;

const riotApi = new RiotAPI(RIOT_API_KEY);

router
    .route('/:summonerName')
    .get((req, res) => {
        res.json(req.summoner);
    }
);

router.param('summonerName', async (req, res, next, summonerName) => {
    try {
        const summoner = await riotApi.summoner.getBySummonerName({
            summonerName: summonerName,
            region: PlatformId.EUW1
        });

        const ddragon = new DDragon();
        const ppId = summoner.profileIconId.toString();
        const latestVer = await ddragon.versions.latest();
        const profileIconUrl = `http://ddragon.leagueoflegends.com/cdn/${latestVer}/img/profileicon/${ppId}.png`;
        req.profileIconUrl = profileIconUrl;

        const rankedStats = await riotApi.league.getEntriesBySummonerId({
            region: PlatformId.EUW1,
            summonerId: summoner.id
        });

        let soloRankedStats, flexRankedStats;

        for (let i = 0; i < rankedStats.length; i++) {
            if (rankedStats[i].queueType === "RANKED_FLEX_SR") flexRankedStats = rankedStats[i];
            if (rankedStats[i].queueType === "RANKED_SOLO_5x5") soloRankedStats = rankedStats[i];
        }

        const tierDict = {
            'UNRANKED' : 'Non classé',
            'BRONZE' : 'Bronze',
            'SILVER' : 'Argent',
            'GOLD' : 'Or',
            'PLATINUM' : 'Platine',
            'DIAMOND' : 'Diamant',
            'MASTER' : 'Maître',
            'GRANDMASTER' : 'Grand Maître',
            'CHALLENGER' : 'Challenger'
        }

        if (soloRankedStats) soloRankedStats.tier = tierDict[soloRankedStats.tier];
        if (flexRankedStats) flexRankedStats.tier = tierDict[flexRankedStats.tier];

        req.summoner = {
            name: summoner.name,
            level: summoner.summonerLevel,
            id: summoner.id,
            puuid: summoner.puuid,
            profileIconUrl: profileIconUrl,
            soloRankedStats: soloRankedStats ? soloRankedStats : 'Unranked',
            flexRankedStats: flexRankedStats ? flexRankedStats : 'Unranked'
        };



    } catch (e) {
        console.log(e);
    }
    next();
});

export default router;