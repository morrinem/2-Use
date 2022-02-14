const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const PORT = 3001

const bcrypt = require('bcrypt')
const saltRounds = 10

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
                            req.session.user = result
                            console.log(req.session.user)
                            res.send(result)
                        }else{
                            res.send({
                                message: "wrong username or password"
                            })
                        }
                    })
            } else {
                res.send({
                    message: "User doesn't exist"
                })
            }
        })
})

app.listen(PORT, () => {
    console.log("server is running")
})