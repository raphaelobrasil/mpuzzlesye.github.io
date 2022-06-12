const getJsonInfo = async (fileJson) => {
  const json = await fetch(`./pages/${fileJson}/${fileJson}.json`)
    .then(response => response.json())
    .catch(err => {
    console.log('Não foi possível carregar Json, error:', err)
    return null
  })
  return json
}

const jsonInterface = getJsonInfo('interface').then(response => response)
const jsonFunctions = getJsonInfo('functions').then(response => response)


const options = ['home', 'tutorial', 'interface', 'functions', 'reform']
const callPageJson = [
  {'page': 'home', 'call': (_json) => null, "json": {}}, 
  {'page': 'tutorial', 'call': (_json) => null, "json": {}}, 
  {'page':'reform', 'call': (_json) => null, "json": {}},
  {'page':'interface', 'call': (json) => renderPageInterface(json), "json": jsonInterface}, 
  {'page':'functions', 'call': (json) => renderPageFunctions(json), "json": jsonFunctions},
]

const changeContent = (page) => {
  const content = document.querySelector('.contentPage')
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = async function() {
    if (this.readyState == 4) {
      if (this.status == 200) { 
        content.innerHTML = `<div class='${page}Class' >${this.responseText}</div>`
        for (const options of callPageJson) { 
          const json = await options.json
          options.page === page && options.call(json) 
        }
      }
      if (this.status == 404) { 
        content.innerHTML = `<div class="NoFound"><div class="NoFoundSVG" alt="noFound"></div><span>Page not found!</span></div>` 
        document.querySelector('.NoFound').style.display = 'flex'
      }
    }
  }
  xhttp.open("GET", `./pages/${page}/${page}.html`, true)
  xhttp.send()
}


const clipBoardEffect = (value, id) => {
  const content = document.querySelector(`#${id}`)
  const sucessCopy = document.querySelector('#copySucess')
  content.className = "clipboardSuccessSVG"
  navigator.clipboard.writeText(value)
  sucessCopy.style.display = 'block'
}

const clearNotification = () => {
  const content = document.querySelectorAll(`.clipboardSuccessSVG`)
  const sucessCopy = document.querySelector('#copySucess')
  sucessCopy.style.display = 'none'
  content.forEach(node => node.className = "clipboardSVG")

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

