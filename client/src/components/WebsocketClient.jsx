import React, { useRef, useState } from "react";

export const WebsocketClient = () => {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const socket = useRef();

  const connection = () => {
    socket.current = new WebSocket("ws://localhost:4444");
    socket.current.onopen = () => {
      setConnected(true);
      const user = {
        username,
        email,
      };
      socket.current.send(JSON.stringify(user));
      console.log("підключення встановлено");
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
    };
    socket.current.onclose = () => console.log("підключення закрито");
    socket.current.onerror = () => console.log("помилка підключення");
  };

  if (!connected) {
    return (
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введіть ваше імʼя"
        />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введіть ваш email" />
        <button
          onClick={() => {
            connection();
          }}
        >
          Connect
        </button>
      </div>
    );
  }

  return <div>WebsocketClient</div>;
};
