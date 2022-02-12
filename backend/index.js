const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3001

const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(cors())
app.use(express.json())

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