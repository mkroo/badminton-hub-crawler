import { Fetcher } from "../component"
import { ComponentContainer } from "./ComponentContainer"
import { StaticHtmlFetcher } from "../fetcher/StaticHtmlFetcher"

class FetcherContainer extends ComponentContainer<RegExp, Fetcher, URL> {
  private DEFAULT: Fetcher = new StaticHtmlFetcher()

  constructor() {
    super('fetcher')
  }

  tryGet(url: URL): Fetcher | undefined {
    for (const [pattern, fetcher] of this.components) {
      if (pattern.test(url.toString())) {
        return fetcher
      }
    }

    return this.DEFAULT
  }
}

export { FetcherContainer }