require('dotenv').config()
const express = require("express")
const router = express.Router()
const { Posts } = require('../models')
const {verifyJWT} = require('../middlewares/AuthMiddleware')

router.use(express.json())


const stripe = require("stripe")("sk_test_51KiIKpI9aB5NdcmJ27xEhiP12nzy8uPedwBmQRy2CUMkVJ5Y50iUFrUuDncQnZJywgNQmTuhYNIbubOw5tDxmktB00aTk6Mx3H")

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])


router.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
      })
      res.json({ url: session.url })
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


router.post("/", verifyJWT, async (req, res) => {
    const post = req.body
    const username = req.user.username
    post.username = username
    await Posts.create(post)
    res.json(post)
})


module.exports = router