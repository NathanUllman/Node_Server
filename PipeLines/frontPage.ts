import { IPipeline } from "./pipeLines";

export class FrontPage_PL implements IPipeline {
  render() {
    return "welcome to the front Page";
  }
}

module.exports = FrontPage_PL;
