const openMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  menu.style.display = 'flex'
  kebab.style.display = 'none'
}

const closeMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  const header = document.querySelector('.header')
  menu.style.display = 'none'
  header.style.justifyContent = 'space-between'
  kebab.style.display = ''
}

const changePage = (newOption) => {
  options.forEach(oldOption => {
    const option = document.querySelector(`#${oldOption}Menu`)
    if (newOption === oldOption) {
      changeContent(newOption)
      option.className = "optionMenuActive"
    } else {
      option.className = "optionMenu"
    }
  })
  document.querySelector('.searchInput').value = ''
  getSearch('')
}

const renderMenu = () => {
  for (const option of options) {
    const initClass = option === 'home' ? 'optionMenuActive' : 'optionMenu'
    document.querySelector('#menuOptions').innerHTML += `<div id='${option}Menu' class=${initClass} onclick={changePage('${option}')}>${option}</div>`
  }
}