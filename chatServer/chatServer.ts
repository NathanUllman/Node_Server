import { IncomingMessage, ServerResponse, createServer, Server } from "http";
import WebSocketServer from "websocket/lib/WebSocketServer";

// in progress, not anywhere close to being done
export class ChatServer {
  serv: Server;
  onRequest = (req: IncomingMessage, res: ServerResponse) => {
    const server = createServer();
    server.listen(9898);
    const wsServer = new WebSocketServer({
      httpServer: server,
    });
    wsServer.on("request", function (request) {
      const connection = request.accept(null, request.origin);
      connection.on("message", function (message) {
        console.log("Received Message:", message.utf8Data);
        connection.sendUTF("Hi this is WebSocket server!");
      });
      connection.on("close", function (reasonCode, description) {
        console.log("Client has disconnected.");
      });
    });
    return;
  };

  createWebite = (port: number) => {
    this.serv = createServer(this.onRequest);
    this.serv.listen(port); //the server object listens on port 8080
  };
}
