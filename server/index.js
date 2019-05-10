const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const CONFIG = require('./src/configs/configs')
const app = express()
const fs = require('fs')
const http = require('http')
const https = require('https')
const Role = require('./src/models/Role.model')
const Facebook = require('./src/models/Facebook.model')
const process = require('./facebookProcess')

/**
 *  Setup HTTPS SSL
 *  When config vps comment line 18, delete comment line 19-24
 */
const server = http.createServer(app)
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
const port = CONFIG.PORT;
app.set('port', port);


mongoose.connect('mongodb://0.0.0.0:27017/chatv2', {
  useCreateIndex: true,
  useNewUrlParser: true,
})


// mongoose.connect(
//   `mongodb+srv://admin:${
//     CONFIG.MONGODB_ATLAS_PW
//     }@rhppartner-khusi.mongodb.net/test?retryWrites=true`,
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true
//   }
// )

mongoose.set('useFindAndModify', false)

app.set("view engine", "ejs");
app.set("views", "./src/views/");

app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))
// file image local
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use( bodyParser.json( { "limit": "500MB", "extended": true } ) );
app.use( bodyParser.urlencoded( { "limit": "500MB", "extended": true } ) );
app.use(cookieParser(CONFIG.JWT_SECRET))
app.use('/api/v1', API)

app.get('/', (req, res) => {
  res.render('server.js')
})

// Create Role when not have
const roleDefault = async () => {
  const foundRole = await Role.find({})
  if (foundRole.length === undefined || foundRole.length === 0) {
    const arr = [{'level':'SuperAdmin'},{'level':'Admin'}, {'level':'Member'}]
    Role.insertMany(arr)
  }
}
roleDefault()

//listen a port
server.listen(port, () => {
  console.log(`Api server running on localhost:${port}`)
});

// Handle facebook all acc
const handle = async () => {
  const accountFacebookList = await Facebook.find({})
  accountFacebookList.map(e => process(e))
}
handle()

module.exports = app
