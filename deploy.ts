import { NateServer } from "./webServer/webServer";

// npx ts-node main.ts
const srcFileLocation = "C:/Users/Nathan/Desktop/server/website/src";

const serv: NateServer = new NateServer(srcFileLocation);

console.log("Creating Server at localhost:8080");
serv.createWebite(8080);

/* 
todo:
    Image response should handle more than icons
    allow partial pages (combine different html files into one page)
    pull 'figure out response type' logic to own class
    controller functions cannot differentiate from method types (GET, POST, etc)


*/
