import { createServer, IncomingMessage, ServerResponse } from "http";
import { EndPointsManager } from "./3. utils/WebsiteEndpointsManager";
import { IEndPointResponse } from "./1. models/EndpointRespones";

//server sent events

export class NateServer {
  endPointsManager: EndPointsManager;

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

    let response: IEndPointResponse = this.endPointsManager.getResponse(
      req.url === "/" ? "/index" : req.url, // empty url is default to index for some reason :P
      req.method,
      req.headers
    );

    response.execute(res);
  };

  createWebite = (port: number) => {
    createServer(this.onRequest).listen(port); //the server object listens on port 8080
  };
}
