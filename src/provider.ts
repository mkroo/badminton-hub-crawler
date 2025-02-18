import { FetcherContainer, ParserContainer } from "./container"

import { YonexShopParser, LiningShopParser } from "./parser"

const parserContainer = new ParserContainer()
const fetcherContainer = new FetcherContainer()

parserContainer.bind(
  new RegExp(/https:\/\/www\.yonexmall\.com\/m2\/proc\/store\.php\?(?:p=\d+&s_itemDiv=\d+|s_itemDiv=\d+&p=\d+)/),
  new YonexShopParser()
)
parserContainer.bind(
  new RegExp(/https:\/\/www\.liningkorea\.com\/bbs\/board\.php\?(?:bo_table=[^&]+&page=\d+|page=\d+&bo_table=[^&]+)/),
  new LiningShopParser()
)

export { parserContainer, fetcherContainer }
