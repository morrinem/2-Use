const mysql = require('mysql');
const dotenv = require('dotenv'); 

dotenv.config();

var db = mysql.createConnection({
  host: process.env.DB_ADDRESS,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

const makeQuery = async (query) => {
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

//export
export const getAllListings = async () => {
    return await makeQuery("SELECT * FROM data.listings");
}

//export
export const getListingById = async (id) => {
    return await makeQuery("SELECT * FROM data.listings WHERE listuid="+id);
}

//export
export const setListing = async (name, userid, price, desc) => {
    if (userid == null)
    {
        return await makeQuery("INSERT INTO data.listings (listname, listprice, listdescription) VALUES ('" + name + "','" + price + "','" + desc + "')");
    }
    return await makeQuery("INSERT INTO data.listings (listname, listuid, listprice, listdescription) VALUES ('" + name + "','" + userid + "','" + price + "','" + desc + "')");
}

//export
export const updateListingWithPicture = async (listingid, imageurl) => {
    return await makeQuery("UPDATE data.listings SET listimageurl = '" + imageurl + "' WHERE idlistings = '" + listingid + "'");
}

//export
export const setUser = async (email, login, password, fullname) => {
    return await makeQuery("INSERT INTO data.users (useremail, userlogin, userpassword, userfullname) VALUES ('" + email + "','" + login + "','" + password + "','" + fullname + "')");
}

//export
export const verifyUser = async (login, password) => {
    return await makeQuery("SELECT * FROM data.users WHERE (useremail='" + login + "' OR userlogin='" + login + "') AND userpassword='" + password + "'");
}