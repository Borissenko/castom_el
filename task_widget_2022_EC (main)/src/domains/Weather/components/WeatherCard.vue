<script setup lang="ts">
import type {IAPIWeatherSet} from "@/domains/Weather/store/storeTypes";
import {computed, defineProps, reactive, toRef, toRefs} from "vue"
import type {CardWeatherSet} from "@/domains/Weather/store/storeTypes"

const weatherItem = defineProps<{
  weatherSet: CardWeatherSet
}>()

function indCorrector(ind: number): number {
  if(ind > 0)
    return ind + 1
  return ind
}

</script>


<template>
  <div class="weather-card-wrapper">
    <div v-for="(val, key, ind) of weatherSet.getForCard()"
         :key="'set' + ind"
         :class="`card__${ind}`"
         class="card__item"
    >
      <div>{{ key }}</div>
      <div>{{ val }}</div>
    </div>
  </div>
</template>


<style lang="scss">
//SCSS see in src/domains/Weather/assets/SCSS/componentSCSS/weatherCardSCSS.scss

</style>