import { JsResource, CsResource } from "../1. models/EndPoint";

export function buildPage(html: string) {
  return new HtmlConstructor(html);
}

class HtmlConstructor {
  htmlContent: string;
  jsTags: string[] = [];
  CsTags: string[] = [];
  constructor(html: string) {
    this.htmlContent = html;
  }

  addJsFile(fileName: string) {
    this.jsTags.push('<script src="' + JsResource + fileName + '" ></script>');
    return this;
  }

  addCsFile(fileName: string) {
    this.CsTags.push(
      '<link rel="stylesheet" type="text/css" href="' +
        CsResource +
        fileName +
        '">'
    );
    return this;
  }

  finish() {
    return (
      "<head>" +
      this.CsTags.join("\n") +
      "</head>" +
      "<body>" +
      this.htmlContent +
      this.jsTags.join("\n") +
      "</body>"
    );
  }
}
