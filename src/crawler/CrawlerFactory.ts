import { Crawler } from "./Crawler";
import { inject, injectable } from "inversify";
import { Fetcher, Parser, Storage } from "../component";
import { StaticHtmlFetcher } from "../fetcher/StaticHtmlFetcher";
import { YonexShopParser } from "../parser/YonexShopParser";
import { DatabaseStoreStorage } from "../storage/DatabaseStoreStorage";
import { Store } from "../dto/store";
import { LiningShopParser } from "../parser/LiningShopParser";

@injectable()
class CrawlerFactory {
  constructor(
    @inject(StaticHtmlFetcher) private staticHtmlFetcher: Fetcher,
    @inject(YonexShopParser) private yonexShopParser: Parser<Store>,
    @inject(LiningShopParser) private liningShopParser: Parser<Store>,
    @inject(DatabaseStoreStorage) private databaseStoreStorage: Storage<Store>,
  ) {}

  async run(url: URL) {
    if (this.isYonexStorePage(url)) {
      return this.yonexCrawler().run(url)
    } else if (this.isLiningStorePage(url)) {
      return this.liningCrawler().run(url)
    } else {
      throw new Error('Unsupported store page')
    }
  }

  private isYonexStorePage(url: URL): boolean {
    const regexp = new RegExp(/https:\/\/www\.yonexmall\.com\/m2\/proc\/store\.php\?(?:p=\d+&s_itemDiv=\d+|s_itemDiv=\d+&p=\d+)/)
    return regexp.test(url.href)
  }

  private isLiningStorePage(url: URL): boolean {
    const regexp = new RegExp(/https:\/\/www\.liningkorea\.com\/bbs\/board\.php\?(?:bo_table=[^&]+&page=\d+|page=\d+&bo_table=[^&]+)/)
    return regexp.test(url.href)
  }
  
  private yonexCrawler(): Crawler<Store> {
    return new Crawler(
      this.staticHtmlFetcher,
      this.yonexShopParser,
      this.databaseStoreStorage,
    )
  }

  private liningCrawler(): Crawler<Store> {
    return new Crawler(
      this.staticHtmlFetcher,
      this.liningShopParser,
      this.databaseStoreStorage,
    )
  }
}

export { CrawlerFactory }
