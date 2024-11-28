import gameService from "../Services/gameService.js";
import passport from "../auth/passportConfig.js";
import { Passport } from "passport";
import db from "../config/dbConfig.js"

const getGameDetails = async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
  
    try {
      const gameDetails = await gameService.fetchGameDetails(gameId, req);
      
      res.json(gameDetails);
   
      
    } catch (error) {
      console.error('Error fetching game details:', error.message);
      res.status(500).json({ error: 'Error fetching game details' });
    }
  };


  const findGame = async (req, res) => {
    let { game } = req.params;

    if (game.length === 1) {
        game = `${game}a`;
    }

    try {
        const games = await gameService.fetchGames(game); 

        if (!games.length) {
            return res.status(204).send();
        }

        res.json(games);
    } catch (error) {
        console.error('Error al obtener los juegos:', error.message);
        res.status(500).json({ error: 'Error al obtener los juegos' });
    }
};


const getNewPs5Games = async (req, res) => {
  try {
    const newPs5Games = await gameService.fetchNewPs5Games();
    res.json(newPs5Games); 
  } catch (e) {
    console.error('Error al obtener los juegos de PS5:', e.message);
    res.status(500).json({ error: 'Error al obtener los juegos de PS5' });
  }
};


const getConsoleGames = async (req,res)=>{


  try{
    const consoleGames=await gameService.fetchConsoleGames();
    res.json(consoleGames);



  }catch(e){
    console.error('Error al obtener los juegos de consolas:', e.message)
    res.status(500).json({ error: 'Error al obtener los juegos de consola' });
  }


}

const getPcGames=async (req,res)=>{


  try{

    const pcGames=await gameService.fetchPcGames();
    res.json(pcGames);

    
  }catch(e){
    console.error('Error al obtener los juegos de PC:', e.message)
    res.status(500).json({ error: 'Error al obtener los juegos de PC' });


  }


}



const addGame=async (req,res)=>{

    const gameId=req.body.gameId;
    const userId=req.user.id;
    
    console.log(userId);

    try{

        const response=await db.query('insert into favorites(user_id,game_id) values($1,$2)',[userId,gameId]);

        



        



    }catch(e){

        console.error(e.message);

    }







}


const deleteGame=async(req,res)=>{

  const userId = req.user.id;
  const { gameId } = req.params;

  try {
      const response = await db.query('DELETE FROM favorites WHERE user_id=$1 AND game_id=$2', [userId, gameId]);
      
      
      if (response.rowCount > 0) {
          console.log(`Juego con ID ${gameId} eliminado para el usuario ${userId}`);
          return res.status(204).send(); 
      } else {
          console.log(`No se encontró ningún juego con ID ${gameId} para el usuario ${userId}`);
          return res.status(404).json({ message: 'Juego no encontrado' });
      }

  } catch (error) {
      console.error('Error al eliminar el juego:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
  }





}


const getUserFavoriteGames = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id: userId } = req.user; 
    const favoriteGames = await gameService.fetchUserFavoriteGames(userId); 
    return res.status(200).json(favoriteGames);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving user favorite games' });
  }
};

  









  


export  {getGameDetails,findGame,getNewPs5Games,getConsoleGames,getPcGames,addGame,deleteGame,getUserFavoriteGames};