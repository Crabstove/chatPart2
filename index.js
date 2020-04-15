//const app = require('express')();
let express = require("express");
(path = require("path")),
  (mongoose = require("mongoose")),
  (bodyParser = require("body-parser")),
  (dataBaseConfig = require("./db"));
const cors = require("cors");
var session = require('client-sessions');

mongoose.Promise = global.Promise;
mongoose
  .connect(dataBaseConfig.db, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database connected!");
    },
    error => {
      console.log("Could not be connected to database : " + error);
    }
  );

  const historyRoute = require("./routes/history.route");
  const eventlogRoute = require("./routes/eventlog.route");
  const roomHistoryRoute = require("./routes/roomhistory.route");
  const adminRoute = require("./routes/adminRoute.route");
  const app = express();
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(cors());
  app.use("/api/history", historyRoute);
  app.use("/api/eventlog", eventlogRoute);
  app.use("/api/roomhistory", roomHistoryRoute);
  app.use("/admin", adminRoute);
  
  
//set the template engine to ejs
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));

//session
app.use(session({
  cookieName: 'session',
  secret: 'gh349f0nwenn',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

//listen on port 3000
server = app.listen(3000);

//initilize socket io
var io = require("socket.io").listen(server);

//for each connection
io.on("connection", socket => {
  console.log("New user connected");


  var chatusername = "Anon";
  var chatroomname = "room1";

  socket.emit("connection");
  io.emit("new_announcement", {
    username: chatusername,
    room: chatroomname,
    message: " has joined!"
    });

    socket.on("left_room", data => {
        io.emit("new_announcement", {
            username: data.username,
            room: data.room,
            message: " has left the room"
            });

        io.emit("new_announcement", {
                username: data.username,
                room: data.newroom,
                message: " has joined the room!"
                });
    });


  socket.on("new_message", data => {
    console.log("New message from");
    io.emit("new_message", {
      message: data.message,
      username: data.username,
      room: data.room
    });
    io.emit("typer_done", {room: data.room})
  });

  socket.on("typing", data => {
    //when a user is typing
    io.emit("typer", {
      username: data.username,
      room: data.room
    });
  });

  socket.on("disconnect", reason => {
    console.log("New disconnect");
    io.emit("disconnect", {username: chatusername, room: chatroomname});
  });
});

