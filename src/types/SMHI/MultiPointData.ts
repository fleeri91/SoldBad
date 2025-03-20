export interface MultiPointDataRoot {
  approvedTime: string
  referenceTime: string
  timeSeries: TimeSerie[]
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
