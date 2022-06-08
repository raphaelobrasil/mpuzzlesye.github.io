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
  'home', 'tutorial'
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
  options.forEach(option => {
    const menu = document.querySelector('#menuOptions')
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) { menu.innerHTML += `<div class='${option}Menu' onclick={changePage('${option}')}>${option}</div>` 
        }
        if (this.status == 404) { console.log('Menu not found')}
      }
    }
    xhttp.open("GET", `./pages/${option}/${option}.html`, true)
    xhttp.send()
  })
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