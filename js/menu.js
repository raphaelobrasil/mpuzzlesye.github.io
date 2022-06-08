const openMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  menu.style.display = 'flex'
  kebab.style.display = 'none'
}

const closeMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  menu.style.display = 'none'
  kebab.style.display = ''
}