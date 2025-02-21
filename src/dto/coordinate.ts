class Coordinate {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {}

  toGeographyPoint(): string {
    return `POINT(${this.longitude} ${this.latitude})`
  }
}

export { Coordinate }
