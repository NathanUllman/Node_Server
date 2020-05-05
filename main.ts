import { NateServer } from "./server";

const env = "dev";
const pathsFile = "./paths.json";

const serv: NateServer = new NateServer(env, pathsFile);

console.log("Creating Server at localhost:8080");
serv.createWebite(8080);
