const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const jwt = require('jsonwebtoken')
router.use(express.json())

const { sign } = require('jsonwebtoken')



router.use(cors(
     {
         origin: ["http://localhost:3000"],
         methods: ["GET", "POST"],
         credentials: true
     }
 ))
router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: true}))

router.use(session(
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

router.post('/register', async (req,res) => {
   const {username, password} = req.body

   //checks if the username is unique
   const user = await Users.findOne({ where: {username: username}})
   if(user) res.json({error: "Username already exists"})

   bcrypt.hash(password, 10).then((hash) => {
      Users.create({
         username: username,
         password: hash,
      })
      res.json("Success")
   })
})

 const verifyJWT = (req, res, next) => {
     const token = req.headers["x-access-token"]

     if(!token) {
         res.send("Yo, we need a token, please give it next time")
     } else {
         jwt.verify(token, "tochange", (err, decoded) => {
             if(err){
                 res.json({auth: false, message: "failed auth" })
             }else{
                 req.userId = decoded.id
                 next()
             }
         })
     }
 }

router.get('/isUserAuth', verifyJWT, (req,res) => {
     res.send("You are anthenticated Congrats")
 })

router.get("/login", (req, res) => {
     if(req.session.user){
         res.send({loggedIn: true, user: req.session.user})

     }else{
         res.send({
             loggedIn: false
         })
     }
 })

router.post('/login', async (req, res) => {
   const { username, password } = req.body

   const user = await Users.findOne({ where: {username: username}})

   if(!user) res.json({auth: false, message: "no user exists"})
   else {
      bcrypt.compare(password, user.password).then((match) => {
         if (!match) res.json({auth: false, message: "wrong username/password combo"})

         const token = sign({username: user.username, id: user.id}, "tochange")
         req.session.user = user
         res.json({auth: true, token: token, result: user})
      })
   }
})

router.get("/basicinfo/:id", async (req,res) => {
    const id = req.params.id

    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ["password"]},
    })
    res.json(basicInfo)
})

module.exports = router








