require("dotenv").config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token) {
        res.send("Yo, we need a token, please give it next time")
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.json({auth: false, message: "failed auth" })
            }else{
                req.user = decoded
                next()
            }
        })
    }
}

module.exports = {verifyJWT}