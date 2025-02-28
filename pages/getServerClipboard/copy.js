let liveUpdate = false;
let socket = null;

async function fetchClipboard() {
    try {
        const response = await fetch('/getclipboard');
        const data = await response.text();
        document.getElementById("clipboardText").textContent = data || "Clipboard is empty.";
    } catch (err) {
        document.getElementById("clipboardText").textContent = "Failed to fetch clipboard data.";
    }
}

onload = () => {
    fetchClipboard();
}

function copyToClipboard() {
    const text = document.getElementById("clipboardText").textContent;
    navigator.clipboard.writeText(text).then(() => {
    });
}

function toggleLiveUpdate() {
    liveUpdate = document.getElementById("liveUpdateToggle").checked;
    if (liveUpdate) {
        startLiveUpdates();
        document.getElementById("refreshBtn").disabled = true;
    } else {
        stopLiveUpdates();
        alert("Stopped live updates.");
        document.getElementById("refreshBtn").disabled = false;
    }
}

function startLiveUpdates() {
    socket = io();
    socket.on('update', (data) => {
        document.getElementById('clipboardText').textContent = data.message;
    });

}

function stopLiveUpdates() {
    if (socket) {
        socket.disconnect();
        socket = null;
        alert("Stopped live updates.");
    }
}