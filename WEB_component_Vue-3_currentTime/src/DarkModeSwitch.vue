<script setup lang='ts'>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    <span v-if="isDark">🌚</span>
    <span v-else>🌞</span>
  </button>
</template>