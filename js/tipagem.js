const renderPageTipagem = (json) => { 
  listInterface('PuzzleTables', json.PuzzleTables)
  listInterface('Modules', json.Modules)
  listInterface('Match3', json.Match3) 
}

const listInterface = (category, list) => {
  const content = document.querySelector(`#${category}`)
  for (const { title, description } of list) {
    const titleCard = `<div class="titleContent"><strong>${title}</strong></div>`
    let listDescription = ''
    description.forEach(({ prop, type }, key) => {
      const separator = description.length === key + 1 ? '.' : ',&ensp;'
      listDescription = listDescription + `<span><strong>${prop}: </strong>${type}</span>` + separator
    })
    content.innerHTML += `<div class="cardContent">${titleCard}<div class="descriptionContent">${listDescription}</div></div>`
  }
}