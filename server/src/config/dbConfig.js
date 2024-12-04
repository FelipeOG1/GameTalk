
import pkg from "pg"; 
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: '../.env' }); 


const { Pool } = pkg;


const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});






db
  .connect()
  .then(client => {
    console.log('Connected to the database successfully');
    client.release(); 
  })
  .catch(err => console.error('Database connection error:', err.stack));


export default {
  query: (text, params) => db.query(text, params), 
};