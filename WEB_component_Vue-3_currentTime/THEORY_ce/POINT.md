WEB COMPONENT Vue-3 + Vite
Custom Element

# 1. Декларируем CurrentTime_CE

# 1A. via .vue-файл
## 1) Заявляем содержимое CE
//components/CurrentTime.ce.vue
- внутри XXXX.ce.vue - как в обычном vue-файле
- название - обязательно расширение XXXX.ce.vue, 
иначе, что бы Vite воспринимал файл как кастомный элемент, надо обозначать так:

## vue({ customElement: true })
//vite.config.ts
plugins: [
  // Example: Import =ALL= Vue files in custom element mode.
  vue({ customElement: true }),     // default: /\.ce\.vue$/
],

Заявление ВСЕХ компонентов проекта как CE - не страшно.
Это предотвращает использование только таких фенкцийVue, 
как слоты с ограниченной областью действия.



## Декларация style в CE
style           /* БЕЗ scoped(!)

:host {           /* << это обозначение Shadow Root
--color: #fbbf24;
--bg-normal: #fAfAf9;
--bg-active: #f5f5f4;
--font-size: 24px;
}

:host([dark]) {
--color: #fef3c7;
--bg-normal: #262626;
--bg-active: #2d2d2d;
}



## 2) Генерируем CE
//main.ts
import { defineCustomElement } from 'vue'
import CurrentTime from './components/CurrentTime.ce.vue'

const CurrentTime_CE = defineCustomElement(CurrentTime)







# 1B. Прописью полей компонента напрямую в defineCustomElement()
//main.ts
import { defineCustomElement } from 'vue'

const CurrentTime_CE = defineCustomElement({
  // normal Vue component options here
  props: {},
  emits: {},
  template: `...`,
  styles: [`.wrapper: {color: red;}`]
})





# 1С. common approach - 1
class CustomElement extends HTMLElement {
  constructor() {
    super()
  }

  const shadowRoot = this.attachShadow({ mode: 'open' })
  shadowRoot.innerHTML = `
      <!-- Styles are scoped -->
      <style>
        ${styleText}
      </style>
      <div>
        <p>Hello World</p>
      </div>
    `;

  connectedCallback() {
  }
}

const CurrentTime_CE = defineCustomElement(CurrentTime)




# 1D. common approach - 2
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .class-one {
      font-size: 2rem;
      color: tomato;
    }
    .class-one .class-two {
      font-size: 4rem;
      color: cornflowerblue;
    }
  </style>
  <div class="class-one">
    Hello <span class="class-two">World</span>
  </div>
`;

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-component', MyComponent)  // неVue-способ генерации CE.



# 2. Если надо, инстиллируем внешние стили в момент генерации CE
const styles = ['button { font-size: 24px; ... }']

defineCustomElement({ ...VueDarkModeSwitch, styles })






# 3. Eсли надо, импортируем CE
1. export { CurrentTime_CE }

2. Glob Import Vite
   https://vitejs.dev/guide/features.html#glob-import

3. require.context
   https://webpack.js.org/guides/dependency-management/#requirecontext



# CurrentTime_CE - это class
CurrentTime_CE имеет поля
CurrentTime_CE.template
CurrentTime_CE.methods
CurrentTime_CE.styles, etc




# 2. Подключаем CE в проект
//main.ts
customElements.define('current-time', CurrentTime_CE)





# 3. Связь CE с внешним миром
https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue

## emit from CE
Что бы добавить прослушку эмитов из нашего кастомного элемента, прописываем
// @ts-ignore
document.querySelector('current-time')
  .addEventListener('datechange', recordTime)   //'datechange' - луч в теге <current-time/>

function recordTime(event: any) {
  console.log(event.detail[0].value)
}



## props-поток в CE
<current-time time-zone="America/New_York"></current-time>

Если возникают ошибки, то можно прописать более жестко через v-bind:
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- shorthand equivalent -->
<my-element .user="{ name: 'jack' }"></my-element>



## <slot>
- только НЕименованные
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots



## provide / Inject
The Provide / Inject API work between Vue-defined custom elements. 
However, note that this works only between custom(!) elements.








# 4. Чтобы Vite начал акцептировать CE, прописываем
//vite.config.ts
plugins: [
  vue({
    template: {
      compilerOptions: {
        isCustomElement: (tagName) => tagName.includes('-')
      }
    }
  })
],




# 5. Добавляем кастомный элемент где-либо
## директивно
    <current-time></current-time>

## или programmatically
document.body.appendChild(
  new CurrentTime_CE({
    // initial props (optional)
  })
)





# 6. Перенос CE в библиотеку при билде проекта
https://vitejs.dev/guide/build.html#library-mode

//vite.config.ts
build: {
  lib: {
    entry: resolvePath('index.ts'),
    name: 'DarkModeSwitch',
    fileName: format => `index.${format}.js`
  },
  rollupOptions: {
    // Externalize deps that shouldn't be bundled into the library.
    external: ['vue', '@vueuse/core'],
  },

rollupOptions: If we plan to use our component in applications that are already using Vue, 
then it's better to externalize it to prevent duplicates and ensure they use the same version.



# 7. Resources
## main:
https://developer.mozilla.org/en-US/docs/Web/Web_Components
https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue

## then:
https://habr.com/ru/post/581954/
https://stackblitz.com/edit/vite-lev22l?file=index.html,components%2FCurrentTime.ce.vue,main.js,style.css

https://maximomussini.com/posts/vue-custom-elements