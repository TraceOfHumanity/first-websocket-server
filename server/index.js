import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import UserSchema from "./models/user.js";
import jwt from "jsonwebtoken";

dotenv.config();
const wss = new WebSocketServer({ port: process.env.PORT });

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
    wss.on("connection", (ws) => {
      console.log("Client connected");
      ws.on("message", async (message) => {
        message = JSON.parse(message);
        switch (message.type) {
          case "registration":
            const user = await UserSchema.findOne({ email: message.email });
            if (user) {
              ws.send(
                JSON.stringify({
                  type: "error",
                  message: "User with this email already exists",
                })
              );
              return;
            } else {
              const newUser = new UserSchema({
                username: message.username,
                email: message.email,
                uid: message.uid,
              });
              newUser.save();

              const token = jwt.sign({ uid: newUser.uid }, process.env.JWT_SECRET, { expiresIn: "30d" });
              ws.send(
                JSON.stringify({
                  type: "success",
                  message: { newUser, token },
                })
              );
            }
            break;
          case "login":
            console.log("Login:", message);
            break;
        }
      });
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  })
  .catch((err) => {
    console.log("DB error", err);
  });


// const ws = require("ws");

// const wss = new ws.Server({ port: 8080 }, () => console.log("Server started on http://localhost:8080"));

// wss.on("connection", (ws) => {
//   ws.on("message", (message) => {
//     message = JSON.parse(message);
//     switch (message.event) {
//       case "message":
//         broadcast(message);
//         break;
//       case "connection":
//         broadcast(message);
//         break;
//     }
//   });
// });

// function broadcast(data) {
//   wss.clients.forEach((client) => {
//     // if (client.readyState === ws.OPEN) {
//     client.send(JSON.stringify(data));
//     // }
//   });
// }
