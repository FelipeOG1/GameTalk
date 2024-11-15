import express, { response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import axios from "axios"
import pg from "pg";
import bcrypt, { compare } from "bcrypt";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import { fileURLToPath } from 'url';
import path from "path";
import { parse } from "path";
import multer from "multer"


dotenv.config({ path: '../.env' });
const app=express();
const upload = multer({ dest: 'blopsReviews/' }); 
const saltRounds=parseInt(process.env.SALT);
const port=process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json()); 
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/blopsReviews', express.static('blopsReviews')); 




const config={
    'Client-ID':process.env.CLIENT_ID,
    'Authorization':process.env.AUTHORIZATION,
    'Content-Type': 'text/plain'
}


const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  db.connect();



  passport.use(new Strategy(
    {
        usernameField: 'email', 
        passwordField: 'password'
    },
    async function verify(email, password, cb) {
      

        try {
            const checkEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            
            if (checkEmail.rows.length > 0) {
                const user = checkEmail.rows[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    return cb(null, user); 
                } else {
                    return cb(null, false); 
                }
            } else {
                return cb(null, false); 
            }
        } catch (error) {
            return cb(error); 
        }
    }
));

 
app.post(
    "/login",
    (req, res, next) => {
        
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: err.message });
                
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            if(user){
                req.logIn(user, (err) => {
                    if (err) {
                   return res.status(500).json({ error: err.message });
                        
                    }
                    req.session.save(() => {
                        res.status(200).json({  message: 'Login successful',
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                            } });
                        

                      });
                    
                });
                
            }
           
        })(req, res, next);
    }
);





app.get('/newGames',async(req,res)=>{
    
    try{

        const response = await axios.post('https://api.igdb.com/v4/games', `
            fields id,name,rating,cover.url,release_dates.date,release_dates.human; 
            where cover != null 
            & release_dates.date > 1726700134;
            
            
          `, { headers: config });
          
         
          const filteredGames = response.data.filter(game => {
           
            return game.release_dates.length < 3;
          });
          
          
          const timestamp = Math.floor(Date.now() / 1000); 
          const month=2592000*3
          
        




if(req.isAuthenticated()){
   
    res.json({
        'authState':true,
        'games':response.data
    })


}else{
    
    res.json({
        'authState':false,
        'games':response.data
    })
}

       

    



    }catch(e){
        console.error(e.message);
    }
})





app.get('/game-details/:id', async (req, res) => {
   
  
    const gameId = parseInt(req.params.id, 10);
    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
  
    try {
      const response = await axios.post(
        `https://api.igdb.com/v4/games`,
        `fields name, summary, cover.url, storyline, genres.name,platforms.id, platforms.name, release_dates.platform, rating, release_dates.date, release_dates.human, cover.url,id,videos.video_id, websites.url, rating_count; where id = ${gameId};`,
        { headers: config }
      );
      const game=await response.data[0];
      

      const platforms = game.platforms ? game.platforms : [];
      const releaseDates = game.release_dates || [];

       
        const sortedReleaseDates = releaseDates.sort((a, b) => a.date - b.date);
        const primaryPlatformId = sortedReleaseDates[0]?.platform;
        const primaryPlatform = platforms.find((p) => p.id === primaryPlatformId)?.name || 'Unknown';
        const releaseDate=sortedReleaseDates[0].human;






        const setPlatforms= async (plat)=>{
            if(plat.length>1){
                const platformsId=plat.map(m=>m.id).join(',');
                const response=await axios.post(`https://api.igdb.com/v4/platforms`,`fields id, platform_logo.url,name,url;where id = (${platformsId});`,  { headers: config });
                const platformsLogo=response.data;

                return platformsLogo;
            

                
                
    
                
            }else{
                return plat;
            }



        }


    
     
            



      
        const platformsLogos = await setPlatforms(platforms);

  
      if (req.isAuthenticated()) {
        const { id } = req.user;
        

         const favoriteGame = await db.query('SELECT EXISTS (SELECT 1 FROM favorites WHERE user_id = $1 AND game_id = $2)', [id, gameId]);
         const isFavorite = favoriteGame.rows[0].exists;
  
        res.json({
          AuthState: true,
          isFavorite: isFavorite, 
          gameDetails: response.data,
          primaryPlatform:primaryPlatform,
          releaseDate:releaseDate,
          platforms: platformsLogos 
        
        });
      } else {
        res.json({
          AuthState: false,
          gameDetails: response.data,
          primaryPlatform:primaryPlatform,
          releaseDate:releaseDate,
          platforms: platformsLogos 
          
        });
      }
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: 'Error fetching game details' });
    }
  });
