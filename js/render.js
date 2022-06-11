const renderPageTipagem = ({PuzzleTables, Modules, GachaSystem, Match3, subtitleH3, dica}) => { 
  listInterface('PuzzleTables', PuzzleTables, subtitleH3, dica)
  listInterface('Modules', Modules, subtitleH3, dica)
  listInterface('Match3', Match3, subtitleH3, dica)
}

const renderPageFunctions = ({PuzzleTables, Modules, GachaSystem, Match3, subtitleH3, dica}) => { 
  listFunctions('PuzzleTables', PuzzleTables, subtitleH3, dica)
  listFunctions('Modules', Modules, subtitleH3, dica)
  listFunctions('GachaSystem', GachaSystem, subtitleH3, dica)
  listFunctions('Match3', Match3, subtitleH3, dica)
}

const listInterface = (category, list, subtitle, dica) => {
  const content = document.querySelector(`#${category}`)
  const sub = document.querySelector(`#subtitleH3`)
  const tip = document.querySelector(`#dicaH3`)
  for (const { title, description } of list) {
    const titleCard = `<div class="titleContent"><strong>${title}</strong></div>`
    let listDescription = ''
    description.forEach(({ prop, type }, key) => {
      const separator = description.length === key + 1 ? '.' : ',&ensp;'
      listDescription = listDescription + `<span><strong>${prop}: </strong>${type}</span>` + separator
    })
    content.innerHTML += `<div class="cardContent">${titleCard}<div class="descriptionContent">${listDescription}</div></div>`
    sub.innerHTML = subtitle
    tip.innerHTML = dica
  }
}

const listFunctions = (category, list, subtitle, dica) => {
  const content = document.querySelector(`#${category}`)
  const sub = document.querySelector(`#subtitleH3`)
  const tip = document.querySelector(`#dicaH3`)
  for (const { functionMethod, input, output, description } of list) {
    const titleContent = (info) => `<div class="titleContentFunctions"><strong>${info}</strong></div>`
    const constructor = `<div class="cardContent">${
      titleContent(functionMethod) + titleContent(input) + titleContent(output)
    }<div class="descriptionContent">${description}</div></div>` 
    content.innerHTML += constructor 
    sub.innerHTML = subtitle
    tip.innerHTML = dica
  }
}