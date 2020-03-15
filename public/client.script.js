let socket;
window.onload = function() {

    socket = io.connect();

    socket.emit("setRole","sender");
    socket.emit("setRole","receiver");

    document.getElementById('mssv').addEventListener("change", function(){
        let mssv = document.getElementById('mssv').value;
        socket.emit("sendId", mssv);
    });

    socket.on('receiveUserInfo', function(data) {
        if (data) {
            document.getElementById('root').innerText = '';
            document.getElementById("username").innerText = data.username;
            document.getElementById("identify").innerText = data.identify;
            document.getElementById("classId").innerText = data.classId;
            document.getElementById("birth").innerText = data.birth;
            document.getElementById("email").innerText = data.email;
        } else
        {
            document.getElementById('root').innerText = 'Không tìm thấy sinh viên nào phù hợp!'
            document.getElementById("username").innerText = "";
            document.getElementById("identify").innerText = "";
            document.getElementById("classId").innerText = "";
            document.getElementById("birth").innerText = "";
            document.getElementById("email").innerText = "";
    }

    });
};