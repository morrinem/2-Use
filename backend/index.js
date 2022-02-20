const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

require("dotenv").config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const PORT = 3001

const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(session(
    {
        key: "userId",
        secret: "tochange",
        resave: false,
        saveUninitialized: false,
        //cookie expires in 24 hours
        cookie: {
            expires: 60 * 60 * 24,
        },
    }
))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'LoginSystem'
})

app.get('/', (req, res) => {
    res.send("hello w")
})

app.post('/register', (req, res) => {
    const { username, password} = req.body


    bcrypt.hash(password,saltRounds, (err,hash) => {
        if(err){
            console.log(err)
        }
        db.query('INSERT INTO users (username, password) VALUES (?, ?)',
            [username,hash],
            (err, result) => {
                if(err) {
                    console.log(err)
                }else{
                    res.send('success')
                }
            })
    })

})

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token) {
        res.send("Yo, we need a token, please give it next time")
    } else {
        jwt.verify(token, "secret123", (err, decoded) => {
            if(err){
                res.json({auth: false, message: "failed auth" })
            }else{
                req.userId = decoded.id
                next()
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req,res) => {
    res.send("You are anthenticated Congrats")
})


app.get("/login", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})

    }else{
        res.send({
            loggedIn: false
        })
    }
})

app.post('/login', (req,res) => {
    const { username, password} = req.body


    db.query('SELECT * FROM users WHERE username = ?',
        username,
        (err, result) => {
            if(err) {
                res.send({err: err})
            }
            if(result.length > 0){
                bcrypt.compare(password,
                    result[0].password,
                    (error, response) => {
                        if(response) {


                            const id = result[0].id
                            const token = jwt.sign({id},
                                "secret123",
                                {expiresIn: 300,} )
                            req.session.user = result
                            res.json({auth: true, token: token, result: result})
                        }else{
                            res.json({auth: false, message: "wrong username/password combo"})
                        }
                    })
            } else {
                res.json({auth: false, message: "no user exists"})
            }
        })
})

app.listen(PORT, () => {
    console.log("server is running")
})