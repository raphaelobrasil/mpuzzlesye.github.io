const changeShowMenu = (menu, kebab, show, header) => {
  menu.setAttribute('style', `display: ${ show ? 'flex' : 'none' }`)
  kebab.setAttribute('style', `display: ${ show? 'none' : '' }`)
  !!header && header.setAttribute('style', `justifyContent: 'space-between'`)
}

const createTopic = (option) => {
  let render = ''
  for (const title of option.topic) {
      render += `<a no-effect href="?page=${
        option.file}&&topic=${title.file
        }"><div class='section_topic' id='${
          option.file}_${title.file
          }'>${title.label}</div></a>`
  }
  return render
}

const isArrow = (option) => {
  return (option !== 'home' && option !== 'reform')
    ? `<div id="${option}Arrow" svg rotate="180" class="arrow" alt=${option}></div>`
    : ''
} 

const createSection = (option, initClass) => {
  const [indexCurrent] = option.topic
  const section = `<a no-effect href="?page=${option.file}${!!indexCurrent?.file ? '&&topic=' + indexCurrent.file : ''}"><div id='${option.file}Menu' flexr-sb-c class=${initClass} >${option.label} ${isArrow(option.file)}</div></a>`
  const topic = `<div id='${option.file}_topic' flexc d-none animation-long border-b-light >${createTopic(option)}</div>`
  return `<div>${section} ${topic}</div>`
}

const openMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  changeShowMenu(menu, kebab, true)
}

const closeMenu = () => {
  const menu = document.querySelector('.menu')
  const kebab = document.querySelector('.kebab')
  const header = document.querySelector('.header')
  changeShowMenu(menu, kebab, false, header)
}

const changePage = (newOption='home') => {
  const closed = '180'
  const open = '270'
  options.forEach(oldOption => {
    const option = document.querySelector(`#${oldOption.file}Menu`)
    const arrow = document.querySelector(`#${oldOption.file}Arrow`)
    const isOpen = (!!arrow && newOption === oldOption.file) ? arrow.getAttribute('rotate') : closed
    if (newOption === oldOption.file) {
      const [indexCurrent] = oldOption.topic
      changeContent(newOption, indexCurrent?.file)
      option.className = "optionMenuActive"
      !!arrow && (
          arrow.setAttribute('rotate', open === isOpen ? closed : open),
          document.querySelector(`#${oldOption.file}_topic`).setAttribute('style', `display: ${open === isOpen ? 'none' : 'flex'}`)
        )
    } else {
      option.className = "optionMenu"
      !!arrow && (
          arrow.setAttribute('rotate', closed),
          document.querySelector(`#${oldOption.file}_topic`).setAttribute('style', 'display: none')
        )
    }
  })
  document.querySelector('.searchInput').value = ''
  getSearch('')
}

const changeTopic = (newSection='home', newTopic='home') => {
  for (const option of options) {
    option.topic.forEach(title => {
      const content = document.querySelector(`#${option.file}_${title.file}`)
      if (newTopic === title.file && option.file === newSection) {
        content.setAttribute('style', `color: ${color_second}`)
        changeContent(newSection, title.file)
      } else {
        content.setAttribute('style', `color: ${bg_second}`)
      }
    })
  }
}

const renderMenu = () => {
  for (const option of options) {
    const initClass = option.file === 'home' ? 'optionMenuActive' : 'optionMenu'
    document.querySelector('#menuOptions').innerHTML += createSection(option, initClass)
  }
}
