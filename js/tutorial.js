const renderPageTutorial = (json, page, urlTopic) => {
  const content = 'contentTutorial'
  for (const { file, topic } of options) {
    page === file && topic.forEach(menu => {
      urlTopic === menu.file && json.body.forEach(info => 
          info.menu === urlTopic && 
            listTutorial(content, info.content, menu.label, json.description, json.cardAlert)
        )
    })
  }
}

const render_cardInfo = (value) => `
<div class="tableContent" style="width: 95%;">
    <div class="cardContent">
        <div descript-col style="max-width: 100%;">
          ${value}
        </div>
    </div>
</div>`
const render_subtitle = (value) => `<div title-sub>${value}</div>`
const render_sectiondescr = (value) => `<div id="subtitle-description" section-description>${value}</div>`
const render_codeBoard = (codeLine, codeCopy, key) => `
<div class="codeBoard">
<div id="copySucess">Copiado com sucesso! <div id="closeNotification" onclick="clearNotification()">x</div></div>
<div
    onclick="clipBoardEffect(` + '`' + codeCopy + '`' + `, 'clip-${key}')"
    svg clip="no"
    id="clip-${key}"
    alt="copiar"
></div>
${codeLine}
</div>`
const render_codeLine = (value) => `
<div flexr>
    <div class="simbol">$</div>
    <div class="codeScope">
        <div>${value}</div>
    </div>
</div>`


const tutorial_header = (contentName, description, cardAlert) => {
  const subtitle = document.querySelector(`#tutorial-description`)
  const content = document.querySelector(`#${contentName}`)
  if (contentName === 'contentTutorial' && !!content && !!cardAlert) {
    content.innerHTML = ''
    content.innerHTML = render_cardInfo(cardAlert)
  } 
  if (!!subtitle && !!description) {
    subtitle.innerHTML = ''
    subtitle.innerHTML = description
  }
}

const tutorial_rodape = (contentName, label) => {
  const content = document.querySelector(`#ArrowTutorialMove`)
  if (!!content && contentName) {
    content.innerHTML = ''
    for (const option of options) {
      if (option.label === "Tutorial") {
        const index = option.topic.findIndex(menu => menu.label === label)
        const left = index >= 1 
          ? `<a no-effect href="?page=tutorial&&topic=${option.topic[index-1].file}"><div svg class="arrow" alt='${option.topic[index-1].label}'></div></a>`
          : ''
        const right = index + 1 < option.topic.length
          ? `<a no-effect href="?page=tutorial&&topic=${option.topic[index+1].file}"><div svg rotate="180" class="arrow" alt='${option.topic[index+1].label}'></div></a>`
          : ''
        content.innerHTML = `<div flexr-center svg_bg_change>${left}${right}</div>`
      }
    }
  }  
}

const listTutorial = (contentName, json, label, descriptionPage, cardAlert) => {
  label === 'Introduction' 
    ? tutorial_header(contentName, descriptionPage, cardAlert)
    : tutorial_header(undefined, render_subtitle(label), undefined)
  const content = document.querySelector(`#${contentName}`)
  json.forEach(({ subtitle, subDescription, titleStep, StepDescription, clipBoard, codeBoard }, key) => {
    let sub_title = ''
    let sub_desc = ''
    let title_step = ''
    let desc_step = ''
    let clip_board = ''
    let code_Board = ''
    if (!!content) {
      sub_title = !!subtitle ? render_subtitle(subtitle) : ''
      sub_desc = !!subDescription ? render_sectiondescr(subDescription) : ''
      title_step = !!titleStep ? render_subtitle(titleStep) : ''
      desc_step = !!StepDescription ? render_sectiondescr(StepDescription) : ''
      codeBoard?.forEach(line => {
        code_Board += render_codeLine(line)
      })
      clip_board = clipBoard ? render_codeBoard(code_Board, clipBoard, key) : ''
    }
    content.innerHTML += sub_title + sub_desc + title_step + desc_step + clip_board + `<br/><br/>`
  })
  tutorial_rodape(contentName, label)
}
  