const express = require('express');
// const router = express();
const path = require('path');

const users = require('./api/Users');
const app = express();
app.set('view engiene', 'ejs');
require('dotenv').config({
  override : true,
  path: path.join(__dirname, 'development.env')
})

const {client, Pool} = require('pg');
 const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database:process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
 });
 module.exports = pool;
 (async()=>{
   try{
     const {rows} = await pool.query('SELECT current_user, current_database() AS database_name');
     const current_user = rows[0]['current_user'];
     const current_database = rows[0]['database_name'];
     console.log("connected to database->"+ current_database +" Owner:"+ current_user);
    } catch(err){
      console.error(`Error in connection ${err}`);
    }
  })();
  
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  
  app.get('/users', async (req, res) => {
    try {
      console.log("before routes");
      const { rows } = await pool.query('SELECT * FROM users');
      res.json(rows);
      res.send("<p>I am from users route. </p>")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/signup',(req,res)=>{
    console.log('signup');
    res.render('views/signup.ejs')
  });
  
app.use('/api', users); // Mount your users routes under the '/api' path

const port =  3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
//modified