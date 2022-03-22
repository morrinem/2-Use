const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
const db = require('./models')

const PORT = 3001

// Routers
const userRouter = require('./routes/Users');
app.use("/auth",userRouter)
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server is running")
    })
})

