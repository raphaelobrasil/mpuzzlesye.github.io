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

const searching = (interface, functions, searchPage, mainPage, value) => {

  console.log('puzzle Functions', functions.PuzzleTables.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
  console.log('Modules Functions', functions.Modules.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
  console.log('Match3 Functions', functions.Match3.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
  console.log('GachaSystem Functions', functions.GachaSystem.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
  
  console.log('puzzle interface', interface.PuzzleTables.filter(({ title, description }) => filterInterface(title, description, value)))
  console.log('modules interface', interface.Modules.filter(({ title, description }) => filterInterface(title, description, value)))
  console.log('match3 interface', interface.Match3.filter(({ title, description }) => filterInterface(title, description, value)))

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
          searching(searchingInterface, searchingFunctions, contentSearch, contentPage, value)
        }
        if (this.status == 404) { contentSearch.innerHTML = `Page not found.` }
      }
    }

    xhttp.open("GET", `./pages/search/search.html`, true)
    xhttp.send()

  } else {
    contentSearch.style.display = 'none'
    contentPage.style.display = 'unset'
  }
}

const getSearch = (value) => {
  openSearching(value).catch(er => console.log('Searching Error:', er))
}

getSearch('ra')

