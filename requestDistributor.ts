import { IPipeline } from "./PipeLines/pipeLines";
import { Path } from "./Models/path";

export class RequestDistributor {
  getPipeline(
    url: string,
    method: string,
    env: string,
    pathsFileLocation: string
  ): IPipeline {
    let paths: Path[];

    //grab paths from json based on env
    try {
      paths = require(pathsFileLocation)[env];
    } catch (e) {
      console.error(
        "An Error has occured while retrieving the paths.json file",
        e
      );
      return null;
    }

    // find the correct path
    for (let i = 0; i < paths.length; i++) {
      if (url == paths[i].url && method == paths[i].method) {
        return getPipelineFromFileName(paths[i].file);
      }
    }

    console.warn("Path not found: " + url + " " + method);
    return null;
  }
}

function getPipelineFromFileName(fileName: string): IPipeline {
  try {
    const pipeline = require("./PipeLines/" + fileName); //TODO: use better file paths or put in config
    return new pipeline();
  } catch (e) {
    console.error("Pipeline File Not found: " + fileName, e);
  }
  return null;
}
