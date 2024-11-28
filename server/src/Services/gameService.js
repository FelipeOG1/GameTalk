import axios from "axios";
import db from "../config/dbConfig.js"
import config from "../config/igdbConfig.js";




const fetchGames = async (searchQuery) => {
  try {
      const response = await axios.post(
          `https://api.igdb.com/v4/games`,
          `fields name, platforms.name, release_dates.date, cover.url, rating, id; search "${searchQuery}"; limit 20;`,
          { headers: config }
      );

      return response.data.map((game) => ({
          name: game.name || 'Unknown',
          platforms: game.platforms?.map((p) => p.name) || [],
          cover: game.cover?.url || 'https://via.placeholder.com/200',
          rating: typeof game.rating === 'number' ? game.rating.toFixed(1) : 0,
          id: game.id || 'Unknown',
      }));
  } catch (error) {
      console.error('Error fetching games:', error.message);
      throw new Error('Failed to fetch games');
  }
};





const fetchGameDetails = async (gameId, req) => {
    const [gameResponse, favoriteGame, reviewedGame] = await Promise.all([
      axios.post(
        `https://api.igdb.com/v4/games`,
        `fields name, summary, cover.url,genres.id, genres.name, platforms.id, platforms.name, release_dates.platform, rating, release_dates.date, release_dates.human, videos.video_id, websites.url, rating_count; where id = ${gameId};`,
        { headers: config }
      ),
      req.isAuthenticated()
        ? db.query('SELECT EXISTS (SELECT 1 FROM favorites WHERE user_id = $1 AND game_id = $2)', [req.user.id, gameId])
        : Promise.resolve({ rows: [{ exists: false }] }),
      req.isAuthenticated()
        ? db.query('SELECT EXISTS (SELECT 1 FROM reviews WHERE user_id = $1 AND game_id = $2)', [req.user.id, gameId])
        : Promise.resolve({ rows: [{ exists: false }] })
    ]);
  
    const game = gameResponse.data[0];

  
    let platformsLogos = [];
    if (game.platforms && game.platforms.length > 1) {
      const platformsIds = game.platforms.map(p => p.id).join(',');
      const platformsResponse = await axios.post(
        `https://api.igdb.com/v4/platforms`,
        `fields id, platform_logo.url, name, url; where id = (${platformsIds});`,
        { headers: config }
      );
      platformsLogos = platformsResponse.data;
    } else {
      platformsLogos = game.platforms || [];
    }
  
    const releaseDates = game.release_dates || [];
    const sortedReleaseDates = releaseDates.sort((a, b) => a.date - b.date);
    const primaryPlatformId = sortedReleaseDates[0]?.platform;
    const primaryPlatform = game.platforms?.find(p => p.id === primaryPlatformId)?.name || 'Unknown';
    const releaseDate = sortedReleaseDates[0]?.human || 'N/A';
  
    const genres = game.genres?.map(g => g.id) || [];
    const genreQuery = genres.length ? `genres = (${genres.join(',')})` : '';
    const similarGamesPromise = genreQuery
      ? axios.post(
          `https://api.igdb.com/v4/games`,
          `fields name, rating, cover.url, id, genres; where ${genreQuery} & rating_count > 50; limit 500;`,
          { headers: config }
        )
      : Promise.resolve({ data: [] });
  
    const similarGames = (await similarGamesPromise).data.filter(g => {
      const gameGenres = g.genres || [];
      return gameGenres.length === genres.length && genres.every(genre => gameGenres.includes(genre));
    });
    
  
    return {
      AuthState: req.isAuthenticated(),
      isFavorite: favoriteGame.rows[0].exists,
      isReviewed: reviewedGame.rows[0].exists,
      gameDetails: [game],
      primaryPlatform,
      releaseDate,
      platforms: platformsLogos,
      similarGames,
    };
  };


  const fetchNewPs5Games = async () => {
    const unixTimeSeconds = Math.floor(Date.now() / 1000); 
  
    try {
      const response = await axios.post(
        'https://api.igdb.com/v4/games',
        `fields id, name, cover.url; where release_dates.date > ${unixTimeSeconds} & platforms = 167 & cover.url != null;`,
        { headers: config }
      );
      return response.data;
    } catch (e) {
      console.error('Error al obtener los juegos de PS5:', e.message);
      throw new Error('Error al obtener los juegos de PS5');
    }
  };


  const fetchConsoleGames = async () => {
    try {
      const response = await axios.post(
        'https://api.igdb.com/v4/games',
        `
          fields name, rating, cover.url, id;
          sort rating desc;
          where rating_count > 200 & platforms.category = 1;
        `,
        { headers: config }
      );
      return response.data;
    } catch (e) {
      console.error('Error al obtener los juegos de consola:', e.message);
      throw new Error('Error al obtener los juegos de consola');
    }
  };

  const fetchPcGames=async ()=>{

    try{
      const response = await axios.post('https://api.igdb.com/v4/games', `
         fields name,rating,cover.url,id; sort rating desc; where rating_count>200 & platforms.category = 6;
         
          
          
        `, { headers: config });


        
           
           return response.data;

             

  
  }catch(e){
  console.error(e.message);
      }






  }


  const fetchUserFavoriteGames = async (userId) => {
    try {
      
      const response = await db.query('SELECT game_id FROM favorites WHERE user_id = $1', [userId]);
      const gamesId = response.rows.map((row) => row.game_id);
  
      if (gamesId.length === 0) {
        return []; 
      }
  
      const gameIdString = gamesId.map((id) => `id = ${id}`).join(' | ');
      const igdbResponse = await axios.post(
        'https://api.igdb.com/v4/games',
        `fields name, id, rating, cover.url; where ${gameIdString};`,
        { headers: config }
      );
  
      return igdbResponse.data || [];
    } catch (error) {
      console.error('Error fetching user favorite games:', error.message);
      throw new Error('Failed to fetch user favorite games');
    }
  };


  
  
  

  export default { fetchGameDetails, fetchGames,fetchNewPs5Games,fetchConsoleGames,fetchPcGames,fetchUserFavoriteGames };



