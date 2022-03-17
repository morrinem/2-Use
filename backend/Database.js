const mysql = require('mysql');
const dotenv = require('dotenv'); 

dotenv.config();

var db = mysql.createConnection({
  host: process.env.DB_ADDRESS,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

const getQuery = async (query) => {
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        db.query(query, function (err, result) {
          if (err) throw err;
          console.log(result);
          return result;
        });
      });
}

const result = getQuery("SELECT * FROM data.listings");