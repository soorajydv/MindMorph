const pool = require('./connection');

async function  saveUser(username, email,hashedPassword) {
 // let  insertedUser ;
    
return await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      // Handle successful insertion
      const insertedUser = results.rows[0];
      
      // You can perform additional actions or send a response here
      return insertedUser;
    }
  );
  //console.log('Inserted user:', insertedUser);

 // return insertedUser;
}


module.exports = saveUser;