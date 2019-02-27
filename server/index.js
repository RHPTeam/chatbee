const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

const CONFIG = require('./src/configs/configs')
const API = require('./src/routes')
const passportConfig = require('./src/helpers/service/passport.service')

mongoose.connect(
  `mongodb+srv://admin:${
    CONFIG.MONGODB_ATLAS_PW
  }@rhppartner-khusi.mongodb.net/test?retryWrites=true`,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
mongoose.set('useFindAndModify', false)

const app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(CONFIG.JWT_SECRET))
app.use('/api/v1', API)

app.get('/', (req, res) => res.send('Server api running: + ' + req.ip))

module.exports = app
