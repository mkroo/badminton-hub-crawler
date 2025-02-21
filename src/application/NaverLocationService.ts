import { inject, injectable } from "inversify"
import { Coordinate } from "../dto/coordinate"
import { LocationService } from "./LocationService"
import { NaverCloudPlatform } from "./naverCloudPlatform"
import { NaverCloudPlatformConfig } from "../config/ncp"

@injectable()
class NaverLocationService implements LocationService {
  constructor(
    @inject(NaverCloudPlatformConfig) private config: NaverCloudPlatformConfig,
  ) {}

  async getCoordinate(query: string): Promise<Coordinate | null> {
    const res = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}`, {
      headers: {
        'x-ncp-apigw-api-key-id': this.config.clientId,
        'x-ncp-apigw-api-key': this.config.clientSecret,
        'Accept': 'application/json',
      }
    })

    return res.json().then((json: NaverCloudPlatform.GeocodeApiResponse) => {
      const [address] = json.addresses

      if (!address) return null

      return new Coordinate(parseFloat(address.y), parseFloat(address.x))
    })
  }
}

export { NaverLocationService }