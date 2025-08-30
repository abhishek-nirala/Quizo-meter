import { createServer } from "http";
import { Server } from "socket.io";
import RoomManager from "./managers/RoomManager";
import { AdminManager } from "./managers/AdminManager";
import { UserManager } from "./managers/UserManager";

const server = createServer();
const io = new Server(server);

const roomManager = new RoomManager()
const adminManager = new AdminManager(roomManager)
const userManager = new UserManager(roomManager)

io.on("connection", (socket) => {
  socket.on('event',data => {
    console.log(data);
    const type = data.type;
  })
  socket.on('disconnect', ()=>{

  })
});

io.listen(3000);