import { IPipeline } from "./pipeLines";

export class InfoPage_PL implements IPipeline {
  render() {
    return "welcome to the INFO Page";
  }
}

module.exports = InfoPage_PL;
