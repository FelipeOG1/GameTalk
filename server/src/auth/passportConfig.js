import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from '../config/dbConfig.js'; 

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, cb) {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
          return cb(null, false); 
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return cb(null, false); 
        }
        return cb(null, user); 
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id); 
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    cb(null, user); 
  } catch (err) {
    cb(err);
  }
});

export default passport;