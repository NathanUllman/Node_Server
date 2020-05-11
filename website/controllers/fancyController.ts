import { ServerResponse } from "http";

// export since I want it exposed to api
export function fancy(res: ServerResponse): string {
  return JSON.stringify("hello there from the FancyController's fancy()");
}

export function serverSideEvent(res: ServerResponse) {
  var id = new Date().toLocaleTimeString();
  setInterval(function () {
    constructSSE(res, id, new Date().toLocaleTimeString());
  }, 5000);

  constructSSE(res, id, new Date().toLocaleTimeString());
}

function constructSSE(res, id, data) {
  res.write("id: " + id + "\n");
  res.write("data: " + data + "\n\n");
}
