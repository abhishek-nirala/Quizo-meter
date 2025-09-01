// import { createServer } from "http";
// import { Server } from "socket.io";
// import RoomManager from "./managers/RoomManager";
// import { AdminManager } from "./managers/AdminManager";
// import { UserManager } from "./managers/UserManager";
// import express from 'express';
// import path from 'path'

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// const roomManager = new RoomManager()
// const adminManager = new AdminManager(roomManager)
// const userManager = new UserManager(roomManager)

// // app.use(express.static(path.join(__dirname, "../../client/index.html")));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/index.html'));
// });

// console.log("after app.use")

// io.on("connection", (socket) => {
//   console.log("a user connected : ", socket.id)
// });

// server.listen(3000, () => {
//   console.log('server running at PORT:3000');
// });





import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import RoomManager from "./managers/RoomManager";
import QuestionsManager from "./managers/QuestionManager";
import { AdminManager } from "./managers/AdminManager";
import { UserManager } from "./managers/UserManager";
import path from 'path'

// Initialize Managers
const roomManager = new RoomManager();
const adminManager = new AdminManager(roomManager);
const userManager = new UserManager(roomManager);

// Express + Socket.io Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

// ---------------------- REST ENDPOINTS ----------------------

// Create a new room
app.post("/create-room", (req: Request, res: Response) => {
  const { time } = req.body;
  if (!time) {
    return res.status(400).json({ error: "Missing time" });
  }
  const adminId = crypto.randomUUID()

  const newRoom = roomManager.createRoom(adminId, time);
  res.status(201).json({success:true, message: "Room created", room: newRoom });
});
// Join a room
app.post("/join-room", (req: Request, res: Response) => {
  const { roomId} = req.body;
  if (!roomId) {
    return res.status(400).json({ error: "Missing roomId" });
  }

  const userId = crypto.randomUUID();

  const user = userManager.joinRoom(roomId, userId);
  if (!user) return res.status(404).json({ error: "Room not found" });

  res.json({ message: "Joined successfully",userId, user });
});

// Add a question
app.post("/add-question", (req: Request, res: Response) => {
  const { quesNo, title, ans, option } = req.body;

  if ( !title || !ans || !option) {
    return res.status(400).json({ error: "Missing question details" });
  }

  const questionManager = new QuestionsManager();
  const question = questionManager.createQuestion(
    quesNo,
    title,
    ans,
    option
  );

  res.status(201).json({ message: "Question added", question });
});

// Submit answer
app.post("/submit-answer", (req: Request, res: Response) => {
  const { roomId, userId, correctAnswerOfThisQuestion, selectedAnswer } = req.body;

  if (!roomId || !userId || !selectedAnswer || !correctAnswerOfThisQuestion) {
    return res.status(400).json({ error: "Missing answer details" });
  }

  // Assuming submitAnswer is in UserManager or RoomManager
  const updatedUser = userManager.submitAnswer(
    roomId,
    userId,
    correctAnswerOfThisQuestion,
    selectedAnswer
  );

  if (!updatedUser) return res.status(404).json({ error: "Room or user not found" });

  res.json({ message: "Answer submitted", updatedUser });
});

// Get all questions for a room
app.get("/questions/:roomId", (req: Request, res: Response) => {
  const { roomId } = req.params;
  const questionManager = new QuestionsManager();
  const questions = questionManager.getQuestions();

  if (!questions) return res.status(404).json({ error: "No questions found" });
  res.json({ questions });
});

// ---------------------- SOCKET.IO EVENTS ----------------------

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room socket.io channel
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
    io.to(roomId).emit("userJoined", { userId });
  });

  // Send new question
  socket.on("newQuestion", ({ roomId, question }) => {
    io.to(roomId).emit("receiveQuestion", question);
  });

  // Send answer
  socket.on("submitAnswer", ({ roomId, userId, answer }) => {
    io.to(roomId).emit("answerSubmitted", { userId, answer });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// ---------------------- START SERVER ----------------------

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
