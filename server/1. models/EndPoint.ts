import { IApiResponse, ResponseFileTypes } from "./IApiResponse";
import { PageResponse } from "./PageResponse";
import { FileContentResponse } from "./FileContentRespose";

export const JsResource = "/js/";
export const CsResource = "/cs/";

export class EndPoint {
  url: string;
  method: string;
  html: string;
  script: string;
  style: string;

  createResponse(): IApiResponse {
    if (this.url === "/favicon.ico") return null;

    // js file response
    if (this.url.substr(0, JsResource.length) === JsResource) {
      console.log("JS :" + this.url);
      return new FileContentResponse(this.script, ResponseFileTypes.JS);
    }

    //CS File response
    if (this.url.substr(0, CsResource.length) === CsResource) {
      console.log("CS :" + this.url);
      return new FileContentResponse(this.style, ResponseFileTypes.CSS);
    }

    // Page Response
    if (this.html && this.script)
      return new PageResponse(this.html, this.script, this.style);

    console.warn("Response Unable to be constructed from Endpoint: ");
  }
}
