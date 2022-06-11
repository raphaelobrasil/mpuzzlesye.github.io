const openMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  const header = document.querySelector('.header')
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
  let menuOptions = []
  for (const option of options) {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) { 
          const initClass = option === 'home' ? 'optionMenuActive' : 'optionMenu'
          menuOptions = [...menuOptions, {
            name: option,
            tag: `<div id='${option}Menu' class=${initClass} onclick={changePage('${option}')}>${option}</div>`
          }] 
          if (menuOptions[0] !== undefined) {
            let render = '' 
            for (const option of options) {
              const extractOption = menuOptions.filter(tag => tag.name === option)[0]
              if (extractOption !== undefined) {
                render = render + extractOption.tag
              }
            }
            document.querySelector('#menuOptions').innerHTML = render
          }
        }
        if (this.status == 404) { console.log('Menu not found')}
      }
    }
    xhttp.open("GET", `./pages/${option}/${option}.html`, true)
    xhttp.send()
  }
}