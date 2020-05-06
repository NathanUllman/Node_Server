import { IApiResponse, ResponseFileTypes } from "./IApiResponse";
import { ServerResponse } from "http";
import { readFileSync } from "fs";

export class FileContentResponse implements IApiResponse {
  _fileName: string;
  _fileType: ResponseFileTypes;

  constructor(fileName: string, filetype: ResponseFileTypes) {
    this._fileName = fileName;
    this._fileType = filetype;
  }

  respond(res: ServerResponse) {
    let path = require("path");
    switch (this._fileType) {
      case ResponseFileTypes.CSS:
        //res.writeHead(200, { "Content-Type": "text/css" });
        //res.write(readFileSync(__dirname this._fileName));
        break;

      case ResponseFileTypes.JS:
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.write(
          readFileSync(path.resolve(__dirname, "../../src/" + this._fileName))
        );
        res.end();
        break;

      default:
        console.warn("File Type not recognized for file type response");
    }
    return null;
  }
}
