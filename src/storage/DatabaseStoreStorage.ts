import { PrismaClient } from "@prisma/client"
import { Store } from "../dto/store"
import { LocationService } from "../application/LocationService"
import { inject, injectable } from "inversify"
import { NaverLocationService } from "../application/NaverLocationService"
import { Storage } from "../component"

@injectable()
class DatabaseStoreStorage implements Storage<Store> {
  constructor(
    @inject(PrismaClient) private prisma: PrismaClient, 
    @inject(NaverLocationService) private locationService: LocationService
  ) {}
  async save(storeOrUnknownList: Store[]) {
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
    const rows = await Promise.all(newStores.map((store) => this.storeToRow(store)))

    await this.prisma.stores.createMany({ data: rows })
  }

  private async storeToRow(store: Store) {
    const coordinate = await this.locationService.getCoordinate(store.address)

    return {
      brand: store.brand,
      name: store.name,
      address: store.address,
      contact: store.contact,
      equalityHash: store.equalityHash,
      latitude: coordinate?.latitude,
      longitude: coordinate?.longitude,
    }
  }
}

export { DatabaseStoreStorage }
