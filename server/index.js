const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const http = require('http');

const CONFIG = require('./src/configs/configs')
const API = require('./src/routes')
const passportConfig = require('./src/helpers/service/passport.service')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server);
const chatSocket = require('./src/controllers/message.controller')

//Define Port
const port = CONFIG.PORT;
app.set('port', port);



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
  res.render('index')
})

//create a server listen for socket
// io.on('connection', client => {
//   console.log(`A user is connected with id = [${client.id}]`)
//   client.on('event', data => { console.log('Event running!') });
//   client.on('disconnect', () => { console.log('Client disconnected!') });
// });
io.on('connection', chatSocket.create);
io.on('connection',t => {
  console.log(`A user is connected with id = [${t.id}]`)
});

//listen a port
server.listen(port, () => {
  console.log(`Api server running on localhost:${port}`)
});

module.exports = app
