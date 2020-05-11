import { createServer, IncomingMessage, ServerResponse, Server } from "http";
import { EndPointsManager } from "./3. utils/WebsiteEndpointsManager";
import { IEndPointResponse } from "./1. models/EndpointRespones";

//server sent events

export class NateServer {
  endPointsManager: EndPointsManager;
  serv: Server;

  constructor(srcLocation: string) {
    this.endPointsManager = new EndPointsManager(srcLocation); // populate all endpoints
  }

  logRequest = (req: IncomingMessage) => {
    console.log("---INCOMING REQUEST--------------------");
    console.log(req.method);
    console.log(req.url);
    console.log(req.statusCode);
    console.log(req.statusMessage);
    console.log(req.headers);
    console.log("--------------------------------------");
    console.log("");
  };

  onRequest = (req: IncomingMessage, res: ServerResponse) => {
    //this.logRequest(req);

    if (req.headers.upgrade === "websocket") {
      // const http = require("http");
      // const WebSocketServer = require("websocket").server;
      // const server = http.createServer();
      // server.listen(9898);
      // const wsServer = new WebSocketServer({
      //   httpServer: server,
      // });
      // wsServer.on("request", function (request) {
      //   const connection = request.accept(null, request.origin);
      //   connection.on("message", function (message) {
      //     console.log("Received Message:", message.utf8Data);
      //     connection.sendUTF("Hi this is WebSocket server!");
      //   });
      //   connection.on("close", function (reasonCode, description) {
      //     console.log("Client has disconnected.");
      //   });
      // });
      // return;
    }

    let response: IEndPointResponse = this.endPointsManager.getResponse(
      req.url === "/" ? "/index" : req.url, // empty url is default to index for some reason :P
      req.method,
      req.headers
    );

    response.execute(res);
  };

  createWebite = (port: number) => {
    this.serv = createServer(this.onRequest);
    this.serv.listen(port); //the server object listens on port 8080
  };
}
