import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";
import { RequestDistributor } from "./3. utils/requestDistributor";
import { buildPage } from "./3. utils/pageConstructor";
import { EndPoint } from "./1. models/EndPoint";
import { IApiResponse } from "./1. models/IApiResponse";

//server sent events

export class NateServer {
  distributor: RequestDistributor;

  constructor(env: "dev" | "prod", pathsFileLocation: string) {
    this.distributor = new RequestDistributor(env, pathsFileLocation);
  }

  logRequest = (req: IncomingMessage) => {
    console.log("---INCOMING REQUEST--------------------");
    console.log(req.method);
    console.log(req.url);
    console.log(req.statusCode);
    console.log(req.statusMessage);
    console.log("--------------------------------------");
    console.log("");
  };

  onRequest = (req: IncomingMessage, res: ServerResponse) => {
    // this.logRequest(req);

    // get the path for the given request
    let endPoint: EndPoint = this.distributor.getEndPoint(req.url, req.method);
    if (!endPoint) return;

    let apiResponse: IApiResponse = endPoint.createResponse();
    if (!apiResponse) return;
    let newResourceEndpoints = apiResponse.respond(res);

    // add any new endpoint for the page // (todo: probably don't need this)
    if (newResourceEndpoints && newResourceEndpoints.length > 0)
      newResourceEndpoints.forEach((elem) =>
        this.distributor.addResourceEndpoints(elem)
      );
  };

  createWebite = (port: number) => {
    createServer(this.onRequest).listen(port); //the server object listens on port 8080
  };
}
