const express = require("express");
const db = require('./db.js');
const { PORT } = require('./config');
const morgan = require("morgan");
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/users');
const messageRoutes = require("./routes/message");
// const AdminRoute = require('./routes/admin');
const RefreshToken = require('./routes/refresh')
const path = require('path');
const cors = require('cors');
const corsOptions = require('./middleware/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const socket = require('socket.io');


const app = express();
app.set('view engine', 'ejs')

db.connect()
const server = app.listen(PORT, () => {
  console.log(`>> Server Listening on Port ${PORT}...`);
  });

  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  })
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('recieve-msg', data.message);
    }
  })
})

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(morgan('dev'));

// app.use('/api/admin', AdminRoute);
app.use('/api', UserRoute);
app.use('/api/auth', AuthRoute);
app.use("/api/messages", messageRoutes);
app.use('/api/auth', RefreshToken);
