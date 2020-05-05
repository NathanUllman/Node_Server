import { createServer, IncomingMessage, ServerResponse } from "http";
import { RequestDistributor } from "./requestDistributor";
import { IPipeline } from "./PipeLines/pipeLines";

export class NateServer {
  distributor: RequestDistributor;

  env: "dev" | "prod";
  pathsFileLocation: string;
  constructor(env: "dev" | "prod", pathsFileLocation: string) {
    this.env = env;
    this.pathsFileLocation = pathsFileLocation;
    this.distributor = new RequestDistributor();
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
    this.logRequest(req);
    let pipeLine: IPipeline = this.distributor.getPipeline(
      req.url,
      req.method,
      this.env,
      this.pathsFileLocation
    );

    if (pipeLine) res.write(pipeLine.render());
    res.end(); //end the response
  };

  createWebite = (port: number) => {
    createServer(this.onRequest).listen(port); //the server object listens on port 8080
  };
}
