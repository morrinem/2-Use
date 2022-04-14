require("dotenv").config()
const express = require("express")
const router = express.Router()
const { Posts } = require('../models')
const {verifyJWT} = require('../middlewares/AuthMiddleware')

router.use(express.json())



const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Learn React Today" }],
  [2, { priceInCents: 2000, name: "Learn CSS Today" }],
])


router.post("/create-checkout-session", async (req, res) => {
    try {
        var post
        var title
        var price
        req.body.items.map( async item => {
            post = await Posts.findOne({where: {id: item.id}}).then(async (res) =>{

                title = res.dataValues.title
                price = parseInt(res.dataValues.price)

                }

            ).then(async () => {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    mode: "payment",
                    line_items: req.body.items.map(  item => {

                        const storeItem = storeItems.get(item.id)

                        return {
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: title,
                                },
                                unit_amount: price,
                            },
                            quantity: 1,
                        }
                    }),
                    success_url: "http://localhost:3000",
                    cancel_url: "http://localhost:3000",

                })
                res.json({ url: session.url })
            })

        })


    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

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

router.get('/byuserId', verifyJWT, async (req,res) => {
    const id = req.user.id
    const listOfPosts = await Posts.findAll({where: {UserId: id}})
    res.json(listOfPosts)
})



router.post("/", verifyJWT, async (req, res) => {
    const post = req.body
    const username = req.user.username
    const id = req.user.id
    post.UserId = id
    const price = (post.price * 100)
    post.username = username
    post.price = req.body.price
    post.imageUrl = req.body.imageUrl
    await Posts.create(post)
    res.json(post)
})


module.exports = router
