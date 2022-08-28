import Header from "../components/Header";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import '../scss/Home.scss';

const Home = () => {
  return (
    <div className='Home'>
      <Header />
      <main>
        <div className="hero-title">
        <h1>LoLProfile</h1>
        <div>
            <h2>The app is here.</h2>
            <Button 
              text="Download App"
              img="./img/windows-logo.svg"
              width="30"
              height="10"
              imgWidth="15"
            />
          </div>
        </div>
        <SearchBar />
      </main>
    </div>
  );
}

export default Home;