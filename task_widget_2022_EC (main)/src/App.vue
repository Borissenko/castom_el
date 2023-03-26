<script setup lang="ts">
import {onMounted, reactive} from "vue"

let document_: any = reactive(document)



</script>


<template>
  <header>
    <h1>Implement a widget that displays the weather.</h1>
  </header>
  
  <main>
    <div>
      Ther is inserted Web Component
    </div>
    <div class="web-component">
      <Suspense>
        <weather-widget></weather-widget>
      </Suspense>
    </div>
    
    <!--    <weather-widget/>-->
    
  </main>
</template>


<style lang="scss">
header {
  border-bottom: #c0c3c4 1px solid;
  margin-bottom: 40px;
}

main {
  position: absolute;
  width: 100%;
  min-height: 500px;
  
  .web-component {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 450px;
    height: 150px;
  }
  
}

</style>
