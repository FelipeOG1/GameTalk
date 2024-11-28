import dotenv from "dotenv";



dotenv.config({ path: '../.env' }); 

const config={
    'Client-ID':process.env.CLIENT_ID,
    'Authorization':process.env.AUTHORIZATION,
    'Content-Type': 'text/plain'
}



export default config;