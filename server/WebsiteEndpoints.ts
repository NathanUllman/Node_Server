import { readdirSync, Dirent } from "fs";
import { parse } from "path";

export class WebsiteEndpoints {
  htmlEndPoints: IEndPoint[] = [];
  jsEndPoints: IEndPoint[] = [];
  cssEndPoints: IEndPoint[] = [];
  imageEndPoints: IEndPoint[] = [];
  controllerEndPoints: IEndPoint[] = [];

  constructor(srcLocation: string) {
    this.htmlEndPoints = loadHtmlEndPoints(srcLocation + "/pages");
  }
}

function loadHtmlEndPoints(pagesFolderLocation: string): HtmlEndPoint[] {
  let currPath = pagesFolderLocation;
  let dirStack = [{ loc: pagesFolderLocation, url: "/" }];
  let result = [];
  let counter = 0;
  while (1) {
    let curr: { loc: string; url: string } = dirStack.pop();
    readdirSync(curr.loc, {
      withFileTypes: true,
    }).forEach((dir: Dirent) => {
      if (dir.isDirectory()) {
        dirStack.push({
          loc: curr.loc + "/" + dir.name,
          url: curr.url + dir.name + "/",
        });
      } else if (dir.isFile) {
        result[curr.url + parse(dir.name).name] = curr.loc + "/" + dir.name;
      }
    });
    console.log(result);
    console.log(dirStack);
    if (dirStack.length < 1) break;
    counter = counter + 1;
  }
  console.log(result);
  return [];
}

interface IEndPoint {}

class HtmlEndPoint implements IEndPoint {
  urlLocation: string;
  constructor(fileLocation: string) {}
}
