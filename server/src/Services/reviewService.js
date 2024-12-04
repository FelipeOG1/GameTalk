import db from "../config/dbConfig.js";
import fs from "fs";
import path from "path";
import axios from "axios";
import config from "../config/igdbConfig.js";




const addReview = async (userId, gameId, score, audioUrl) => {
    try {
      await db.query(
        'INSERT INTO reviews (user_id, game_id, score, audio_url) VALUES ($1, $2, $3, $4)',
        [userId, gameId, score, audioUrl]
      );
    } catch (error) {
      console.error('Error adding review:', error.message);
      throw new Error('Database error while adding review');
    }
  };



 

const updateReview = async (userId, gameId, score, audioUrl) => {
  try {
 
    const result = await db.query(
      "SELECT audio_url FROM reviews WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );
    const previousAudioUrl = result.rows[0]?.audio_url;

    
    if (previousAudioUrl) {
      const audioPath = path.join(
        process.cwd(),
        previousAudioUrl.replace("http://localhost:3000/", "")
      );
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
        console.log(`Archivo anterior eliminado: ${audioPath}`);
      }
    }

    await db.query(
      "UPDATE reviews SET score = $1, audio_url = $2 WHERE user_id = $3 AND game_id = $4",
      [score, audioUrl, userId, gameId]
    );

    return { message: "Review updated successfully!" };
  } catch (error) {
    console.error("Error updating review:", error.message);
    throw new Error("Database error while updating review");
  }
};

const getGameReviews = async (gameId) => {
    try {
      const response = await db.query(
        `
        SELECT 
          users.username, 
          reviews.score,  
          reviews.audio_url, 
          avatars.avatar_url 
        FROM users 
        INNER JOIN reviews ON users.id = reviews.user_id 
        INNER JOIN avatars ON users.id = avatars.user_id 
        WHERE reviews.game_id = $1 
        ORDER BY reviews.created_at DESC;
        `,
        [gameId]
      );

      const data= await response.rows;

      if (data.length === 0) {
        return null;
      }


      

      
      let score=0;
      const amount=data.length;

     data.map(element=>{
        score+=element.score;


     })


     const averageScore=parseInt(score/amount);

     
     
    

      return {

        data,
        numberReviews: amount || null,
        averageScore:averageScore || null


      }
      
  
      
    } catch (error) {
      console.error("Error fetching game reviews:", error.message);
      throw new Error("Database error while fetching game reviews");
    }
  };


  const getLatestReviews = async () => {
    try {
    
      const response = await db.query(`
        SELECT 
          users.username, 
          reviews.score, 
          reviews.game_id,  
          reviews.audio_url, 
          avatars.avatar_url 
        FROM users 
        INNER JOIN reviews ON users.id = reviews.user_id 
        INNER JOIN avatars ON users.id = avatars.user_id 
        ORDER BY reviews.created_at DESC;
      `);
  
      const reviews = response.rows;
  
      if (reviews.length === 0) return [];
  
     
      const gameIds = reviews.map((r) => r.game_id).join(",");
  
   
      const response2 = await axios.post(
        "https://api.igdb.com/v4/games",
        `
          fields id,name,cover.url; 
          where id = (${gameIds});
        `,
        { headers: config }
      );
  
      const gamesData = response2.data;
  
   
      const result = reviews.map((review) => {
        const game = gamesData.find((g) => g.id === review.game_id);
        return {
          username: review.username,
          avatar_url: review.avatar_url,
          audio_url: review.audio_url,
          score: review.score,
          game_name: game?.name || "Unknown",
          cover_url: game?.cover?.url || null,
          game_id: review.game_id,
        };
      });
  
      return result;
    } catch (error) {
      console.error("Error fetching latest reviews:", error.message);
      throw new Error("Failed to fetch latest reviews");
    }
  };

  const getAllGameReviews = async (gameId) => {
    try {
      const response = await db.query(
        `
        SELECT 
          users.username, 
          reviews.score,  
          reviews.audio_url, 
          avatars.avatar_url 
        FROM users 
        INNER JOIN reviews ON users.id = reviews.user_id 
        INNER JOIN avatars ON users.id = avatars.user_id 
        WHERE reviews.game_id = $1 
        ORDER BY reviews.created_at DESC;
        `,
        [gameId]
      );
  
      return response.rows;
    } catch (error) {
      console.error("Error fetching game reviews:", error.message);
      throw new Error("Failed to fetch game reviews");
    }
  };
  
  const getMyReviews = async (userId) => {
    try {
      const response = await db.query(
        `SELECT audio_url, score, game_id FROM reviews WHERE user_id = $1;`,
        [userId]
      );
  
      const reviews = response.rows;
  
      if (reviews.length === 0) return [];
  
      const reviewsGameIds = reviews.map((r) => r.game_id).join(",");
  
      const response2 = await axios.post(
        "https://api.igdb.com/v4/games",
        `
          fields id,name,cover.url; 
          where id = (${reviewsGameIds});
        `,
        { headers: config }
      );
  
      const gamesData = response2.data;
  
      const result = reviews.map((review) => {
        const game = gamesData.find((g) => g.id === review.game_id);
        return {
          audio_url: review.audio_url,
          score: review.score,
          game_name: game?.name || "Unknown",
          cover_url: game?.cover?.url || null,
          game_id: review.game_id,
        };
      });
  
      return result;
    } catch (error) {
      console.error("Error fetching user reviews:", error.message);
      throw new Error("Failed to fetch user reviews");
    }
  };
  
  


  
  export default {
    addReview, updateReview,getGameReviews,getLatestReviews,getMyReviews,getAllGameReviews
  };


  


