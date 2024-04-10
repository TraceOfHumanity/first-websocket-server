import { useRef } from "react";

export const useConnectToDB = () => {
  const socket = useRef();

  const connectToDB = async (username, email, uid) => {
    socket.current = new WebSocket("ws://localhost:4444");
    socket.current.onopen = () => {
      const user = {
        type: "registration",
        username,
        email,
        uid,
      };
      socket.current.send(JSON.stringify(user));
      console.log("підключення встановлено");
    };
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
  };

  return { connectToDB };
};
