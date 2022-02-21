const express = require('express')
const app = express()

app.use(express.json())
const db = require('./models')

const PORT = 3001

// Routers
const userRouter = require('./routes/Users');
app.use("/auth",userRouter)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server is running")
    })
})

