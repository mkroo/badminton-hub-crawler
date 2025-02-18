import { JSDOM } from "jsdom"
import { Parser } from "../component";
import { LiningShop } from "../dto";

class LiningShopParser implements Parser<LiningShop> {
  parse(html: string): LiningShop[] {
    const shops: LiningShop[] = []

    new JSDOM(html).window.document.querySelectorAll('div.jtbl_wrap > table > tbody > tr').forEach((storeInfoElement) => {
      const shop = this.parseShop(storeInfoElement)
      shops.push(shop)
    })

    return shops
  }

  private parseShop(element: Element): LiningShop {
    const name = element.querySelector('td:nth-child(2)')?.textContent || null
    const contact = element.querySelector('td:nth-child(3)')?.textContent || null
    const address = element.querySelector('td:nth-child(4) > a')?.textContent || null
    
    if (!name || !address || !contact) {
      throw new Error('Lining: Shop data not found')
    }

    return new LiningShop(name, address, contact)
  }
}

export { LiningShopParser }
