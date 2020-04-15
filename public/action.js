//declare variables to use throughout the application
var socket;
var currentRoom = $('#room').val();
var chatRoomTitle = $('#roomName');
var messageIn = $('#message');
var username = $('#username').val();
var $chat = $('#messages');

$( document ).ready(function() {
console.log( "ready!" );



//make socket io connnection
socket = io.connect('http://localhost:3000')

socket.on("connection", socket =>{
    const date = getDate();
    const time = getTime();
    var room = currentRoom;
    var type = "CONNECTION";
    let user = username;
    apiRequest({type, user, room, date, time}, "eventlog/add");
    type = "JOINED";
    apiRequest({type, user, room, date, time}, "eventlog/add");    
});



socket.on("new_message", data => {
    if (data.room == currentRoom){
        var $chat = $('#messages');
        $chat.append(
        "<br><b>" + data.username + ":</b> " + data.message
        ); 
    }
});


socket.on("new_announcement", data => {
    if (data.room == currentRoom){
        var $chat = $('#messages');
        $chat.append(
        "<br><b>" + data.username + "" + data.message + "</b>" 
        ); 
    }
});

socket.on("typer", data => {
if (data.room == currentRoom){
var $cont = $('#context');
$cont.html(
"<br><b>" + data.username + " is typing...</b> "
); 
}
});

socket.on("typer_done", data => {
if (data.room == currentRoom){
var $cont = $('#context');
$cont.html(""); 
}
});


$('#message').keypress((e)=>{
if(e.which!=13){
username = $('#username').val();
socket.emit('typing', {username: username, typing:true, room: currentRoom});
}else{
sender()
}
})


socket.on("disconnect", data => {
    if (data.room == currentRoom){
        var $chat = $('#messages');
        $chat.append(
        "<br><b>" + data.username + " has disconnected</b> "
        ); 
        }
    const date = getDate();
    const time = getTime();
    var room = currentRoom;
    var type = "DISCONNECTION";
    let user = username;
    apiRequest({type, user, room, date, time}, "eventlog/add");
});
    

});

const sender = () => { 

var room = currentRoom;
var message = $('#message').val();
var user = username;

socket.emit('new_message', {
message: message,
username: user,
room: room});

const date = getDate();
const time = getTime();

apiRequest({user, date, time, room, message}, "history/add");

$('#message').val("");//clear contents of message box

} 

const changeRoom = () => { 
$chat.html("");

    socket.emit('left_room',
    {username: username,
    room: currentRoom,
    newroom: String($('#room').val())
    });

currentRoom = $('#room').val();
chatRoomTitle.html("Chat Room - " + currentRoom);
const date = getDate();
const time = getTime();
var room = currentRoom;
var type = "ROOM CHANGE";
let user = username;
apiRequest({type, user, room, date, time}, "eventlog/add");
} 




const connect = () => { 
socket.emit('connected');
var $chat = $('#messages');
$chat.append(
"hello"
); 
}  
const disconnect = () => { socket.emit('disconnected')}
const send = () => {
var message = "Hello from the send message button";
socket.emit('message',message);
}

//used to make api requests to save logs to database (I know this is far from ideal)
const apiURL = "http://localhost:3000/api";

function apiRequest(logForm, url) {
    (async () => {
      try {
        const rawResponse = await fetch(`${apiURL}/${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(logForm)
        });
        const content = await rawResponse.json();

        console.log(content);
      } catch (error) {}
    })();
  }

  //functions to get time an date as a string
  function getTime(){
    var date = new Date();
    return date.toLocaleTimeString();
  }


  function getDate(){
    var date = new Date();
    return date.toLocaleDateString();
  }