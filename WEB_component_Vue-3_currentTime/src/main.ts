import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
createApp(App).mount('#app')



//
import { defineCustomElement } from 'vue'
import CurrentTime from './components/CurrentTime.ce.vue'

console.log('style ====', CurrentTime.styles) // ['/* css content */']

const CurrentTimeComponent = defineCustomElement(CurrentTime)
customElements.define('current-time', CurrentTimeComponent)


// @ts-ignore
// document
//   .querySelector('current-time')
//   .addEventListener('datechange', recordTime);
//
// function recordTime(event: any) {
//   console.log(event.detail[0].value)
// }

