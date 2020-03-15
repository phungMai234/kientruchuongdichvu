let express = require("express");
let DATA = require('./config/data')

let app = express();
app.use(express.static(__dirname+ "/public"));
let server = require("http").Server(app);
let io = require("socket.io").listen(server);

server.listen(3000);

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
        res ? io.to(roles.receiver).emit("receiveUserInfo", res)
        : io.to(roles.receiver).emit("receiveUserInfo", null);
    });

    socket.on('disconnect', function() {
        console.log("Role " + socket.role + " is disconnect.");
    });
});
