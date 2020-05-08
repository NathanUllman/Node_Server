import { ServerResponse } from "http";
import { readFileSync } from "fs";

export interface IEndPointResponse {
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

export class JsFunctionResponse implements IEndPointResponse {
  fileLocation: string;
  functionName: string;
  constructor(fileLocation: string, functionName: string) {
    this.fileLocation = fileLocation;
    this.functionName = functionName;
  }

  execute(res: ServerResponse) {
    if (!this.fileLocation) NotFound(res);

    // execute an exported function in fileLocation based on the function's name
    let functionResponse = require(this.fileLocation)[this.functionName](res);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(functionResponse);
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
