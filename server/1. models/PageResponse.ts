import { IApiResponse } from "./IApiResponse";
import { ServerResponse } from "http";
import { buildPage } from "../3. utils/pageConstructor";
import { readFileSync } from "fs";
import { EndPoint } from "./EndPoint";

export class PageResponse implements IApiResponse {
  _html: string;
  _js: string;
  _css: string;

  constructor(hmtlFileName: string, jsFileName: string, cssFileName: string) {
    this._html = hmtlFileName;
    this._js = jsFileName;
    this._css = cssFileName;
  }

  respond(res: ServerResponse) {
    let path = require("path");
    res.writeHead(200, { "Content-Type": "text/html" });
    const page = buildPage(
      readFileSync(
        path.resolve(__dirname, "../../src/" + this._html)
      ).toString()
    )
      .addJsFile(this._js)
      .finish();
    res.write(page);
    res.end();

    let result = new EndPoint();
    result.url = "/js/index.js";
    result.script = "index.js";
    result.method = "GET";

    return [result];
  }
}
