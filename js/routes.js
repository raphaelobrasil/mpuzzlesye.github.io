
const getParams = (params) => new URLSearchParams( window.location.search ).get(params)

const initPage = () => {
  const page = getParams('page') || 'home'
  changeContent(page)
  renderMenu()    
}

const anchorLink = () => {
  const get = getParams('attrac')
  if (!!get) {
    try {
      const attrac = document.querySelector(`[attrac^="${get}"]`)
      attrac.scrollIntoView({ behavior: 'smooth' })
      attrac.style.backgroundColor = "red"
    } catch {}
  }
}

// ?first=value&&second=value