import { UrlFrontier } from "./component";
import { fetcherContainer, parserContainer } from "./provider";
import { writeFile } from 'fs'

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

Promise.all(
  Array.from(new TempUrlFrontier()).map(async (url) => {
    const fetcher = fetcherContainer.get(url)
    const parser = parserContainer.get(url)
  
    return fetcher.fetch(url).then((html) => parser.parse(html))
  })
)
.then((results) => results.flat())
.then((shops) => {
  writeFile('.out/shops.json', JSON.stringify(shops, null, 2), (err) => {
    if (err) {
      console.error(err)
    }
  })
})