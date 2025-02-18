import { Parser } from "../component"
import { ComponentContainer } from "./ComponentContainer"

class ParserContainer extends ComponentContainer<RegExp, Parser<unknown>, URL> {
  constructor() {
    super('parser')
  }

  tryGet(query: URL): Parser<unknown> | undefined {
    for (const [pattern, parser] of this.components) {
      if (pattern.test(query.toString())) {
        return parser
      }
    }
  }
}

export { ParserContainer}