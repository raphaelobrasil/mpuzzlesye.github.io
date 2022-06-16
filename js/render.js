const renderPageInterface = ({PuzzleTables, Modules, Match3, subtitle, tip}) => { 
  listInterface('PuzzleTables', PuzzleTables, subtitle, tip)
  listInterface('Modules', Modules, subtitle, tip)
  listInterface('Match3', Match3, subtitle, tip)
}

const renderPageFunctions = ({PuzzleTables, Modules, GachaSystem, Match3, subtitle, tip}) => { 
  listFunctions('PuzzleTables', PuzzleTables, subtitle, tip)
  listFunctions('Modules', Modules, subtitle, tip)
  listFunctions('GachaSystem', GachaSystem, subtitle, tip)
  listFunctions('Match3', Match3, subtitle, tip)
}

const listInterface = (category, list, subtitle, tip) => {
  const content = document.querySelector(`#${category}`)
  const sub = document.querySelector(`#subtitle`)
  const tipcontent = document.querySelector(`#tip`)

  for (const { title, description } of list) {

    const titleCard = `<div title-col="20"><strong>${title}</strong></div>`
    let listDescription = ''

    description.forEach(({ prop, type }, key) => {
      const separator = description.length === key + 1 ? '.' : ',&ensp;'
      listDescription = listDescription + `<span><strong>${prop}: </strong>${type}</span>` + separator
    })
    
    content.innerHTML += `<div class="cardContent">${titleCard}<div descript-col>${listDescription}</div></div>`
    sub.innerHTML = subtitle
    tipcontent.innerHTML = tip
  }
}

const listFunctions = (category, list, subtitle, tip) => {
  const content = document.querySelector(`#${category}`)
  const sub = document.querySelector(`#subtitle`)
  const tipcontent = document.querySelector(`#tip`)

  for (const { functionMethod, input, output, description } of list) {

    const titleContent = (info, second) => `<div title-col="15"><strong ${second && 'title-col-second'}>${info}</strong></div>`
    
    const constructor = `<div class="cardContent">${
      titleContent(functionMethod, false) + titleContent(input, true) + titleContent(output, true)
    }<div descript-col>${description}</div></div>` 

    content.innerHTML += constructor 
    sub.innerHTML = subtitle
    tipcontent.innerHTML = tip
  }
}
