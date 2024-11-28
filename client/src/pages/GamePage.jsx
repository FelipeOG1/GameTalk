import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AllPlatforms from '../components/AllPlatforms';
import NavBar from '../components/navBar';
import TalkAbout from './TalkAboutPage';
import LatestReviews from '../components/LatestReviews';
import AddGameButton from '../components/AddGameButton';
import { UserContext } from "../components/Context";
import PcGames from '../components/PcGames';
import RatingBox from '../components/RatingBox';

function GamePage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [gameData, setGameData] = useState([]);
  const { state } = useLocation();
  const [loading, setLoading] = useState(true); // El estado inicial es "loading" = true

  const [isFavorite, setIsFavorite] = useState(false);
  const [primaryPlatform, setPrimaryPlatform] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [isReviewed, setIsReviewed] = useState(false);
  const [similarGames, setSimilarGames] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [numberReviews, setNumberReviews] = useState(0);

  async function loadData(controller) {
    try {
      const response = await fetch(`http://localhost:3000/games/game-details/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      setGameData(data.gameDetails[0]);
      setIsFavorite(data.isFavorite);
      setIsReviewed(data.isReviewed);
      setPrimaryPlatform(data.primaryPlatform);
      setReleaseDate(data.releaseDate);
      setPlatforms(data.platforms);
      setSimilarGames(data.similarGames);

      setLoading(false); // Marcar como cargado
    } catch (e) {
      console.error(e.message);
      setLoading(false); // En caso de error también cambiar a "false"
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    
    setGameData([]);
    setIsFavorite(false);
    setIsReviewed(false);
    setPrimaryPlatform('');
    setReleaseDate('');
    setPlatforms([]);
    setSimilarGames([]);
    setLoading(true);

    loadData(controller); 

    return () => {
      controller.abort();
    };
  }, [id]);
console.log(numberReviews);
  
  if (loading) {

    return null; 
  }

  const roundedRating = gameData.rating ? parseFloat(gameData.rating.toFixed(0)) : null;

  const getBackgroundColor = () => {
    if (roundedRating >= 75 && roundedRating <= 90) return 'bg-cyan-500';
    if (roundedRating >= 50 && roundedRating <= 75) return 'bg-cyan-700';
    if (roundedRating >= 90) return 'bg-cyan-300';
    return 'bg-cyan-900';
  };

  return (
    <Fragment>
      <NavBar />

      <div className='w-full'>
      <div className='w-8/12 m-auto mt-16 flex rounded-md game-shadow'>
  
  <div className='w-9/12'>
    {gameData.videos ? (
      <iframe
        className='h-full w-full rounded-md'
        src={`https://www.youtube.com/embed/${gameData.videos[0].video_id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <img className='h-96 w-full rounded-md' src={gameData.cover.url.replace('t_thumb', 't_original')} alt="" />
    )}
  </div>

  
  <div className='w-5/12 ml-6 mr-6'>
    <h1 className='text-3xl font-bold'>{gameData.name}</h1>

    <div className='flex gap-5 mt-3 items-center mb-4'>
      <h1 className='text-2xl font-bold'>{primaryPlatform}</h1>
      {platforms.length > 1 && <AllPlatforms platforms={platforms} />}
    </div>

    <h3 className='mb-3'>
      <span className='font-semibold'>Released on:</span> {releaseDate}
    </h3>
    <hr className='mb-4' />

    <div className='flex justify-between mb-9'>
      <div>
        <h2 className='font-bold'>IGDB RATING</h2>
        <p className='underline'>Based on {gameData.rating_count} Critic Reviews</p>
      </div>

      <div>
      <RatingBox rating={gameData.rating}/>
     </div>
    </div>

   
    <div className='flex justify-between mb-3'>

      
      <div>
        <h2 className='font-bold'>GAMETALK RATING</h2>
        <p className='underline'>Based on {numberReviews} Critic Reviews</p>
      </div>

     <div>
      <RatingBox rating={averageScore}/>
     </div>
    </div>

   
    <div className='mt-3 mb-8'>
      {user ? (
        <AddGameButton gameId={id} originalState={isFavorite} userId={user.id} />
      ) : (
        <AddGameButton />
      )}
    </div>

  <div className='mb-3'>
  <TalkAbout gameId={id} isReviewed={isReviewed} />

  </div>
    
  </div>
</div>
      </div>

      <div className='w-8/12 m-auto mt-10 mb-3 pb-5'>
        <h1 className='font-bold text-3xl'>Summary</h1>
        <p className='mb-3'>{gameData.summary}</p>

        <div className='mb-3 pb-5'>
          <h1 className='font-bold text-3xl'>Latest Reviews</h1>
          <hr className='mb-5' />
          <LatestReviews gameName={gameData.name} setAverageScore={setAverageScore} setNumberReviews={setNumberReviews} gameId={id} />
        </div>

        <div className='pb-5'>
          <h1 className='text-2xl font-semibold mb-3'>Similar Games</h1>
          <hr />
          {similarGames.length > 0 && <PcGames covers={similarGames} />}
        </div>
      </div>
    </Fragment>
  );
}

export default GamePage;