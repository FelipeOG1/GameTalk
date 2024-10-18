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





app.get('/games',async(req,res)=>{
    

    
    
   

    try{

    const response=await axios.post('https://api.igdb.com/v4/games',`fields id,name,platforms,rating,cover.url; where platforms = (6) & cover !=null;limit 6;search "call of duty";
`,{headers:config});


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





app.get('/game-details/:id',async(req,res)=>{
   


  if(req.isAuthenticated()){

    console.log('naaa');

  }

 


 

    
    const gameId=req.params.id;

    try{

        const response=await axios.post(`https://api.igdb.com/v4/games`, `fields name, summary, cover.url,storyline,genres.name,platforms.name,release_dates.human,involved_companies.company.name,rating, videos.video_id, websites.url,rating_count; where id = ${gameId};`,{headers:config});

        if(req.isAuthenticated()){
           

            res.json({

                "AuthState":true,
                "gameDetails":response.data
            });


        }else{
           
            res.json({

                "AuthState":false,
                "gameDetails":response.data
            });


        }
        

        
    }catch(e){
        console.error(e.message);
    }

    
})


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







  app.post('/register',async (req,res)=>{

    const{username,password,email,rePassword}=req.body;

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
        const gameId=req.body.id;
        const userId=req.user.id;
        console.log(userId)

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

            
            console.log(cover.data)
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















