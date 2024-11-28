import db from "../config/dbConfig.js"



const createAvatar = async (req, res) => {
    const { id } = req.params;
    const { avatarUrl } = req.body;
  
    try {
      await db.query("INSERT INTO avatars(user_id, avatar_url) VALUES ($1, $2)", [
        id,
        avatarUrl,
      ]);
      res.status(200).json({
        message: "Avatar created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to create avatar" });
    }
  };
  
  const getMyAvatar = async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    const { id } = req.user;
  
    try {
      const response = await db.query("SELECT avatar_url FROM avatars WHERE user_id=$1", [id]);
  
      if (response.rows.length > 0) {
        const url = response.rows[0].avatar_url;
        return res.status(200).json({
          myAvatar: url,
        });
      }
  
      res.status(404).json({ error: "Avatar not found" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch avatar" });
    }
  };




  const editAvatar=async (req,res)=>{

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







  }


  
  export default {
    createAvatar,
    getMyAvatar,
    editAvatar
  };