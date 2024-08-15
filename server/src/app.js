import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import axios from "axios"

dotenv.config({ path: '../.env' });
const app=express();

app.use(cors());

const port=process.env.PORT;


const config={
    'Client-ID':process.env.CLIENT_ID,
    'Authorization':process.env.AUTHORIZATION,
    'Content-Type': 'text/plain'
}




app.get('/games',async(req,res)=>{
    try{

        const response=await axios.post('https://api.igdb.com/v4/games',`fields name,platforms,rating,cover.url; where platforms = (6) & cover !=null;limit 16;search "call of duty";
`,{headers:config});

       

        res.json(response.data);



    }catch(e){
        console.error(e.message);
    }
})

app.get('/',(req,res)=>{
    res.json("nase");
})


app.listen(port,()=>{
    console.log(`listening`);
})






