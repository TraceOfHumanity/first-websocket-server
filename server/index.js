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
        const user = await UserSchema.findOne({ email: message.email });

        if (!user) {
          const newUser = new UserSchema({
            username: message.username,
            email: message.email,
            uid: message.uid,
          });
          newUser.save();
          ws.send(
            JSON.stringify({
              type: "success",
              message: "User registered successfully",
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              type: "success",
              message: "User logged in successfully",
            })
          );
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
