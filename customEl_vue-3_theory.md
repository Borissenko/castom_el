WEB COMPONENT Vue-3 + Vite
Custom Element

# 1. Декларируем CurrentTime_CE

# 1A. Декларируем CurrentTime_CE via .vue-файл
## 1) Заявляем содержимое CE:

## Расположение CE
- CurrentTime.ce.vue можно положить где угодно, не обязательно в /components родительского проекта.


## Имя CE
- обязательно расширение XXXX.ce.vue, 
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


## Содержание CE
> внутри XXXX.ce.vue - как в обычном vue-файле.

> await in setup
setup - должен быть БЕЗ await(!), потому что обернуть корневой компонент CE-дерева в Suspense - невозможно.

НО! Можно сделать компонент-контейнер, его заявить как корневой компонент CE-дерева, 
и в нем прописать ребочий компонент, у которого в script setup есть await,
ОБЕРНУВ его в Suspense(!),

а корневой див у рабочего компонента поставить в условие
   v-if="fetchedData"


> TS - работает.


## Декларация style в CE
- style CE   - БЕЗ scoped(!)
- style компонента, в который вставляем CE,  - БЕЗ scoped тоже(!)

- @import './assets/SCSS/main';
Импорт стилей из main.scss в CE.ce.vue - работает хорошо.
main.scss импортируем в КОРНЕВОЙ компонент CE-дерева (компонент-контейнер, Нр).

- максимальный размер виджета и рамочку прописываем в корневом компоненте CE-дерева.

- Стили, прописанные в дочках для CE, - НЕ отрабатывают. (Да)
Их надо переносить в корневой компонент CE.
Или прописывать настороне и импортировать в main.scss.

- SCSS - вложенность классов и SCSS-переменные - импортируются и работают,
- импортируем в style рутового CE_компонента, который д.б. без scoped(!).

- CSS-переменные надо заявлять не в селекторе :root{}, а в селекторе :host{}

## shadowRoot селекторы
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







# 1B. Декларируем CurrentTime_CE прописью полей компонента напрямую в defineCustomElement()
//main.ts
import { defineCustomElement } from 'vue'

const CurrentTime_CE = defineCustomElement({
  // normal Vue component options here
  props: {},
  emits: {},
  template: `...`,
  styles: [`.wrapper: {color: red;}`]
})





# 1С. Декларируем CurrentTime_CE common approach - 1.
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




# 1D. Декларируем CurrentTime_CE common approach - 2.
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

defineCustomElement({ ...VueDarkModeSwitch, styles })      //компонент VueDarkModeSwitch - это class.






# 3. Eсли надо, импортируем CE
1. export { CurrentTime_CE }

2. Glob Import Vite
   https://vitejs.dev/guide/features.html#glob-import

3. require.context
   https://webpack.js.org/guides/dependency-management/#requirecontext



# CurrentTime_CE - это class
CurrentTime_CE имеет поля:
CurrentTime_CE.template
CurrentTime_CE.methods
CurrentTime_CE.styles
etc




# 2. Подключаем CE в проект
//main.ts
customElements.define('current-time', CurrentTime_CE)





# 3. Связь CE с внешним миром
https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue


## Pinia
- если инстиллирована в родительском проекте, то работает.


## plugin
- свои собственные - не зарегистрируешь,
- использовать родительские - не соответствует философии самодостаточности CE.


## emit from CE
Что бы добавить в родительском проекте прослушку эмитов из CE, прописываем в родительском проекте:
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

However, note that this works only between custom(!) elements, в CE-дереве,
из родительского проекта события НЕ опускаются.




## document.querySelector()

document.querySelector(`:host .weather-list`)
     .addEventListener(`dragstart`, (ev: any) => drugStart(ev))

Внутри CE доступа к document - НЕТ.

Можно его пробросить в props тега CE, причем пробрасывать надо с пристрастием:
let document_: any = reactive(document)
<weather-widget :document_.prop="document_"></weather-widget>

//корневой компонент CE - WeatherWidget.ce.vue
const props = defineProps<{ document_: any }>()

Однако пользы от document_ - никакой.
Найти el ПО СЕЛЕКТОРУ - НЕВОЗМОЖНО:
props.document_.querySelectorAll(`:host-context(.ce-wrapper)`)   ==> undefined(!)


> решение
Что бы поиметь el,
надо на его тег (или тег родителя) повесить событие

@vnodeMounted="vnodeMountedHandler"     << vue-2
@hook:Mounted="vnodeMountedHandler"     << vue-3


let weatherListEl: any = reactive({})

function vnodeMountedHandler(ev: any) {
  weatherListEl = ev.el
}


а далее с weatherListEl делать, что хотим:
weatherListEl.querySelectorAll(`weathet-item`)
weatherListEl.insertBefore()
weatherListEl...





# 3. Обработчики событий в CE
## @click="ddd"
- работает


## .addEventListener
.addEventListener - не повесишь, потому что document.querySelector() - не определишь.
tasksListElement.addEventListener(`dragstart`, (ev: any) => drugStart(ev))    <<wrong way

НО МОЖНО(!) 

## - повесить требуемый обработчик непосредственно в тег:
<div @dragstart="dragstartHandler"></div>

export function drugStart(ev: any): string {
  ev.target.classList.add(`selected`)
  return ev.target.id
}

## 











# 4. Чтобы Vite начал акцептировать CE, прописываем:
- хотя срабатывало и без этого.

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
## правила
vue-компонент, в который мы вставляем CE-компонент
должен быть БЕЗ scoped(!)


## директивно
    <current-time></current-time>
    <current-time/>


## или programmatically
document.body.appendChild(
  new CurrentTime_CE({
    // initial props (optional)
  })
)


document.body.innerHTML += "<helloworld-component></helloworld-component>"





# 6. Перенос CE в библиотеку 
- это осуществляем при билде проекта.
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
https://gist.github.com/ncer/2e19511929f44d2fe434112e509780e0

## then:
https://habr.com/ru/post/581954/
https://stackblitz.com/edit/vite-lev22l?file=index.html,components%2FCurrentTime.ce.vue,main.js,style.css

https://maximomussini.com/posts/vue-custom-elements