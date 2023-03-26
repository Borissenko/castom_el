https://levelup.gitconnected.com/creating-and-publishing-multiple-vue-web-and-library-components-448451838ccf

# 1. болванка
vue create my_webpack     by all default options



# 2. усложнили команду build в package.json
    "build": "npm run build:wc & npm run build:lib",
    "build:lib": "vue-cli-service build --target lib --name dxc-components 'src/main.js'",
    "build:wc": "vue-cli-service build --target wc --name dxc-components 'src/components/*.vue'"


## создаем из проекта npm-библиотеку
build:lib

## создаем web component
build:wc 

it will allow us use <my-component> via 

<script src="https://unpkg.com/vue"></script> 
<script src="https://unpkg.com/my-component"></script>
<my-component></my-component>


В команде
"build:wc": "vue-cli-service build --target wc --name dxc-components 'src/components/*.vue'"

'src/components/*.vue' -
is the entry that will register multiple components found insrc/components directory. 
In our configuration, --name was set to dxc-components , with that, 
the result of the bundle will be registered as <dxc-components-my-component> . 
That is, if we have a component named MyComponent.vue in src/components .

Note! When you only have one component inside src/components 
the --name will be use as the tag element name. 
So, the resulting element will be <dxc-components /> 
instead of <dxc-components-my-component />



# 3. Создали требуемые нам компоненты в /COMPONENTS(!)


# 4. От App.vue - ИЗБЫВЛЯЕМСЯ,
внося изменения в main.js
// import components here
import Button from "./components/Button.vue"
import AnotherButton from "./components/AnotherButton.vue"

// export components for this library
export default {
  Button,
  AnotherButton
}



# делаем build
- для создания
"dist/dxc-components.common.js" и
"dist/dxc-components.min.js"

npm run build



# 5. В package.json добавляем entry points, 
захватывая только что созданные файлы. 

"scripts": {
...
},
"main": "dist/dxc-components.common.js",
"unpkg": "dist/dxc-components.min.js"

Legacy applications would use the main build, and 
the unpkg build can be used directly in browsers.




# 6. Publishing to npm.

## Создаем аккаунт на git_repository
you’ll have to create one and convert it to an organization 
by following this https://docs.npmjs.com/converting-your-user-account-to-an-org

## репозоторий переводим из личного в для организации
https://docs.npmjs.com/converting-your-user-account-to-an-organization

## in package.json прописываем:
"name": "@Nick/my-components",        << имя пакета. Было БЕЗ слеша.
"private": false,                     << было true
"repository": "github.com:<your-gb-username>/dxc-components"      << url реп-я.

## обновляем текст в README.md

## Публикуем как npm-пакет
npm adduser
после логина запускаем команду
npm publish --access public


# 7. Используем npm-пакет
## Within vue project
npm install — save @datay/dxc-components

<script>
import { Button, AnotherButton } from "@datay/dxc-components"

export default {
    components: {
        Button,
        AnotherButton
    }    
}
</script>

<template>
    <div>
        <Button />
        <AnotherBUtton />
    </div>
</template>


## or on existing non vue project

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@datay/dxc-components"></script>
<div id="app">
    <dxc-components-button />
    <dxc-components-another-button/>
</div>





# 8. Как запускать компоненты ИЗОЛИРОВАННО для ревью кода
2 способа

## via Web Components (wc)
npm run build:wc
смотрим, запустив в броузере ./dist/demo.html    <<work


## via Lib Components (lib)
vue serve src/components/Button.vue     <<no work
// or
vue serve src/components/AnotherButton.vue

смотрим на порту http://localhost:8080





# 9. Инстиляция в другой проект
- создал родительскую болванку Vue-3
- в ./src/components перенес папку dist/ из проекта-дочки
- в /index.html родительского проекта добавил то, что прописано в dist/demo.html

  <script src="https://unpkg.com/vue@2"></script>
  <script src="./src/components/dist/dxc-components.js"></script>

- В App.vue вставил

  <dxc-components-another-button></dxc-components-another-button>
  <dxc-components-button></dxc-components-button>



# 10. Resourses
https://levelup.gitconnected.com/creating-and-publishing-multiple-vue-web-and-library-components-448451838ccf
https://github.com/dxc04/dxc-components
