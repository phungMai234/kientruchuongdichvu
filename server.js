const fs = require('fs');
let express = require("express");
let app = express();
app.use(express.static(__dirname+ "/public"));
let server = require("http").Server(app);
let io = require("socket.io").listen(server);

server.listen(3000);
const DATA = [
    {
        username:"mai",
        identify:"17020875",
        email:"abc@gmail.com",
        classId:"CD",
        birth:"23-04-1999"
    },
    {
        username:"quan",
        identify:"17020984",
        email:"abc@gmail.com",
        classId:"CD",
        birth:"23-04-1999"
    },
    {
        username:"nga",
        identify:"17020000",
        email:"abc@gmail.com",
        classId:"CD",
        birth:"23-04-1999"
    }
]
console.log("Server - Waiting connection at port: 3000");
let roles = {
    sender  : "",
    receiver : ""
};
io.sockets.on('connection', function (socket) {
    socket.on('setRole', function (data) {
        socket.role = data.trim();
        roles[socket.role] = socket.id;
        console.log("Role "+ socket.role + " is connected.");
    });

    socket.on("sendId", function(data){
        const res = DATA.find(e => e.identify === data);
        io.to(roles.receiver).emit("receiveUserInfo", res);
    });

    socket.on('disconnect', function() {
        console.log("Role " + socket.role + " is disconnect.");
    });
});
