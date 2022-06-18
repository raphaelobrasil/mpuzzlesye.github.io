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
}

const searching = (interface, functions, value) => {
  value = value.replace('<', '&#60;')
  value = value.replace('>', '&#62;')
  const functPuzzle = functions.PuzzleTables.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functModules = functions.Modules.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functMethods = functions.Methods.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functfHelps = functions.fHelps.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functGacha = functions.GachaSystem.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const interPuzzle = interface.PuzzleTables.filter(({ title, description }) => filterInterface(title, description, value))
  const interModules = interface.Modules.filter(({ title, description }) => filterInterface(title, description, value))
  const interMatch = interface.Methods.filter(({ title, description }) => filterInterface(title, description, value))
  const interfHelps = interface.fHelps.filter(({ title, description }) => filterInterface(title, description, value))

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
  if (
    !functPuzzle[0] && !functModules[0] && !functMethods[0] && !functfHelps[0] && !functGacha[0]
    && !interPuzzle[0] && !interModules[0] && !interMatch[0] && !interfHelps[0]
  ) {
    clearSearch()
    document.querySelector('.NoFound').style.display = 'flex'
  }
  document.querySelector('.searchLoading').style.visibility = 'hidden'
}

const openSearching = async (value) => {
  const searchingInterface = await jsonInterface
  const searchingFunctions = await jsonFunctions
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
          searching(searchingInterface, searchingFunctions, value)
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