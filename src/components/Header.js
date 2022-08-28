import PropTypes from 'prop-types';
import '../scss/Header.scss';
import Button from './Button';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header>
      <div className='left-col'>
        <img src='../img/burger-menu.svg' className='burger-menu' alt='Menu'></img>
        <h2>LoLProfile</h2>
      </div>
      <div className='right-col'>
        <nav>
          <ul>
            <li className="download-app-cta"> 
              <Button 
                text="Download App"
                color="#ff4e50"
                width="15" 
                imgWidth="15"
                height="7"
                img="../img/windows-logo.svg"
              />
            </li>
            <li>
              <SearchBar
                text="Search Your Summoner"
                width="300"
                borderRadius="10"
                padding="10px 20px"
                fontSize="0.9"
                imgSize="16.5"
              />
            </li>
            <li>
              <Button 
                text="Support Us"
                width="15"
                imgWidth="15"
                height="7"
                img="../img/heart.svg"
              />
            </li>
            <li>
              <Button 
                text="Create Acoount"
                width="15"
                height="7"
              />
            </li>
            <li>
              <Button 
                text="Login"
                color="#07071F"
                width="15"
                height="7"
                border="0.1px solid #313348"
              />
            </li>
            <div className="img-cta">
              <li><img style={{ width: '15px' }} src="../img/camera.svg" alt="Lg Splash"></img></li>
              <li><img style={{ width: '15px' }} src="../img/notification-bell.svg" alt="Notification"></img></li>
              <li><img style={{ width: '15px' }} src="../img/headphone.svg" alt="Contact Us"></img></li>
              <li><img style={{ width: '15px' }} src="../img/settings.svg" alt="Langage"></img></li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired
}


export default Header;