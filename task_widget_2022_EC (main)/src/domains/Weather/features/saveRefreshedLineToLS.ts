import type {CardWeatherSet, TLSCoordinates} from "../store/storeTypes"
import {LS_service} from "./localStorageService/LS_service"
import {VITE_WEATHER_LOCAL_STORAGE_NAME} from "./localStorageService/constants"

export function saveRefreshedLineToLS(refreshedItemLine_id: string[], weatherSets: CardWeatherSet[]): void {
  let refreshedWeatherCoordinates: TLSCoordinates = []

  for (let id of refreshedItemLine_id) {
    let targetItem: CardWeatherSet | undefined = weatherSets.find((item: CardWeatherSet) => item.id === id)
    if (targetItem)
      refreshedWeatherCoordinates.push([targetItem.lon, targetItem.lat])
  }

  LS_service.setLS(VITE_WEATHER_LOCAL_STORAGE_NAME, refreshedWeatherCoordinates)
}