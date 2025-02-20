import { createHash } from 'crypto'

class StoreBrand {
  public static readonly YONEX = 'Yonex'
  public static readonly LINING = 'Li-Ning'
}

class Store {
  public readonly equalityHash: string 

  constructor(
    public readonly brand: string,
    public readonly name: string,
    public readonly address: string,
    public readonly contact: string,
  ) {
    this.equalityHash = createHash('sha256').update(`${this.brand}-${this.name}-${this.address}-${this.contact}`).digest('hex')
  }

  static yonex(name: string, address: string, contact: string): Store {
    return new Store(StoreBrand.YONEX, name, address, contact)
  }

  static lining(name: string, address: string, contact: string): Store {
    return new Store(StoreBrand.LINING, name, address, contact)
  }
}

export { Store }
