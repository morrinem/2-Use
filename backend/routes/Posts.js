const express = require("express")
const router = express.Router()
const { Posts } = require('../models')
const {verifyJWT} = require('../middlewares/AuthMiddleware')

router.use(express.json())



router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll()
    console.log(listOfPosts)
    res.json(listOfPosts)
})

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const post = await Posts.findOne({where: {id: id}})
    res.json(post)
})


router.post("/", verifyJWT, async (req, res) => {
    const post = req.body
    const username = req.user.username
    post.username = username
    post.price = req.body.price
    await Posts.create(post)
    res.json(post)
})


module.exports = router
