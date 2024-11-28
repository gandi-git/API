const express = require ("express")
const cors = require ("cors")
const dotenv = require ("dotenv")
global.jwt = require ("jsonwebtoken")
global.bcrypt = require("bcrypt");

const { PrismaClient }= require ("@prisma/client")

global.response = require ("./controller/response/responseController")
const routes = require ("./routes/router")

global.prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 3000

dotenv.config()
app.use(express.json());
app.use(routes)
app.use(cors())


app.listen(port, ()=>{
    console.log (`App listen at http://localhost:${port}`)
})