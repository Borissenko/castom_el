<script setup lang="ts">
import {computed, ref} from 'vue'
import SettingsBody from './SettingsBody.vue'
import gear from '../assets/imgs/gear.png'
import cross from '../assets/imgs/close.svg'

const isSettingsShow = ref(false)
let weatherLineIsRefreshed = ref(5)
const img = computed(() => isSettingsShow.value ? cross : gear)


</script>

<template>
  <div class="settings-wrapper"
       :class="{'settings-wrapper__bg': isSettingsShow}"
  >
    <Teleport to="body">
      <div class="settings__outside"
           @click="isSettingsShow = false"
           v-show="isSettingsShow"
      >
      </div>
    </Teleport>
    
    <div class="settings__spot">
      <div class="spot-top">
        <div v-show="isSettingsShow"
             class="spot-top__title"
        >
          Settings
        </div>
        <div @click="isSettingsShow = !isSettingsShow"
             class="spot-top__icon"
        >
          <img :src="img" alt="menu" class="spot-top__icon-img">
        </div>
      </div>
      
      <SettingsBody v-show="isSettingsShow"
                    class="spot-body"
                    @reloadHimSelf="weatherLineIsRefreshed += 1"
                    :key="weatherLineIsRefreshed"
      />
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>