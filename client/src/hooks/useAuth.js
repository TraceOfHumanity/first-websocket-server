import { useRef } from "react";

export const useAuth = () => {
  const socket = useRef();
  const signIn = async ( username, email, password ) => {
    socket.current = new WebSocket("ws://localhost:4444");
    socket.current.onopen = () => {
      const user = {
        type: "registration",
        username,
        email,
        password,
      };
      socket.current.send(JSON.stringify(user));
      console.log("підключення встановлено (реєстрація)");
    };
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
  };

  return { signIn };
};
