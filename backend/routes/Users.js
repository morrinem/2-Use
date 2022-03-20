const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const multer = require('multer')
const {verifyJWT} = require('../middlewares/AuthMiddleware')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')

router.use(express.json())



const { sign } = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })


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
   const { username, password, university, age} = req.body

   //checks if the username is unique
   const user = await Users.findOne({ where: {username: username}})
   if(user) res.json({error: "Username already exists"})

   bcrypt.hash(password, 10).then((hash) => {
      Users.create({
          username: username,
         password: hash,
          university: university,
          age: age,
      })
      res.json("Success")
   })
})

router.post('/image', upload.single('file'), function (req, res) {
    res.json({})
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

router.get("/profile", verifyJWT, async (req, res) => {

    //const user = await User.findById(req.data.id);
    const id = req.user.id

    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ["password"]},
    })
    res.json(basicInfo)
});



module.exports = router








