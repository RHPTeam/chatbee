const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const CONFIG = require('./src/configs/configs')
const app1 = express()
const fs = require('fs')
const http = require('http')
const https = require('https')

/**
 *  Setup HTTPS SSL
 *  When config vps comment line 18, delete comment line 19-24
 */
const server = http.createServer(app1)
/*const options = {
  pfx: fs.readFileSync(CONFIG.pfx),
  passphrase: CONFIG.passphrase
};
const server = https.createServer(options,app)
*/

const API = require('./src/routes')
const passportConfig = require('./src/helpers/service/passport.service')
const io = require('socket.io')(server);
const chatSocket = require('./src/controllers/message.controller')

//Define Port
const port = CONFIG.PORT1;
app1.set('port', port);



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



app1.set("view engine", "ejs");
app1.set("views", "./src/views/");

app1.use(passport.initialize())
app1.use(passport.session())
app1.use(logger('dev'))
// file image local
app1.use('/uploads', express.static('uploads'))
app1.use(cors())
app1.use(bodyParser.json())
app1.use(bodyParser.urlencoded({ extended: false }))
app1.use(cookieParser(CONFIG.JWT_SECRET))
app1.use('/api/v1', API)

app1.get('/', (req, res) => {
  res.send('server1.js')
})


//listen a port
server.listen(port, () => {
  console.log(`Api server running on localhost:${port}`)
});

module.exports = app1
