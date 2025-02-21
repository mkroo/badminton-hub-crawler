namespace NaverCloudPlatform {
  export type AddressElementType =
    | 'SIDO'
    | 'SIGUGUN'
    | 'DONGMYUN'
    | 'RI'
    | 'ROAD_NAME'
    | 'BUILDING_NUMBER'
    | 'BUILDING_NAME'
    | 'LAND_NUMBER'
    | 'POSTAL_CODE'

  export interface AddressElement {
    type: AddressElementType[]
    longName: string
    shortName: string
    code: string
  }

  export interface Address {
    roadAddress: string
    jibunAddress: string
    englishAddress: string
    addressElements: AddressElement[]
    x: string
    y: string
    distance: number
  }

  export interface Meta {
    totalCount: number
    page: number
    count: number
  }

  export interface GeocodeApiResponse {
    status: string
    meta: Meta
    addresses: Address[]
    errorMessage?: string
  }
}

export { NaverCloudPlatform }