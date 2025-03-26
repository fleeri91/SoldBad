import { BathingWaterRoot, BathingWater } from 'types/BathingWater'
import { BathingWaterInfoRoot } from 'types/BathingWaterInfo'

import { WaterTypeId } from 'types/WaterType'
import { delay } from 'utils/helpers'

export const fetchBathingWaters = async (): Promise<BathingWater[]> => {
  console.log('Fetching bathing waters...')

  await delay(200 + Math.floor(Math.random() * 2000))

  return fetch('https://gw-test.havochvatten.se/external-public/bathing-waters/v1/bathing-waters')
    .then((response) => {
      if (!response.ok) {
        return Promise.reject('Failed to fetch data')
      }
      return response.json()
    })
    .then((bathingWaterData: BathingWaterRoot) => {
      return bathingWaterData.filter(
        (bathingWater) => bathingWater.bathingWater.waterTypeId === WaterTypeId.HAV
      )
    })
    .catch((error) => {
      console.error('Failed to fetch bathing waters:', error)
      return Promise.reject('Failed to load bathing waters')
    })
}

export const fetchBathingWaterInfo = async (id: string): Promise<BathingWaterInfoRoot> => {
  console.log(`Fetching bathing water ${id}...`)

  await delay(200 + Math.floor(Math.random() * 2000))

  return fetch(
    `https://gw-test.havochvatten.se/external-public/bathing-waters/v1/bathing-water-profiles/${id}`
  )
    .then((response) => {
      if (!response.ok) {
        return Promise.reject('Failed to fetch data')
      }
      return response.json()
    })
    .then()
    .catch((error) => {
      console.error(`Failed to fetch bathing water with id ${id}: ${error}`)
      return Promise.reject(`Failed to load bathing water with id ${id}`)
    })
}
