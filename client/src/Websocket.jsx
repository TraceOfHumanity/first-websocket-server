import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
export const Websocket = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  function connect() {
    socket.current = new WebSocket("ws://localhost:8080");
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("підключення встановлено");
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => console.log("підключення закрито");
    socket.current.onerror = () => console.log("помилка підключення");
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
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
        <button
          onClick={() => {
            connect();
          }}
        >
          Ввійти
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={sendMessage}>Надіслати</button>
      </div>
      <div className="">
        {messages.map((message) => (
          <div className="" key={message.id}>
            {message.event === "connection" ? (
              <div>{message.username} підключився</div>
            ) : (
              <div>
                {message.username}: {message.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
