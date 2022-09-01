import { DDragon, PlatformId, RiotAPI, RiotAPITypes } from '@fightmegg/riot-api';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const riotApi = new RiotAPI(RIOT_API_KEY);

const router = express.Router();

router
    .get('/:summonerName', (req, res) => {
        res.json(req.championsStats);
    });

router.param('summonerName', async (req, res, next, summonerName) => {
    try {
        const ddragon = new DDragon();
        const latestVer = await ddragon.versions.latest();
        const sum = await riotApi.summoner.getBySummonerName({
            region: PlatformId.EUW1,
            summonerName: summonerName
        });

        const matchTypeDict = {
            'ranked' : RiotAPITypes.MatchV5.Ranked,
            'normal' : RiotAPITypes.MatchV5.Normal,
            'tourney' : RiotAPITypes.MatchV5.Tourney,
            'tutorial' : RiotAPITypes.MatchV5.Tutorial
        }

        const championStats = []
        const matchType = matchTypeDict[req.matchType] || RiotAPITypes.MatchV5.Ranked;
        const matchIds = await riotApi.matchV5.getIdsbyPuuid({
            cluster: PlatformId.EUROPE,
            puuid: sum.puuid,
            params: {
                type: matchType,
                count: 10
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

        const isAlreadyInList = (name) => {
            for (let i = 0; i < championStats.length; i++) {
                let champ = championStats[i];
                if (champ.name === name) {
                    return true;
                }
            }
            return false;
        }

        matchData.forEach((match) => {
            const players = match.info.participants;
            const summoner = players.find((player) => player.puuid === sum.puuid);
            const championName = summoner.championName;
            const win = summoner.win;
            const squareIconUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVer}/img/champion/${championName}.png`;
            if (!isAlreadyInList(championName)) {
                championStats.push({
                    name: championName,
                    games: 1,
                    wins: win ? 1 : 0,
                    kda: summoner.challenges.kda,
                    deaths: summoner.deaths,
                    kills: summoner.kills,
                    assists: summoner.assists,
                    squareIconUrl: squareIconUrl
                });
            } else {
                const champion = championStats.find((c) => c.name === championName);
                champion.games++;
                champion.kda += summoner.challenges.kda;
                champion.deaths += summoner.deaths;
                champion.kills += summoner.kills;
                champion.assists += summoner.assists;
                if (win) champion.wins++;
            }
        });

        req.championsStats = championStats;
    } catch (e) {
        console.error(e);
    }
    next();
});

export default router;