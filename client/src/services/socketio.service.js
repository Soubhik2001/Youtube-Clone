import { io } from "socket.io-client";

class SocketioService {
  socket;

  constructor() {
  }

  setupSocketConnection() {
    const token = localStorage.getItem("token");
    this.socket = io("http://localhost:3000");
    this.socket.emit('auth',token)
  }
  getSocket() {
    return this.socket;
  }
}

export default new SocketioService();
