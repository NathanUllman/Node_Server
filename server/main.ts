import { NateServer } from "./server";
//https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
// npx ts-node main.ts
//const env = "dev";
const srcFileLocation = "C:/Users/Nathan/Desktop/server/website/src";

const serv: NateServer = new NateServer(srcFileLocation);

console.log("Creating Server at localhost:8080");
serv.createWebite(8080);

// todo: /favicon.ico
// todo : all js files could be added to endpoints before hand
// todo: src folder structure should mimic the pages of the website
