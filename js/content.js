const options = ['home', 'tutorial', 'tipagem', 'functions', 'reform']
const callPageJson = [
  {'page': 'home', 'call': (json) => json}, 
  {'page': 'tutorial', 'call': (json) => json}, 
  {'page':'tipagem', 'call': (json) => renderPageTipagem(json)}, 
  {'page':'functions', 'call': (json) => json},
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

const initPage = () => {
  changeContent('home')
  renderMenu()        
}

