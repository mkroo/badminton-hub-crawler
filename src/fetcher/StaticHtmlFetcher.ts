import { JSDOM } from "jsdom"
import iconv from 'iconv-lite'
import { Fetcher } from "../component"

class StaticHtmlFetcher implements Fetcher {
  async fetch(url: URL): Promise<string> {
    const response = await fetch(url.toString())
    const html = await response.arrayBuffer()
    const charset = new JSDOM(html).window.document.characterSet

    return iconv.decode(Buffer.from(html), charset).toString()
  }
}

export { StaticHtmlFetcher }
