const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const personRoutes = require('./routes/personRoutes')

const app = express()
const PORT = 3000
require('dotenv/config')
mongoose.connect(process.env.MONGODB_URI)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/', personRoutes)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
