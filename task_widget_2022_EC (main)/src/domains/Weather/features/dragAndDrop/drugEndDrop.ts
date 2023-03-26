// https://htmlacademy.ru/blog/articles/drag-and-drop
//https://lpgenerator.ru/blog/2016/03/15/sozdaem-prostoj-html5-drag-drop-interfejs/
//https://gearmobile.github.io/javascript/javascript-drag-and-drop/
//https://habr.com/ru/post/187582/
//https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js-ru

export function drugStart(el: any): void {
  el.classList.add(`selected`)
}


export function drugEnd(ev: any, parentEl: any, itemsCommonSelector: string): string[] {
  ev.target.classList.remove(`selected`)

  const newElements = parentEl.querySelectorAll(itemsCommonSelector)
  let refreshedItemLine_id = []
  for (let el of newElements) {
    refreshedItemLine_id.push(el.getAttribute('id'))
  }
  return refreshedItemLine_id
}


export function dragOver(ev: any, weatherListEl: any, itemClassName: string): void {
  ev.preventDefault()

  const activeElement = weatherListEl.querySelector(`.selected`)
  const currentElement = ev.target
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(itemClassName)

  if (!isMoveable)
    return

  // ev.clientY — вертикальная координата курсора в момент, когда сработало событие
  const nextElement = getNextElement(ev.clientY, currentElement)

  // Проверяем, нужно ли менять элементы местами
  if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  )  // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
    return

  weatherListEl.insertBefore(activeElement, nextElement)
}


const getNextElement = (cursorPosition: any, currentElement: any) => {
  // Получаем объект с размерами и координатами
  const currentElementCoord = currentElement.getBoundingClientRect();
  // Находим вертикальную координату центра текущего элемента
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  // Если курсор выше центра элемента, возвращаем текущий элемент
  // В ином случае — следующий DOM-элемент
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;

  return nextElement
}