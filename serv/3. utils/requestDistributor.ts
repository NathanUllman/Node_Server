import { EndPoint } from "../1. models/EndPoint";

export class RequestDistributor {
  _endpoints: EndPoint[];

  constructor(env: string, pathsFileLocation: string) {
    try {
      this._endpoints = require(pathsFileLocation)[env].map(
        (object: Object) => {
          let response = new EndPoint();
          response.html = object["html"];
          response.method = object["method"];
          response.script = object["script"];
          response.style = object["style"];
          response.url = object["url"];
          return response;
        }
      );
    } catch (e) {
      console.error(
        "An Error has occured while retrieving the paths.json file",
        e
      );
      throw e;
    }
  }

  addResourceEndpoints(path: EndPoint) {
    this._endpoints.push(path);
  }
  getEndPoint(url: string, method: string): EndPoint {
    //grab paths from json based on env

    // find the correct path
    let ep = this._endpoints;

    for (let i = 0; i < ep.length; i++) {
      if (url == ep[i].url && method == ep[i].method) {
        return ep[i];
      }
    }

    console.warn("Endpoint not found: " + url + " " + method);
    return null;
  }
}

// function getPipelineFromFileName(fileName: string): IPipeline {
//   try {
//     const pipeline = require("./PipeLines/" + fileName); //TODO: use better file paths or put in config
//     return new pipeline();
//   } catch (e) {
//     console.error("Pipeline File Not found: " + fileName, e);
//   }
//   return null;
// }
