const filterFunctions = (functionMethod, input, output, description, value) => 
  (functionMethod.toLowerCase()).includes(value.toLowerCase()) 
  || (input.toLowerCase()).includes(value.toLowerCase()) 
  || (output.toLowerCase()).includes(value.toLowerCase()) 
  || (description.toLowerCase()).includes(value.toLowerCase())

const filterInterface = (title, description, value) => 
  !!(title.toLowerCase()).includes(value.toLowerCase())
  || description.filter(({ prop, type }) => 
    (prop.toLowerCase()).includes(value.toLowerCase())
    || (type.toLowerCase()).includes(value.toLowerCase())
    )[0] 

const filterTutorial = (contentJson, value) => contentJson.filter(
  ({subtitle, subDescription, titleStep, StepDescription, clipBoard, codeBoard}) =>
    !!subtitle && (subtitle.toLowerCase()).includes(value.toLowerCase()) 
    ||  !!subDescription && (subDescription.toLowerCase()).includes(value.toLowerCase()) 
    ||  !!titleStep && (titleStep.toLowerCase()).includes(value.toLowerCase()) 
    ||  !!StepDescription && (StepDescription.toLowerCase()).includes(value.toLowerCase()) 
    ||  !!clipBoard && (clipBoard.toLowerCase()).includes(value.toLowerCase()) 
    ||  !!codeBoard[0] && (codeBoard.some(line => (line.toLowerCase()).includes(value.toLowerCase()))) 
  )

const filterReform = ({ subtitle, body, value }) => {
  const filterBody = body.filter(({ register, content}) =>
  (register.toLowerCase()).includes(value.toLowerCase())
  || (content.toLowerCase()).includes(value.toLowerCase())
  )
  return !!filterBody[0]
    ? [{ subtitle: setMark(subtitle, value), body: filterBody.map(({ register, content}) => ({
        register: setMark(register, value),
        content: setMark(content, value)
    })) }]
    : []
}

const setMark = (info, value) => {
  const renderMark = (info.toLowerCase()).replace(value.toLowerCase(), '<mark>$&</mark>')
  const getInitMark = renderMark.indexOf('<mark>')
  const getInitCloseMark = renderMark.indexOf('</mark>')
  if (getInitMark !== -1 && getInitCloseMark !== -1) {
    return info.slice(0, getInitMark) + '<mark>' + info.slice(getInitMark, getInitCloseMark) + '</mark>' + info.slice(getInitCloseMark)
  }
  return info
}

const markEncounterInterface = (json, value) => !!json[0] 
  ? json.map(({ title, description }) => ({
      title: setMark(title, value),
      description: description.map(({ prop, type }) => ({
        prop: setMark(prop, value),
        type: setMark(type, value)
      }))
    }))
  : json

const markEncounterFunctions = (json, value) => !!json[0] 
  ? json.map(({ functionMethod, input, output, description }) => ({
      functionMethod: setMark(functionMethod, value),
      input: setMark(input, value),
      output: setMark(output, value),
      description: setMark(description, value)
    }))
  : json

const markEncounterTutorial = (json, value) => !!json[0] 
  ? json.map(({ subtitle, subDescription, titleStep, StepDescription, clipBoard, codeBoard }) => ({
      subtitle: !!subtitle ? setMark(subtitle, value) : undefined,
      subDescription: !!subDescription ? setMark(subDescription, value) : undefined,
      titleStep: !!titleStep ? setMark(titleStep, value) : undefined,
      StepDescription: !!StepDescription ? setMark(StepDescription, value) : undefined,
      clipBoard: !!clipBoard ? setMark(clipBoard, value) : undefined,
      codeBoard: !!codeBoard[0] ? codeBoard.map(info => setMark(info, value)) : []
    }))
  : json

const clearSearch = () => {
  document.querySelector('.functSearchPuzzle').style.display = 'none'
  document.querySelector('.functSearchPuzzle').style.display = 'none'
  document.querySelector('.functSearchMethods').style.display = 'none'
  document.querySelector('.functSearchfHelps').style.display = 'none'
  document.querySelector('.functSearchGachaSystem').style.display = 'none'
  document.querySelector('.InterSearchPuzzle').style.display = 'none'
  document.querySelector('.InterSearchModules').style.display = 'none'
  document.querySelector('.InterSearchMethods').style.display = 'none'
  document.querySelector('.InterSearchfHelps').style.display = 'none'
  document.querySelector('#TutorialSearch').style.display = 'none'
  document.querySelector('#ReformsSearchs').style.display = 'none'  
}

