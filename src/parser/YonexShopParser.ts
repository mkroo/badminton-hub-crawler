import { JSDOM } from "jsdom"
import { Parser } from "../component"
import { Store } from "../dto/store"

class YonexShopParser implements Parser<Store> {
  parse(html: string): Store[] {
    const shops: Store[] = []

    new JSDOM(html).window.document.querySelectorAll('dl.storeInfo').forEach((storeInfoElement) => {
      const shop = this.parseShop(storeInfoElement)
      shops.push(shop)
    })

    return shops
  }

  private parseShop(element: Element): Store {
    const name = element.querySelector('dt')?.textContent || null
    const address = element.querySelector('dd > p:nth-child(2)')?.textContent || null
    const contact = element.querySelector('dd > p:nth-child(3)')?.textContent || null
    
    if (!name || !address || !contact) {
      throw new Error('Yonex: Shop data not found')
    }

    return Store.yonex(name, address, contact)
  }
}

export { YonexShopParser }
