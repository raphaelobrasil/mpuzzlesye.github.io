const renderPageInterface = ({PuzzleTables, Modules, Methods, fHelps, subtitle, tip}) => { 
  listInterface('PuzzleTables', PuzzleTables, subtitle, tip)
  listInterface('Modules', Modules, subtitle, tip)
  listInterface('Methods', Methods, subtitle, tip)
  listInterface('fHelps', fHelps, subtitle, tip)
}

const renderPageFunctions = ({PuzzleTables, Modules, GachaSystem, Methods, fHelps, subtitle, tip}) => { 
  listFunctions('puzzleTable', PuzzleTables, subtitle, tip)
  listFunctions('modules', Modules, subtitle, tip)
  listFunctions('gachaSystem', GachaSystem, subtitle, tip)
  listFunctions('methods', Methods, subtitle, tip)
  listFunctions('fhelps', fHelps, subtitle, tip)
}

const attracInfo = (info) =>  info
.replace(/(\[)|(\])|(\<)|(\>)/g, '')
.replace('Promise', '')
.replace('&#62;', '')
.replace('&#60;', '')

const listInterface = (category, list, subtitle, tip) => {
  const content = document.querySelector(`#${category}`)
  if (!!content) {
    const [init] = content.children
    content.innerHTML = ''
    content.appendChild(init)
    const sub = document.querySelector(`#subtitle`)
    const tipcontent = document.querySelector(`#tip`)

    for (const { title, description } of list) {
      const titleCard = `<div title-col="20"><strong attrac="${attracInfo(title)}" onclick='setSearch("${title}")' pointer>${title}</strong></div>`
      let listDescription = ''

      description.forEach(({ prop, type }, key) => {
        const separator = description.length === key + 1 ? '.' : ',&ensp;'
        listDescription = listDescription + `<span><strong>${prop}: </strong><span onclick='setSearch("${type}")' pointer>${type}</span></span>` + separator
      })
      
      content.innerHTML += `<div class="cardContent">${titleCard}<div descript-col>${listDescription}</div></div>`
      sub.innerHTML = subtitle
      tipcontent.innerHTML = tip
    }
  }
}

const listFunctions = (category, list, subtitle, tip) => {
  const content = document.querySelector(`#${category}`)
  if (!!content) {
    const [init] = content.children
    content.innerHTML = ''
    content.appendChild(init)
    const sub = document.querySelector(`#subtitle`)
    const tipcontent = document.querySelector(`#tip`)

    for (const { functionMethod, input, output, description } of list) {
      const titleContent = (info, second) => `<div title-col="15"><strong ${second && 'title-col-second'}>${
       second 
       ? `<a no-effect href="?page=interface&&topic=${category}&&attrac=${attracInfo(info)}">${info}</a>`
       : info
      }</strong></div>`
      
      const constructor = `<div class="cardContent">${
        titleContent(functionMethod, false) + titleContent(input, true) + titleContent(output, true)
      }<div descript-col>${description}</div></div>` 

      content.innerHTML += constructor 
      sub.innerHTML = subtitle
      tipcontent.innerHTML = tip
    }
  }
}
