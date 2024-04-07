const ws = require("ws");

const wss = new ws.Server({ port: 8080 }, () => console.log("Server started on http://localhost:8080"));

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcast(message);
        break;
      case "connection":
        broadcast(message);
        break;
    }
  });
});

function broadcast(data) {
  wss.clients.forEach((client) => {
    // if (client.readyState === ws.OPEN) {
    client.send(JSON.stringify(data));
    // }
  });
}
