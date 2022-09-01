import { useNavigate } from 'react-router-dom';
import '../scss/SearchBar.scss';

const SearchBar = ({ text, width, borderRadius, padding, fontSize, imgSize }) => {

  const navigate = useNavigate();

  return (
    <div className="searchbar">
      <input 
        type="text"
        placeholder={text}
        onKeyDown= {
          (e) => {
            if (e.key === 'Enter' || e.key === 13) navigate(`/summoners/${e.target.value}`);
          }
        }
        style= {
          {
            width: `${width}px`,
            borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
            padding: padding,
            fontSize: `${fontSize}rem`
          }
        }
      />
      <img 
        style={
          { 
            width: `${imgSize}px`,
            borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
            padding: padding
          }
        }
        src="../img/search.svg" 
        alt="Go!"
        onClick={ () => { console.log('Oui') } }
      >
      </img>
    </div>
  );  
}

SearchBar.defaultProps = {
  text: "Search Yourself or a Champion",
  borderRadius: "50",
  width: "600",
  padding: "20px 40px",
  fontSize: "1.2",
  imgSize: "22"

}

export default SearchBar;