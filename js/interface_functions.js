const filterTopic = (json, page, urlTopic, call, content) => {
  for (const { file, topic } of options) {
    page === file && topic.forEach(menu => {
      urlTopic === menu.file && call(content, json[menu.label], json.subtitle, json.tip, menu.label, urlTopic)
    })
  }
}

const renderPageInterface = (json, page, urlTopic) => {
  const content = 'interfaceContent'
  filterTopic(json, page, urlTopic, listInterface, content)
}

const renderPageFunctions = (json, page, urlTopic) => {  
  const content = 'functionsContent'
  filterTopic(json, page, urlTopic, listFunctions, content)
}

const attracInfo = (info) =>  info
.replace(/(\[)|(\])|(\<)|(\>)/g, '')
.replace('Promise', '')
.replace('&#62;', '')
.replace('&#60;', '')

const listInterface = (category, list, subtitle, tip, topic) => {  
  const content = document.querySelector(`#${category}`)
  if (!!content) {
    const [init] = content.children
    content.innerHTML = ''
    content.appendChild(init)
    const title = category === 'interfaceContent' ? document.querySelector("#interfaceSubTitle") : undefined
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
    if (!!title) {
      title.innerHTML = topic
    }
  }
}

const listFunctions = (category, list, subtitle, tip, topic, urlTopic) => {
  const content = document.querySelector(`#${category}`)
  if (!!content) {
    const [init] = content.children
    content.innerHTML = ''
    content.appendChild(init)
    const title = category === 'functionsContent' ? document.querySelector("#functionsSubTitle") : undefined
    const sub = document.querySelector(`#subtitle`)
    const tipcontent = document.querySelector(`#tip`)

    for (const { functionMethod, input, output, description } of list) {
      const titleContent = (info, second) => `<div title-col="15"><strong ${second && 'title-col-second'}>${
       (second && urlTopic !== 'gachaSystem') 
       ? `<a no-effect pointer href="?page=interface&&topic=${urlTopic}&&attrac=${attracInfo(info)}">${info}</a>`
       : info
      }</strong></div>`
      
      const constructor = `<div class="cardContent">${
        titleContent(functionMethod, false) + titleContent(input, true) + titleContent(output, true)
      }<div descript-col>${description}</div></div>` 

      content.innerHTML += constructor 
      sub.innerHTML = subtitle
      tipcontent.innerHTML = tip
    }
    if (!!title) {
      title.innerHTML = topic
    }
  }
}
