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

const searching = async (value) => {
  const searchingInterface = await jsonInterface
  const searchingFunctions = await jsonFunctions
  const contentSearch = document.querySelector('.contentSearch')
  const contentPage = document.querySelector('.contentPage')

  if (value !== '' && value !== undefined && value) {
      contentSearch.style.display = 'flex'
      contentPage.style.display = 'none'
      console.log('puzzle Functions', searchingFunctions.PuzzleTables.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
      console.log('Modules Functions', searchingFunctions.Modules.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
      console.log('Match3 Functions', searchingFunctions.Match3.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
      console.log('GachaSystem Functions', searchingFunctions.GachaSystem.filter((({ functionMethod, input, output, description }) => filterFunctions(functionMethod, input, output, description, value))))
      
      console.log('puzzle interface', searchingInterface.PuzzleTables.filter(({ title, description }) => filterInterface(title, description, value)))
      console.log('modules interface', searchingInterface.Modules.filter(({ title, description }) => filterInterface(title, description, value)))
      console.log('match3 interface', searchingInterface.Match3.filter(({ title, description }) => filterInterface(title, description, value)))
  } else {
      contentSearch.style.display = 'none'
      contentPage.style.display = 'unset'
  }
}

const getSearch = (value) => {
  searching(value).catch(er => console.log('Searching Error:', er))
}

