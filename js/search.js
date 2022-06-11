const filterFunctions = (functionMethod, input, output, description, value) => 
  (functionMethod.toLowerCase()).includes(value.toLowerCase()) 
  || (input.toLowerCase()).includes(value.toLowerCase()) 
  || (output.toLowerCase()).includes(value.toLowerCase()) 
  || (description.toLowerCase()).includes(value.toLowerCase())

const filterInterface = (title, description, value) => 
  (title.toLowerCase()).includes(value.toLowerCase())
  || description.filter(({ prop, type }) => 
    (prop.toLowerCase()).includes(value.toLowerCase())
    || (type.toLowerCase()).includes(value.toLowerCase())
    )[0] !== undefined 

const clearSearch = () => {
  document.querySelector('.functSearchPuzzle').style.display = 'none'
  document.querySelector('.functSearchPuzzle').style.display = 'none'
  document.querySelector('.functSearchMatch3').style.display = 'none'
  document.querySelector('.functSearchGachaSystem').style.display = 'none'
  document.querySelector('.InterSearchPuzzle').style.display = 'none'
  document.querySelector('.InterSearchModules').style.display = 'none'
  document.querySelector('.InterSearchMatch3').style.display = 'none'
}

const searching = (interface, functions, value) => {
  const functPuzzle = functions.PuzzleTables.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functModules = functions.Modules.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functMatch = functions.Match3.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const functGacha = functions.GachaSystem.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value)))
  const interPuzzle = interface.PuzzleTables.filter(({ title, description }) => filterInterface(title, description, value))
  const interModules = interface.Modules.filter(({ title, description }) => filterInterface(title, description, value))
  const interMatch = interface.Match3.filter(({ title, description }) => filterInterface(title, description, value))

  functPuzzle[0] !== undefined && (
    document.querySelector('.functSearchPuzzle').style.display = 'unset', listFunctions('PuzzleTablesfunctSearch', functPuzzle, '', '')
  )
  functModules[0] !== undefined && (
    document.querySelector('.functSearchPuzzle').style.display = 'unset', listFunctions('ModulesfunctSearch', functModules, '', '')
  )
  functMatch[0] !== undefined && (
    document.querySelector('.functSearchMatch3').style.display = 'unset', listFunctions('Match3functSearch', functMatch, '', '')
  )
  functGacha[0] !== undefined && (
    document.querySelector('.functSearchGachaSystem').style.display = 'unset', listFunctions('GachaSystemfunctSearch', functGacha, '', '')
  )
  interPuzzle[0] !== undefined && (
    document.querySelector('.InterSearchPuzzle').style.display = 'unset', listInterface('PuzzleTablesInterSearch', interPuzzle, '', '')
  )
  interModules[0] !== undefined && (
    document.querySelector('.InterSearchModules').style.display = 'unset', listInterface('ModulesInterSearch', interModules, '', '')
  )
  interMatch[0] !== undefined && (
    document.querySelector('.InterSearchMatch3').style.display = 'unset', listInterface('Match3InterSearch', interMatch, '', '')
  )
  if (
    functPuzzle[0] === undefined && functModules[0] === undefined && functMatch[0] === undefined && functGacha[0] === undefined
    && interPuzzle[0] === undefined && interModules[0] === undefined && interMatch[0] === undefined
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

  if (value !== '' && value !== undefined && value) {
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

    xhttp.open("GET", `./pages/search/search.html`, true)
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
