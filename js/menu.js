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