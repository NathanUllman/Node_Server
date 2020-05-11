import { Dirent, readdirSync } from "fs";
import { parse } from "path";

export const keyWithoutExtension = (url: string, dir: Dirent) =>
  url + parse(dir.name).name;

export const keyWithExtension = (url: string, dir: Dirent) => url + dir.name;

export function loadFileEndPoints(
  pagesFolderLocation: string,
  createKeyForFile: (url: string, dir: Dirent) => string
): Map<string, string> {
  let dirStack = [{ loc: pagesFolderLocation, url: "/" }];
  let result: Map<string, string> = new Map();

  while (1) {
    let curr: { loc: string; url: string } = dirStack.pop(); // get directory off of stack
    readdirSync(curr.loc, {
      withFileTypes: true,
    }).forEach((dir: Dirent) => {
      if (dir.isDirectory()) {
        // if it contains a new sub directory, push that to stack
        dirStack.push({
          loc: curr.loc + "/" + dir.name,
          url: curr.url + dir.name + "/",
        });
      } else if (dir.isFile) {
        //else, add to result hashmap
        result[createKeyForFile(curr.url, dir)] = curr.loc + "/" + dir.name;
      }
    });
    if (dirStack.length < 1) break; // if stack is empty
  }
  return result;
}
