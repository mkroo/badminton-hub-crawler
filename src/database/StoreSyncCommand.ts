import { PrismaClient } from "@prisma/client"
import { Store } from "../dto/store"

class StoreSyncCommand {
  constructor(private prisma: PrismaClient) {}

  async run(storeOrUnknownList: unknown[]) {
    const stores = storeOrUnknownList.filter((store) => store instanceof Store)

    const { newStores, existingStores } = await this.filterExistingStores(stores)

    await this.updateExistingStores(existingStores)
    await this.createNewStores(newStores)
  }

  private async filterExistingStores(stores: Store[]): Promise<{ newStores: Store[], existingStores: Store[] }> {
    const rows = await this.prisma.stores.findMany({
      where: { equalityHash: { in: stores.map((it) => it.equalityHash) } }
    })
  
    const equalityHashSet = new Set(rows.map((row) => row.equalityHash))
  
    return stores.reduce((acc, store) => {
      if (equalityHashSet.has(store.equalityHash)) {
        acc.existingStores.push(store)
      } else {
        acc.newStores.push(store)
      }
  
      return acc
    }, { newStores: [], existingStores: [] } as { newStores: Store[], existingStores: Store[] })
  }

  private async updateExistingStores(existingStores: Store[]) {
    await this.prisma.stores.updateMany({ data: { lastUpdatedAt: new Date() }, where: { equalityHash: { in: existingStores.map((it) => it.equalityHash) } } })
  }

  private async createNewStores(newStores: Store[]) {
    await this.prisma.stores.createMany({ data: newStores.map(this.storeToRow) })
  }

  private storeToRow(store: Store) {
    return {
      brand: store.brand,
      name: store.name,
      address: store.address,
      contact: store.contact,
      equalityHash: store.equalityHash,
    }
  }
}

export { StoreSyncCommand }
