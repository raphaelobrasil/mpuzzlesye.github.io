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

const render_tableContent = (cards) => `
<div class="tableContent">
  ${cards}
</div>
`
const render_doubleCardContent20 = (register, description, tagFirst, tagSecond) => `
<div class="cardContent">
    <div title-col="20" flexr-center ${tagFirst}>${register}</div>
    <div descript-col ${tagSecond}>${description}</div>
</div>
`