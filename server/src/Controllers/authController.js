import passport from "passport";
import bcrypt from "bcrypt";
import db from "../config/dbConfig.js"
import authConfig from "../auth/passportConfig.js"

const saltRounds = 10;

const login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      req.session.save(() => {
        res.status(200).json({
          message: "Login successful",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      });
    });
  })(req, res, next);
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const checkEmail = await db.query("SELECT * FROM users WHERE email=$1", [email]);

    if (checkEmail.rows.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const response = await db.query(
      "INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *",
      [username, hashedPassword, email]
    );

    const user = response.rows[0];

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      req.session.save(() => {
        res.status(200).json({
          message: "Registration and login successful",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const user=async (req,res)=>{

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


}

export default {
  login,
  register,
  user
};