export interface SMHIPointRoot {
  approvedTime: string
  referenceTime: string
  geometry: Geometry
  timeSeries: TimeSerie[]
}

export interface Geometry {
  type: string
  coordinates: number[][]
}

export interface TimeSerie {
  validTime: string
  parameters: Parameter[]
}

export interface Parameter {
  name: string
  levelType: string
  level: number
  unit: string
  values: number[]
}
