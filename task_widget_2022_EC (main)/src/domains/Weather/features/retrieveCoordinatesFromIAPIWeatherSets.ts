import type {IAPIWeatherSet, TLSCoordinates} from "../store/storeTypes"

export function retrieveCoordinatesFromIAPIWeatherSets(APIWeatherSets: IAPIWeatherSet[]) {
  const weatherCoordinates: TLSCoordinates = []
  for(let set of APIWeatherSets) {
    weatherCoordinates.push([set.coord.lon, set.coord.lat])
  }
  return weatherCoordinates
}