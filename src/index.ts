import { container } from "./config/inversify";
import { CrawlerFactory } from "./crawler/CrawlerFactory";

const urls = [
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

Promise.all(
  urls.map((url) => container.resolve(CrawlerFactory).run(url))
)
