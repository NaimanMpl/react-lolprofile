import '../scss/RankedCard.scss';

const RankedCard = ({ title, tier, rank, leaguePoints, wins, losses }) => {

  if (!tier) {
    return (
      <div className='ranked-card'>
        <div className="title">
          <div>
            <hr></hr>
            <h4><span>{title}</span></h4>
          </div>
          <h4>Unranked</h4>
        </div>
      </div>
    )
  }

  const imgUrl = `../img/rank-icons/${tier.toLowerCase()}.webp`;
  const winRate = Math.ceil((wins / (wins+losses)) * 100);
  return (
    <div className="ranked-card">
      <div className="title">
        <div>
          <hr></hr>
          <h4><span>{title}</span></h4>
        </div>
        <img src="../img/arrow-down.svg" alt="Plus"></img>
      </div>
      <div className="body">
        <div className="left-col">
          <img src={imgUrl} alt={tier + ' ' + rank}></img>
          <div>
            <h3><span>{tier} {rank}</span></h3>
            <h5>{leaguePoints} LP</h5>
          </div>
        </div>
        <div className="right-col">
          <h5>{wins}W {losses}L</h5>
          <h5>{winRate}% Win Rate</h5>
        </div>
      </div>
    </div>
  );
}

export default RankedCard;