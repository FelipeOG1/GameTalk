
import express from "express";
import {getGameDetails,findGame,getNewPs5Games,getConsoleGames,getPcGames,addGame,deleteGame,getUserFavoriteGames} from "../Controllers/gameController.js";
import { isAuthenticated } from '../middleware/authMiddleware.js'


const router = express.Router();

router.get('/game-details/:id', getGameDetails); 

router.get('/findGame/:game', findGame); 

router.get('/newPs5Games', getNewPs5Games);

router.get('/consoleGames',getConsoleGames);

router.get('/pcGames',getPcGames);


router.post('/addGame',isAuthenticated,addGame);


router.delete('/removeGame/:gameId',isAuthenticated,deleteGame);


router.get('/userGames', isAuthenticated, getUserFavoriteGames);



export default router;