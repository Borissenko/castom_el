<script setup lang="ts">
import AsyncWeather from './AsyncWeather.vue'



</script>


<template>
  <div class="ce-wrapper">
    <Suspense>
      <AsyncWeather ></AsyncWeather>
    </Suspense>
  </div>
</template>


<style lang="scss">
@import './assets/SCSS/main';

.ce-wrapper {
  position: absolute;
  width: 100%;
  max-width: 400px;
  min-height: 40rem;
  height: min-content;
  
  box-sizing: border-box;
  padding: var(--vt-c-common-padding);
  
  //border: $red 1px solid;    //work too
  border: var(--vt-c-blue_dark) 1px solid;
}

</style>

