
const getParams = (params) => new URLSearchParams( window.location.search ).get(params)

const initPage = () => {
  const page = getParams('page') || 'home'
  changeContent(page)
  renderMenu()        
}

//?first=value&&second=value