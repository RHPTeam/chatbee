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
// const process = require('./process')

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


mongoose.connect('mongodb://localhost:27017/chat-auto', {
  useCreateIndex: true,
  useNewUrlParser: true
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(CONFIG.JWT_SECRET))
app.use('/api/v1', API)

app.get('/', (req, res) => {
  res.render('server.js')
})

//create a server listen for socket
// io.on('connection', client => {
//   console.log(`A user is connected with id = [${client.id}]`)
//   client.on('event', data => { console.log('Event running!') });
//   client.on('disconnect', () => { console.log('Client disconnected!') });
// });
io.on('connection',socket => {
  console.log(`A user is connected with id = [${socket.id}]`)
  socket.on('send', data => chatSocket.create(data)  )
  socket.emit('listen-send', chatSocket.data())
});

//listen a port
server.listen(port, () => {
  console.log(`Api server running on localhost:${port}`)
});

module.exports = app
