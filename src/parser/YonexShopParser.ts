import { JSDOM } from "jsdom"
import { Parser } from "../component"
import { YonexShop } from "../dto"

class YonexShopParser implements Parser<YonexShop> {
  parse(html: string): YonexShop[] {
    const shops: YonexShop[] = []

    new JSDOM(html).window.document.querySelectorAll('dl.storeInfo').forEach((storeInfoElement) => {
      const shop = this.parseShop(storeInfoElement)
      shops.push(shop)
    })

    return shops
  }

  private parseShop(element: Element): YonexShop {
    const name = element.querySelector('dt')?.textContent || null
    const address = element.querySelector('dd > p:nth-child(2)')?.textContent || null
    const contact = element.querySelector('dd > p:nth-child(3)')?.textContent || null
    
    if (!name || !address || !contact) {
      throw new Error('Yonex: Shop data not found')
    }

    return new YonexShop(name, address, contact)
  }
}

export { YonexShopParser }
