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
        anchorLink()
      }
      if (this.status == 404) { 
        content.innerHTML = `<div class="NoFound"><div class="NoFoundSVG" alt="noFound"></div><span>Page not found!</span></div>` 
        document.querySelector('.NoFound').style.display = 'flex'
      }
    }
  }
  xhttp.open("GET", `./pages/${page}`, true)
  xhttp.send()
}


const clipBoardEffect = (value, id) => {
  const content = document.querySelector(`#${id}`)
  const sucessCopy = document.querySelector('#copySucess')
  content.setAttribute('clip', 'yes')
  navigator.clipboard.writeText(value)
  sucessCopy.style.display = 'block'
}

const clearNotification = () => {
  const content = document.querySelectorAll(`[clip]`)
  const sucessCopy = document.querySelector('#copySucess')
  sucessCopy.style.display = 'none'
  content.forEach(node => node.setAttribute('clip', 'no'))

}

const effectHover = (border, svg, border_c, border_bg, svg_bg) => {
  border.style.border = `3px solid ${border_c}`;
  border.style.color = border_c;
  border.style.backgroundColor = border_bg;
  svg.style.backgroundColor = svg_bg;
}

const putHover = (type) => {
  const border = document.querySelector(`[border-${type}]`)
  const svgIcon = document.querySelector(`.${type}`)
  effectHover(border, svgIcon, '#ff8800', '#344245', '#ff8800')
}

const outHover = (type) => {
  const border = document.querySelector(`[border-${type}]`)
  const svgIcon = document.querySelector(`.${type}`)
  effectHover(border, svgIcon, '#344245', 'unset', '#344245')
}


