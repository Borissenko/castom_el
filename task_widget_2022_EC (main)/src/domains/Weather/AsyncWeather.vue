<script setup lang="ts">
import {computed, toRefs} from "vue"

import Settings from './components/Settings.vue'
import WeatherCard from './components/WeatherCard.vue'

import {getGeolocation} from "./features/geolocation/geolocation"
import {LS_service} from "./features/localStorageService/LS_service"
import {useWeatherStore} from './store/weatherStore'
import {VITE_WEATHER_LOCAL_STORAGE_NAME} from './features/localStorageService/constants'

const weatherStore = useWeatherStore()

let weatherLocations: Array<string[]> = LS_service.getLS(VITE_WEATHER_LOCAL_STORAGE_NAME)
if (!weatherLocations || weatherLocations.length === 0)
  weatherLocations = [await getGeolocation()]

await weatherStore.FETCH_WEATHER(weatherLocations)
let weatherSets = computed(() => weatherStore.GET_WEATHER_SETS)

</script>


<template>
  <div class="weather-wrapper"
       v-if="weatherSets"
  >
    <h1>
      Weather
    </h1>
    <Settings class="weather__settings"/>
    
    <WeatherCard v-for="(weatherSet, ind) of weatherSets"
                 :key="'weather' + ind"
                 :weatherSet="weatherSet"
                 class="weather__card"
    />
  </div>
</template>


<style lang="scss">
//SCSS see in src/domains/Weather/assets/SCSS/componentSCSS/asyncWeatherSCSS.scss

</style>

