import { Fetcher, Parser, Storage } from "../component"

class Crawler<T> {
  constructor(
    private fetcher: Fetcher,
    private parser: Parser<T>,
    private storage: Storage<T>,
  ) {}

  async run(url: URL) {
    const html = await this.fetcher.fetch(url)
    const stores = this.parser.parse(html)
    await this.storage.save(stores)
  }
}

export { Crawler }