app.get('/user', (req, res) => {
    try {
      
      if (req.isAuthenticated()) {
       
        const { id, username, email } = req.user;
        res.status(200).json({
          id,
          username,
          email,
        });
      } else {
      
        res.status(401).json({ message: 'Usuario no autenticado' });
      }
    } catch (error) {
   
      console.error('Error en la ruta /user:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });



  app.get('/findGame/:game', async (req, res) => {
    const { game } = req.params;

    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `
              fields name, platforms.id, platforms.name, release_dates.platform, rating, release_dates.date, cover.url,id;
              search "${game}";
              limit 20;
            `,
            { headers: config }
        );

        const games = response.data;
        console.log(games);

        if (games.length > 0) {
            const gamesWithPrimaryPlatform = games.map((game) => {
               
                const name = game.name || 'Unknown';
                const platforms = game.platforms ? game.platforms : [];
                const releaseDates = game.release_dates || [];
                const coverUrl = game.cover && game.cover.url ? game.cover.url : 'https://via.placeholder.com/200';
                const rating = typeof game.rating === 'number' ? game.rating.toFixed(1) : 'N/A';
                const id=game.id || 'Unknown'

              
                const sortedReleaseDates = releaseDates.sort((a, b) => a.date - b.date);
                const primaryPlatformId = sortedReleaseDates[0]?.platform;
                const primaryPlatform = platforms.find((p) => p.id === primaryPlatformId)?.name || 'Unknown';

                return {
                    name,
                    platforms: platforms.map((p) => p.name),
                    primaryPlatform,
                    cover: coverUrl,
                    releaseDates:sortedReleaseDates,
                    rating,
                    id
                    
                };
            });

            res.json(gamesWithPrimaryPlatform);
        } else {
            console.log('No games found');
            res.status(204).send();
        }
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(500).json({ error: 'Error al obtener los juegos' });
    }
});



  app.post('/register',async (req,res)=>{

    const{username,password,email}=req.body;

    try{
        const checkEmail= await db.query('SELECT * FROM users where email=$1',[email]);

        if(checkEmail.rows.length<=0){
            bcrypt.hash(password,saltRounds,async(err,hash)=>{

                if(err){
                    console.log('nase'+ err);
                    
                }else{
                    const response=await db.query('INSERT INTO users(username,password,email) VALUES($1,$2,$3) RETURNING *',[username,hash,email]);

                    const user=response.rows[0];

                    req.logIn(user, (err) => {
                        if (err) {
                       return res.status(500).json({ error: err.message });
                            
                        }


                        req.session.save(() => {
                            res.status(200).json({  message: 'Login successful',
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                } });
                            
    
                          });

                      
                        
                        
                    });

                    
                  

                }


           
    



            })

        

    
       
    
    }else{
        
        res.json('0');
    }
    



    }catch(error){

        console.error(error.message);
    }


    const checkEmail= await db.query('SELECT * FROM users where email=$1',[email]);

   

   
  })

  app.post('/create-avatar/:id',async (req,res)=>{
    const {id}=req.params;
    const {avatarUrl}=req.body;



    


    try{

        const response= await db.query('INSERT INTO avatars(user_id,avatar_url) VALUES ($1,$2)',[id,avatarUrl]);
        res.status(200).json({  message: 'avatar created successfully',

           
     });
        

      
    
    



    }catch(e){
        console.log(e.message);
        res.status(400);
    }



    
  })


  app.get('/myAvatar',async (req,res)=>{

    if (req.isAuthenticated()) {
        const { id } = req.user;

        try{

            const response=await db.query('SELECT avatar_url from avatars where user_id=$1',[id])

            if(response.rows.length>0){
                console.log(response.rows[0]);
                const url=response.rows[0].avatar_url;

                res.json({
                    myAvatar: url,
                })

            }


        }catch(e){
            console.log(e.message);
        }

    }
   


    


  })


  app.put('/edit-avatar/:id',async (req,res)=>{
    const{id}=req.params;
    const {avatarUrl}=req.body;
    console.log(id,avatarUrl);


    try{

        const response= await db.query('UPDATE avatars SET avatar_url=$1 WHERE user_id=$2',[avatarUrl,id]);
        res.status(200).json({  message: 'avatar created successfully',

           
     });
        

      
    
    



    }catch(e){
        console.log(e.message);
        res.status(400);
    }




    
    


    






    
  })




  
    

  passport.serializeUser((user, cb) => {
    cb(null, user.id); 
  });
  
  passport.deserializeUser(async (id, cb) => {
    try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = result.rows[0];
      cb(null, user); 
    } catch (err) {
      cb(err, null);
    }
  });



  app.post('/addGame',async (req,res)=>{


    if(req.isAuthenticated()){
        const gameId=req.body.gameId;
        const userId=req.user.id;
        console.log(gameId)

        try{

            const response=await db.query('insert into favorites(user_id,game_id) values($1,$2)',[userId,gameId]);

            



            



        }catch(e){

            console.error(e.message);
    
        }
    



      

    

    }


 


 








  })

  app.get('/myGames', async (req, res) => {
    if (req.isAuthenticated()) {
        const { id } = req.user;

        try {
          
            const response = await db.query('SELECT game_id FROM favorites WHERE user_id = $1', [id]);
            const gamesId = response.rows.map(row => row.game_id); 
            
            if (gamesId.length === 0) {
                return res.json([]); 
            }

            
            const gameIdString = gamesId.map(id => `id = ${id}`).join(' | ');

          
            const cover = await axios.post(
                'https://api.igdb.com/v4/games',
                `fields name, id, rating , cover.url; where ${gameIdString};`,
                { headers: config }
            );

            
            
            res.json(cover.data || []); 
        } catch (e) {
            console.error(e.message);
            res.status(500).json({ error: 'Error retrieving games' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

 

  
  

  app.post('/addReview', upload.single('audio'), async (req, res) => {
    const { score, gameId } = req.body;
    const userId = req.user.id;

    const audioUrl = `http://localhost:3000/${req.file.path.replace(/\\/g, '/')}`;

    try {
        await db.query('INSERT INTO reviews (user_id, game_id, score, audio_url) VALUES ($1, $2, $3, $4)', [userId, gameId, score, audioUrl]);
        res.json({ message: 'Review added successfully!' });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'An error occurred while adding the review.' });
    }
});


  


  app.listen(port,()=>{
    console.log(`listening`);
})


app.get('/gameReview/:id',async(req,res)=>{


const {id}=req.params;


try{

    const response=await db.query('SELECT users.username, reviews.score,reviews.audio_url FROM users INNER JOIN reviews on users.id=reviews.user_id where reviews.game_id=$1 ORDER BY reviews.created_at DESC LIMIT 3;',[id]);
    
   
    const data=await response.rows;
    res.json(data);



}catch(e){
    console.error(e.message)
}




})

app.get('/consoleGames',async (req,res)=>{

    try{
        const response = await axios.post('https://api.igdb.com/v4/games', `
           fields name,rating,cover.url,id; sort rating desc; where rating_count>200 & platforms.category = 1;
           
            
            
          `, { headers: config });


          
               
               res.json(response.data);

               

    
    }catch(e){
    console.error(e.message);
        }


})


app.get('/pcGames',async (req,res)=>{

    try{
        const response = await axios.post('https://api.igdb.com/v4/games', `
           fields name,rating,cover.url,id; sort rating desc; where rating_count>200 & platforms.category = 6;
           
            
            
          `, { headers: config });


          
             
               res.json(response.data);

               

    
    }catch(e){
    console.error(e.message);
        }


})


app.delete('/removeGame/:gameId', async (req, res) => {
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

    
  
});












