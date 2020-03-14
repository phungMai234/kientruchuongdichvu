let socket;
window.onload = function() {

    socket = io.connect();

    socket.emit("setRole","sender");

    document.getElementById('mssv').addEventListener("change", function(){
        submitImg();
    });

};

function submitImg(){
    let mssv = document.getElementById('mssv').value;
    socket.emit("sendId", mssv);
}