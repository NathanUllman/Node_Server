import { createServer, Server } from "http";

interface IWebSocket {
  port: number;
}

export class ChatWebSocket implements IWebSocket {
  port: number = 9989;
  serv: Server;

  constructor() {
    this.serv = createServer();
    this.serv.listen(this.port);
  }

  onRequest() {}
  onClose() {}
}
