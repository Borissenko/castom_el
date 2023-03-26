<script setup lang="ts">
// import CurrentTime from '@/components/CurrentTime.ce.vue'



</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <current-time time-zone="America/New_York">
      <span slot="prefix">The time is => </span>
    </current-time>
  
  
  </main>
</template>

<style scoped>
</style>