const searching = (interface, functions, tutorial, reform, value) => {
  value = value.replace('<', '&#60;')
  value = value.replace('>', '&#62;')
  const functPuzzle = markEncounterFunctions(functions.PuzzleTables.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))), value)
  const functModules = markEncounterFunctions(functions.Modules.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))), value)
  const functMethods = markEncounterFunctions(functions.Methods.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))), value)
  const functfHelps = markEncounterFunctions(functions.fHelps.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))), value)
  const functGacha = markEncounterFunctions(functions.GachaSystem.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))), value)
  const interPuzzle = markEncounterInterface(interface.PuzzleTables.filter(({ title, description }) => filterInterface(title, description, value)), value)
  const interModules = markEncounterInterface(interface.Modules.filter(({ title, description }) => filterInterface(title, description, value)), value)
  const interMatch = markEncounterInterface(interface.Methods.filter(({ title, description }) => filterInterface(title, description, value)), value)
  const interfHelps = markEncounterInterface(interface.fHelps.filter(({ title, description }) => filterInterface(title, description, value)), value)
  const tutorialFilter = markEncounterTutorial(tutorial.body.reduce((prev, { content }) => !!prev[0] ? [...prev, ...filterTutorial(content, value )] : [...filterTutorial(content, value )], []), value)
  const reformFilter = reform.reform.reduce((prev, current) => !!prev[0] ? [...prev, ...filterReform({ ...current, value: value })] : filterReform({ ...current, value: value }), [])

  !!functPuzzle[0] && (
    document.querySelector('.functSearchPuzzle').style.display = 'unset', listFunctions('PuzzleTablesfunctSearch', functPuzzle, '', '')
  )
  !!functModules[0] && (
    document.querySelector('.functSearchPuzzle').style.display = 'unset', listFunctions('ModulesfunctSearch', functModules, '', '')
  )
  !!functMethods[0] && (
    document.querySelector('.functSearchMethods').style.display = 'unset', listFunctions('MethodsfunctSearch', functMethods, '', '')
  )
  !!functfHelps[0] && (
    document.querySelector('.functSearchfHelps').style.display = 'unset', listFunctions('fHelpsfunctSearch', functfHelps, '', '')
  )
  !!functGacha[0] && (
    document.querySelector('.functSearchGachaSystem').style.display = 'unset', listFunctions('GachaSystemfunctSearch', functGacha, '', '')
  )
  !!interPuzzle[0] && (
    document.querySelector('.InterSearchPuzzle').style.display = 'unset', listInterface('PuzzleTablesInterSearch', interPuzzle, '', '')
  )
  !!interModules[0] && (
    document.querySelector('.InterSearchModules').style.display = 'unset', listInterface('ModulesInterSearch', interModules, '', '')
  )
  !!interMatch[0] && (
    document.querySelector('.InterSearchMethods').style.display = 'unset', listInterface('MethodsInterSearch', interMatch, '', '')
  )
  !!interfHelps[0] && (
    document.querySelector('.InterSearchfHelps').style.display = 'unset', listInterface('fHelpsInterSearch', interfHelps, '', '')
  )
  !!tutorialFilter[0] && (
    document.querySelector('#TutorialSearch').style.display = 'unset', listTutorial('TutorialSearch', tutorialFilter, undefined, undefined, undefined)
  )
  !!reformFilter[0] && (
    document.querySelector('#ReformsSearchs').style.display = 'unset', listReform('ReformsSearchs', reformFilter)
  )


  if (
    !functPuzzle[0] && !functModules[0] && !functMethods[0] && !functfHelps[0] && !functGacha[0]
    && !interPuzzle[0] && !interModules[0] && !interMatch[0] && !interfHelps[0] && !tutorialFilter[0] && !reformFilter[0]
  ) {
    clearSearch()
    document.querySelector('.NoFound').style.display = 'flex'
  }
  document.querySelector('.searchLoading').style.visibility = 'hidden'
}

const openSearching = async (value) => {
  const searchingInterface = await jsonInterface
  const searchingFunctions = await jsonFunctions
  const searchingTutorial = await jsonTutorial  
  const searchReform = await jsonReform  
  const contentSearch = document.querySelector('.contentSearch')
  const contentPage = document.querySelector('.contentPage')  
  const xhttp = new XMLHttpRequest()

  if (value !== '' && !!value && value) {
    contentSearch.style.display = 'flex'
    contentPage.style.display = 'none'

    xhttp.onreadystatechange = async function() {
      if (this.readyState == 4) {
        if (this.status == 200) { 
          contentSearch.innerHTML = this.responseText
          document.querySelector('.NoFound').style.display = 'none'
          clearSearch()
          document.querySelector('.searchLoading').style.visibility = 'visible'
          searching(searchingInterface, searchingFunctions, searchingTutorial, searchReform, value)
          document.querySelector('.searchbtnIcon').innerHTML = `<span onclick='closeSearch()'>X</span>`
        }
        if (this.status == 404) {           
          contentSearch.innerHTML = `<div class="NoFound"><div class="NoFoundSVG" alt="noFound"></div><span>Page not found!</span></div>` 
          document.querySelector('.NoFound').style.display = 'flex'
        }
      }
    }

    xhttp.open("GET", `./pages/search`, true)
    xhttp.send()

  } else {
    document.querySelector('.searchbtnIcon').innerHTML = `<div class="searchIcon"></div>`
    contentSearch.style.display = 'none'
    contentPage.style.display = 'unset'
  }
}

const closeSearch = () => {
  document.querySelector('.searchInput').value = ''
  getSearch('')
  document.querySelector('.searchbtnIcon').innerHTML = `<div class="searchIcon"></div>`
}

const getSearch = (value) => {
  openSearching(value).catch(er => console.log('Searching Error:', er))
}

const setSearch = (value) => {
  document.querySelector('.searchInput').value = value
  getSearch(value)
}
