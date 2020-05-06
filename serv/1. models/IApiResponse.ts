import { ServerResponse } from "http";
import { EndPoint } from "./EndPoint";

export enum ResponseFileTypes {
  JS = 1,
  CSS = 2,
  HTML = 3,
}

export interface IApiResponse {
  respond(res: ServerResponse): EndPoint[];
}
