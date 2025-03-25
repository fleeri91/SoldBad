export interface BathingWaterInfoRoot {
  administrativeAuthority: AdministrativeAuthority
  algae: boolean
  bathingSeason: BathingSeason
  bathingWater: BathingWater
  cyano: boolean
  lastFourClassifications: LastFourClassification[]
  pollutionSources: any[]
  summary: string
  supervisoryAuthority: SupervisoryAuthority
  updateDetail: UpdateDetail
}

interface AdministrativeAuthority {}

interface BathingSeason {
  endsAt: string
  startsAt: string
}

interface BathingWater {
  description: string
  euType: boolean
  municipality: Municipality
  name: string
  notEuMotive: string
  nutsCode: string
  perimeterCoordinates: any[]
  samplingPointPosition: SamplingPointPosition
  waterTypeId: number
  waterTypeIdText: string
}

interface Municipality {
  contactInfo: ContactInfo
  name: string
}

interface ContactInfo {
  email: string
  phone: string
  url: string
}

interface SamplingPointPosition {
  latitude: string
  longitude: string
}

interface LastFourClassification {
  qualityClassId: number
  qualityClassIdText: string
  year: number
}

interface SupervisoryAuthority {
  address: string
  email: string
  name: string
  phone: string
  visitAddress: string
}

interface UpdateDetail {
  latestAt: string
}
