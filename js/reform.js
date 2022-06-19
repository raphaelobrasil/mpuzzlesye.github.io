const renderPageReform = (json) => {
  const content = 'ReformsWarnning'
  listReform(content, json.reform)
}

const listReform = (contentName, json) => {
  const contentReform = document.querySelector(`#${contentName}`)
  if (!!contentReform) {
    for (const { subtitle, body } of json) {
      const title = render_subtitle(subtitle)
      let card = render_doubleCardContent20('Registro', 'Descrição', 'bold-dark', 'bold-dark flexr-center')
      for (const { register, content } of body) {
        card += render_doubleCardContent20(register, content)
      }
      contentReform.innerHTML = ''
      contentReform.innerHTML += title + render_tableContent(card)
    }
  }
}