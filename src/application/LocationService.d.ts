import { Coordinate } from "../dto/coordinate";

interface LocationService {
  getCoordinate(address: string): Promise<Coordinate | null>;
}

export { LocationService }
