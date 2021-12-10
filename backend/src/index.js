// Importing the modules 
import Fastify from "fastify"
import mongoose from "mongoose"
import { config } from "dotenv"
import fastifyCors from "fastify-cors"

// Importing the routes

import authRoutes from "./Routes/authRoutes.js"
import userRoutes from "./Routes/userRoutes.js"
import chatRoutes from "./Routes/chatRoutes.js"

// Config the app
config()
const fastify = Fastify({ logger : true })
const port = process.env.PORT ||  8000
fastify.register(fastifyCors)

// DB config

mongoose.connect(process.env.MONGO_URL , 
  {
    useNewUrlParser : true,
    useUnifiedTopology : true
  } , console.log(`Mongo has been conneted to the DB`))

// Routes

fastify.get("/" , (request , reply) => 
{
  reply.status(200).send("This is the API of WhatsApp")
})


authRoutes.map(route =>
  {
    fastify.route(route)
  })

userRoutes.map(route =>
  {
    fastify.route(route)
  })

chatRoutes.map(route => 
  {
    fastify.route(route)
  })

// Listener


fastify.listen(port , (err , address) =>
{
  if(err)
  {
    fastify.log.error(err)
    return process.exit(1)
  }
})