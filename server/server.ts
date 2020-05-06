import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFileSync, readSync } from "fs";
import { RequestDistributor } from "./3. utils/requestDistributor";
import { buildPage } from "./3. utils/pageConstructor";
import { EndPoint } from "./1. models/EndPoint";
import { IApiResponse } from "./1. models/IApiResponse";
import { WebsiteEndpoints } from "./WebsiteEndpoints";

//server sent events

export class NateServer {
  endPoints: WebsiteEndpoints;

  constructor(srcLocation: string) {
    this.endPoints = new WebsiteEndpoints(srcLocation); // populate all endpoints
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
    let response: IApiResponse;

    this.logRequest(req);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("It Works!");
    res.end();

    // this.logRequest(req);
    // get the path for the given request
    // let endPoint: EndPoint = this.distributor.getEndPoint(req.url, req.method);
    // if (!endPoint) return;
    // let apiResponse: IApiResponse = endPoint.createResponse();
    // if (!apiResponse) return;
    // let newResourceEndpoints = apiResponse.respond(res);
    // // add any new endpoint for the page // (todo: probably don't need this)
    // if (newResourceEndpoints && newResourceEndpoints.length > 0)
    //   newResourceEndpoints.forEach((elem) =>
    //     this.distributor.addResourceEndpoints(elem)
    //   );
  };

  createWebite = (port: number) => {
    createServer(this.onRequest).listen(port); //the server object listens on port 8080
  };
}