import '../scss/ChampionCard.scss';

const ChampionCard = ({ title, games, kda, kills, deaths, assists, wins, squareIconUrl }) => {
  const averageKda = parseFloat(((kda / games)).toString()).toFixed(2);
  const averageKills = parseFloat(((kills / games)).toString()).toFixed(2);
  const averageDeaths = parseFloat(((deaths / games)).toString()).toFixed(2);
  const averageAssists = parseFloat(((assists / games)).toString()).toFixed(2);
  const winRate = Math.ceil((wins / games) * 100);
  return (
    <div className="ChampionCard">
      <img src={squareIconUrl} alt={title}></img>
      <div className="championcard-right">
        <h5 className="champion-name">{title}</h5>
        <div className="Stats">
          {averageKda > 3 ? <h5 className="blue-wr">{averageKda}</h5> : <h5>{averageKda}</h5>}
          <h5 className="AverageKda">
            {averageKills} <span>/</span> {averageDeaths} <span>/</span> {averageAssists}
          </h5>
        </div>
        <div className="WinRate">
          {winRate >= 60 ? <h5 className="blue-wr">{winRate}%</h5> : <h5>{winRate}%</h5>}
          <h5>{games > 1 ? games + ' games' : games + ' game'}</h5>
        </div>
      </div>
    </div>
  );
}

export default ChampionCard;