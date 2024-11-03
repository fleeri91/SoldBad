export interface LocationRoot {
  type: string
  features: Feature[]
  totalFeatures: number
  numberMatched: number
  numberReturned: number
  timeStamp: string
}

export interface Feature {
  type: string
  id: string
  geometry?: Geometry
  geometry_name: string
  properties: Properties
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface Properties {
  NUTSKOD: string
  NAMN: string
  KMN_NAMN: string
}
