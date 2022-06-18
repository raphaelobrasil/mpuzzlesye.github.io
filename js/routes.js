const getParams = (params) => new URLSearchParams( window.location.search ).get(params)

const initPage = () => {
  const page = getParams('page') || undefined
  const topic = getParams('topic') || undefined
  changeContent(page, topic)
  renderMenu() 
  !!page && openMenu()   
  changePage(page, topic)
  changeTopic(page, topic)
}

const anchorLink = () => {
  const get = getParams('attrac')
  if (!!get) {
    try {
      const attrac = document.querySelector(`[attrac^="${get}"]`)
      attrac.scrollIntoView({ behavior: 'smooth' })
      attrac.setAttribute('style', `border-bottom: 1px solid ${color_second};`)
    } catch {}
  }
}
