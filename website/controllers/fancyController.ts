import { ServerResponse } from "http";

// export since I want it exposed to api
export function fancy(res: ServerResponse): string {
  return JSON.stringify("hello there from the FancyController's fancy()");
}
