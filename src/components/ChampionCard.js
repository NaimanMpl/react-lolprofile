import '../scss/ChampionCard.scss';

const ChampionCard = ({ title, games, kda, kills, deaths, assists, wins, squareIconUrl }) => {
  const averageKda = parseFloat(((kda / games)).toString()).toFixed(2);
  const winRate = Math.ceil((wins / games) * 100);
  return (
    <div className="ChampionCard">
      <img src={squareIconUrl} alt={title}></img>
      <div class="championcard-right">
        <h5 className="championName">{title}</h5>
        <div className="Stats">
          <h5>{averageKda}</h5>
          <h5 class="AverageKda">
            {kills} <span>/</span> {deaths} <span>/</span> {assists}
          </h5>
        </div>
        <div class="WinRate">
          <h5>{winRate}%</h5>
          <h5>{games > 1 ? games + ' games' : games + ' game'}</h5>
        </div>
      </div>
    </div>
  );
}

export default ChampionCard;