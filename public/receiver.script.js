let socket;

window.onload = function(){
    socket = io.connect();
    socket.emit('setRole', 'receiver');
    socket.on('receiveUserInfo', function(data){
        console.log(data)
        document.getElementById("username").innerText = data.username;
        document.getElementById("identify").innerText = data.identify;
        document.getElementById("classId").innerText = data.classId;
        document.getElementById("birth").innerText = data.birth;
        document.getElementById("email").innerText = data.email;

    });
}