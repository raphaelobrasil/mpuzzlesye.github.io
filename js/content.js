const options = ['home', 'tutorial', 'tipagem', 'functions', 'reform']
const callPageJson = [
  {'page': 'home', 'call': (json) => json}, 
  {'page': 'tutorial', 'call': (json) => json}, 
  {'page':'tipagem', 'call': (json) => renderPageTipagem(json)}, 
  {'page':'functions', 'call': (json) => renderPageFunctions(json)},
  {'page':'reform', 'call': (json) => json},
]

const changeContent = (page) => {
  const content = document.querySelector('.contentPage')
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
  getJsonInfo(`./pages/${page}/${page}.json`, page)
}

const getJsonInfo = async (fileJson, getpage) => {
  const json = await fetch(fileJson)
    .then(response => response.json())
    .catch(err => {
    console.log('Não foi possível carregar Json, error:', err)
    return null
  })
  if (json) {
    for (const {page, call} of callPageJson) {
      page === getpage && call(json)
    }    
  }
}

const clipBoardEffect = (value, id) => {
  const content = document.querySelector(`#${id}`)
  const sucessCopy = document.querySelector('#copySucess')
  content.className = "clipboardSuccessSVG"
  navigator.clipboard.writeText(value)
  sucessCopy.style.display = 'block'
}

const clearNotification = (id) => {
  const content = document.querySelector(`#${id}`)
  const sucessCopy = document.querySelector('#copySucess')
  content.className = "clipboardSVG"
  sucessCopy.style.display = 'none'

}

const putHover = (type) => {
  const border = document.querySelector(`.hover${type}`)
  const svgIcon = document.querySelector(`.${type}BoardSVG`)
  border.style.border = '3px solid #ff8800';
  border.style.color = '#ff8800';
  border.style.backgroundColor = '#344245';
  svgIcon.style.backgroundColor = '#ff8800';

}
const outHover = (type) => {
  const border = document.querySelector(`.hover${type}`)
  const svgIcon = document.querySelector(`.${type}BoardSVG`)
  border.style.border = '3px solid #344245';
  border.style.color = '#344245';
  border.style.backgroundColor = 'unset';
  svgIcon.style.backgroundColor = '#344245';
}

const initPage = () => {
  changeContent('home')
  renderMenu()        
}

