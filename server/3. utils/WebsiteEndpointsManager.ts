import { readdirSync, Dirent, readFileSync } from "fs";
import { parse, resolve } from "path";
import { ServerResponse, IncomingHttpHeaders } from "http";
import {
  IEndPointResponse,
  FileContentResponse,
  ImageResponse,
  JsFunctionResponse,
  EventStreamResponse,
} from "../1. models/EndpointRespones";
import {
  loadFileEndPoints,
  keyWithoutExtension,
  keyWithExtension,
} from "./LoadFileEndpoints";
import { pathToFileURL } from "url";
import { serverSideEvent } from "../../website/controllers/fancyController";

export class EndPointsManager {
  htmlEndPoints: Map<string, string> = new Map();
  jsEndPoints: Map<string, string> = new Map();
  cssEndPoints: Map<string, string> = new Map();
  imageEndPoints: Map<string, string> = new Map();
  controllerEndPoints: Map<string, string> = new Map();

  constructor(srcLocation: string) {
    this.htmlEndPoints = loadFileEndPoints(
      srcLocation + "/pages",
      keyWithoutExtension
    );

    this.jsEndPoints = loadFileEndPoints(
      srcLocation + "/scripts",
      keyWithExtension
    );

    this.cssEndPoints = loadFileEndPoints(
      srcLocation + "/styles",
      keyWithExtension
    );

    this.imageEndPoints = loadFileEndPoints(
      srcLocation + "/images",
      keyWithExtension
    );

    this.controllerEndPoints = loadFileEndPoints(
      resolve(srcLocation, "../controllers"),
      (url: string, dir: Dirent) => "/controller" + url + parse(dir.name).name
    );
  }

  getResponse(
    url: string,
    method: string,
    headers: IncomingHttpHeaders
  ): IEndPointResponse {
    if (headers.accept.includes("text/event-stream")) {
      let functionName = url.split("/").pop();
      let key = url.slice(0, url.length - functionName.length - 1); // remove the function name from url
      return new EventStreamResponse(
        this.controllerEndPoints[key],
        functionName
      );
    }

    //Controller Requests
    if (url.indexOf("/controller/") === 0) {
      //  format: /controllers/....url..../functionName
      let functionName = url.split("/").pop();
      let key = url.slice(0, url.length - functionName.length - 1); // remove the function name from url
      return new JsFunctionResponse(
        this.controllerEndPoints[key],
        functionName
      );
    }

    if (method === "GET") {
      // Html
      if (
        headers["sec-fetch-dest"] === "document" ||
        headers.accept.includes("text/html")
      ) {
        // create new respose with file's location and response type
        return new FileContentResponse(this.htmlEndPoints[url], "text/html");
      }

      // Javascript
      if (headers["sec-fetch-dest"] === "script")
        return new FileContentResponse(
          this.jsEndPoints[url],
          "text/javascript"
        );

      // CSS
      if (headers["sec-fetch-dest"] === "style")
        return new FileContentResponse(this.cssEndPoints[url], "text/css");

      // Images
      if (
        headers["sec-fetch-dest"] === "image" ||
        headers.accept.includes("image/*")
      )
        return new ImageResponse(this.imageEndPoints[url]);
    } else if (method === "POST") {
      // Post Requests for controller functions
      console.log("POST not implemented yet.");
    }
    console.error("Endpoint not found: ");
    console.log({ url, method, headers });
  }
}
