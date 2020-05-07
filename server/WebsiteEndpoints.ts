import { readdirSync, Dirent, readFileSync } from "fs";
import { parse } from "path";
import { ServerResponse, IncomingHttpHeaders } from "http";

interface IEndPointResponse {
  execute(res: ServerResponse): void;
}
function NotFound(res: ServerResponse) {
  console.error("File Not Found");
  res.writeHead(404);
  res.end();
}

export class ImageResponse implements IEndPointResponse {
  fileLocation: string;
  constructor(fileLocation: string) {
    this.fileLocation = fileLocation;
  }
  execute(res: ServerResponse) {
    if (!this.fileLocation) NotFound(res);
    res.writeHead(200, { "Content-Type": "image/x-icon" }); // TODO: HANDLE MORE THAN JUST AN ICON
    res.write(readFileSync(this.fileLocation));
    res.end();
  }
}

export class FileContentResponse implements IEndPointResponse {
  fileLocation: string;
  contentType: string;
  constructor(fileLocation: string, contentType: string) {
    this.fileLocation = fileLocation;
    this.contentType = contentType;
  }
  execute(res: ServerResponse) {
    if (!this.fileLocation) NotFound(res);
    res.writeHead(200, { "Content-Type": this.contentType });
    res.write(readFileSync(this.fileLocation));
    res.end();
  }
}

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
  }

  getResponse(
    url: string,
    method: string,
    headers: IncomingHttpHeaders
  ): IEndPointResponse {
    if (method === "GET") {
      // Html
      if (headers["sec-fetch-dest"] === "document") {
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

const keyWithoutExtension = (url: string, dir: Dirent) =>
  url + parse(dir.name).name;

const keyWithExtension = (url: string, dir: Dirent) => url + dir.name;

function loadFileEndPoints(
  pagesFolderLocation: string,
  createKeyForFile: (url: string, dir: Dirent) => string
): Map<string, string> {
  let dirStack = [{ loc: pagesFolderLocation, url: "/" }];
  let result: Map<string, string> = new Map();

  while (1) {
    let curr: { loc: string; url: string } = dirStack.pop(); // get directory off of stack
    readdirSync(curr.loc, {
      withFileTypes: true,
    }).forEach((dir: Dirent) => {
      if (dir.isDirectory()) {
        // if it contains a new sub directory, push that to stack
        dirStack.push({
          loc: curr.loc + "/" + dir.name,
          url: curr.url + dir.name + "/",
        });
      } else if (dir.isFile) {
        //else, add to result hashmap
        result[createKeyForFile(curr.url, dir)] = curr.loc + "/" + dir.name;
      }
    });
    if (dirStack.length < 1) break; // if stack is empty
  }
  return result;
}
