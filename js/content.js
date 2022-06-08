const openMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  const header = document.querySelector('.header')
  menu.style.display = 'flex'
  header.style.justifyContent = 'flex-end'
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

const options = [
  'home', 'tutorial', 'tipagem'
]

const changePage = (newOption) => {
  options.forEach(oldOption => {
    const option = document.querySelector(`.${oldOption}Class`)
    if (newOption === oldOption) {
      changeContent(newOption)
    } else {
    }
  })
}

const renderMenu = () => {
  let menuOptions = []
  for (const option of options) {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) { 
          menuOptions = [...menuOptions, {
            name: option,
            tag: `<div class='${option}Menu' onclick={changePage('${option}')}>${option}</div>`
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

const changeContent = (page) => {
  const content = document.querySelector('#contentPage')
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) { 
        content.innerHTML = `<div class='${page}Class' >${this.responseText}</div>`
      }
      if (this.status == 404) { content.innerHTML = `<div class='${page}Class' >Page not found.</div>` }
    }
  }
  xhttp.open("GET", `./pages/${page}/${page}.html`, true)
  xhttp.send()
}

const initPage = () => {
  changeContent('home')
  renderMenu()
}