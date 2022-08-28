import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import ChampionCard from "../components/ChampionCard";
import Header from "../components/Header";
import RankedCard from "../components/RankedCard";
import Title from "../components/Title";
import '../scss/SummonerDetails.scss';

const SummonerDetails = () => {
  const { summonerName } = useParams();
  const [ summoner, setSummonerData ] = useState([]);
  const [ matchHistoryData, setMatchHistoryData ] = useState([]);
  const [ championStatsData, setChampionStatsData ] = useState([]);

  useEffect(() => {
    const fetchSummonerData = async () => {
      const res = await fetch(
        `/summoners/${summonerName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        }
      );
      const summonerData = await res.json();
      setSummonerData([summonerData]);
    }
    fetchSummonerData();
  }, []);

  useEffect(() => {
    const fetchChampionStatsData = async () => {
      const res = await fetch(
        `/championsStats/${summonerName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          matchType: 'ranked'
        }
      );
      const championStats = await res.json();
      setChampionStatsData(championStats);
    }
    fetchChampionStatsData();
  }, []);

  return (
    <div>
      <Header text="Search Your Summoner" />
      {summoner.map((summoner, index) => {
        return (
          <div className="SummonerDetails" key={index}>
            <div className="summoner-profile">
              <img src={summoner.profileIconUrl} alt="Profile Icon"></img>
              <div>
                <h1>
                  <span>{summoner.name}</span>
                </h1>
                <h6>Leader Rank <span>2,456,994</span> (top 66.9%)</h6>
                <Button 
                  text="Update"
                  width="30"
                  height="10"
                />
              </div>
            </div>
            <div className="nav">
              <Title color="#4372F1" text="Overview" />
              <Title text="Champion Stats" />
              <Title text="Live Game" />
            </div>
            <div className="summoner-details-container">
              <div className="summoner-details-left">
                <RankedCard
                  title="Ranked Solo"
                  tier={summoner.soloRankedStats.tier}
                  rank={summoner.soloRankedStats.rank}
                  leaguePoints={summoner.soloRankedStats.leaguePoints}
                  wins={summoner.soloRankedStats.wins}
                  losses={summoner.soloRankedStats.losses}
                />
                <RankedCard
                  title="Ranked Flex"
                  tier={summoner.flexRankedStats.tier}
                  rank={summoner.flexRankedStats.rank}
                  leaguePoints={summoner.flexRankedStats.leaguePoints}
                  wins={summoner.flexRankedStats.wins}
                  losses={summoner.flexRankedStats.losses}
                />
                <div className="ChampionStats">
                  <div className="champions-stats-title">
                    <hr></hr>
                    <h4>Champion Stats</h4>
                    <select name="match-types">
                      <option value="ranked">All Ranked</option>
                      <option value="normal">Normal</option>
                      <option value="tourney">Tournoi</option>
                    </select>
                  </div>
                  {championStatsData.map((champion, index) => {
                    return (
                      <ChampionCard 
                        title={champion.name}
                        games={champion.games}
                        kda={champion.kda}
                        kills={champion.kills}
                        deaths={champion.deaths}
                        assists={champion.assists}
                        wins={champion.wins}
                        squareIconUrl={champion.squareIconUrl}
                      />
                    )
                  })}
                </div>
              </div>
              <div className="summoner-details-right">
                <h1>Match History</h1>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default SummonerDetails;