let socket;

function connect() {
    let address = document.getElementById("address").value
    let name = document.getElementById("name").value
    socket = new WebSocket("ws://" + address);

    socket.onmessage = (event) => {
        console.log("New data: " + event.data);
        let player = document.getElementById("player");
        player.innerHTML = "";
        let sound = document.createElement('audio');
        sound.id = "audio";
        sound.autoplay = true;
        sound.loop = true;
        sound.src = "audio/" + event.data + '.mp3';
        sound.type = 'audio/mp3';
        player.appendChild(sound);
        changeVol(document.getElementById("volume").value)
    };
    
    socket.onopen = (event) => {
        console.log("Connected.");
        document.getElementById("status").textContent = "Verbonden";
        socket.send(name)
    };

    socket.onerror = (event) => {
        console.log("Error.");
        document.getElementById("status").textContent = "Verbinden mislukt";
    }
}

function changeVol(volume) {
    let sound = document.getElementById("audio");
    sound.volume = volume;
}