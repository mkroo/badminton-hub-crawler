import { UrlFrontier } from "./component";
import { fetcherContainer, parserContainer } from "./provider";

class TempUrlFrontier implements UrlFrontier {
  private fixtedUrls: URL[]

  constructor() {
    this.fixtedUrls = [
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=1&s_itemDiv=1'),
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=2&s_itemDiv=1'),
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=3&s_itemDiv=1'),
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=4&s_itemDiv=1'),
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=5&s_itemDiv=1'),
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=6&s_itemDiv=1'),
      new URL('https://www.yonexmall.com/m2/proc/store.php?p=7&s_itemDiv=1'),
      new URL('https://www.liningkorea.com/bbs/board.php?bo_table=map&page=1'),
      new URL('https://www.liningkorea.com/bbs/board.php?bo_table=map&page=2'),
      new URL('https://www.liningkorea.com/bbs/board.php?bo_table=map&page=3'),
    ]
  }
  
  [Symbol.iterator](): Iterator<URL> {
    return this.fixtedUrls[Symbol.iterator]()
  }
}

for (const url of new TempUrlFrontier()) {
  const fetcher = fetcherContainer.get(url)
  const parser = parserContainer.get(url)

  fetcher.fetch(url).then((html) => parser.parse(html)).then(console.log)
}
