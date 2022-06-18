const changeContent = (page='home', topic) => {
  const content = document.querySelector('.contentPage')
  const xhttp = new XMLHttpRequest()
  const url='./pages/'
  xhttp.onreadystatechange = async function() {
    if (this.readyState == 4) {
      if (this.status == 200) { 
        content.innerHTML = `<div class='${page}Class' >${this.responseText}</div>`
        for await (const option of options) { 
          const json = await option.json
          option.file === page && option.call(json, page, topic) 
        }
        anchorLink()
        setUrlBord(page)
      }
      if (this.status == 404) { 
        content.innerHTML = `<div class="NoFound"><div class="NoFoundSVG" alt="noFound"></div><span>Page not found!</span></div>` 
        document.querySelector('.NoFound').style.display = 'flex'
      }
    }
  }
  xhttp.open("GET", `${url}${page}`, true)
  xhttp.send()
}


const clipBoardEffect = (value, id) => {
  const content = document.querySelector(`#${id}`)
  const sucessCopy = document.querySelector('#copySucess')
  content.setAttribute('clip', 'yes')
  navigator.clipboard.writeText(value)
  sucessCopy.style.display = 'block'
}

const clearNotification = () => {
  const content = document.querySelectorAll(`[clip]`)
  const sucessCopy = document.querySelector('#copySucess')
  sucessCopy.style.display = 'none'
  content.forEach(node => node.setAttribute('clip', 'no'))

}

const effectHover = (border, svg, border_c, border_bg, svg_bg) => {
  border.style.border = `3px solid ${border_c}`;
  border.style.color = border_c;
  border.style.backgroundColor = border_bg;
  svg.style.backgroundColor = svg_bg;
}

const putHover = (type) => {
  const border = document.querySelector(`[border-${type}]`)
  const svgIcon = document.querySelector(`.${type}`)
  effectHover(border, svgIcon, color_second, color_main, color_second)
}

const outHover = (type) => {
  const border = document.querySelector(`[border-${type}]`)
  const svgIcon = document.querySelector(`.${type}`)
  effectHover(border, svgIcon, color_main, 'unset', color_main)
}

const setUrlBord = (page='home') => {
  if (page==='home') {
    for (const option of options) {
      const content = document.querySelector(`#urlBoard${option.file}`)
      const [topic] = option.topic
      !!content && content.setAttribute('href', `?page=${option.file}${option.file !== 'reform' ? '&&topic=' + topic.file : ''}`)
    }
  }
}