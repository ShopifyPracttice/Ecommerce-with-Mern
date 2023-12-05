const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./Routes/users.js")
const product = require("./Routes/product.js")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", userRouter)
app.use("/products" , product)

const dbURL = 'mongodb+srv://muneebehsan38:test123@mernstack.lbo1gpx.mongodb.net/eCommerce?retryWrites=true&w=majority'

mongoose.connect(dbURL)
.then((res) => console.log("conected"))
.catch((err) => console.log(err))

app.listen("3001", ()=>{
    console.log("server running on 3001");
})