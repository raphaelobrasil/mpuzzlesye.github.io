const getJsonInfo = async (fileJson) => {
  const json = await fetch(`./pages/${fileJson}/${fileJson}.json`)
    .then(response => response.json())
    .catch(err => {
    console.log('Não foi possível carregar Json, error:', err)
    return null
  })
  return json
}  
const jsonInterface = getJsonInfo('interface').then(response => response)
const jsonFunctions = getJsonInfo('functions').then(response => response)  
const jsonTutorial = getJsonInfo('tutorial').then(response => response)  

const formatOption = (file, label) => ({ file, label })

const options = [
  {
    ...formatOption('home', 'Home'),
    call: (_json) => null,
    json: {},
    topic: []
  },
  {
    ...formatOption('tutorial', 'Tutorial'),
    call: (json, page, topic) => renderPageTutorial(json, page, topic),
    json: jsonTutorial,
    topic: [
      formatOption('introduction', 'Introduction'),
      formatOption('matchs', 'Matchs'),
      formatOption('categoryeffects', 'Category Effects'),
      formatOption('rebuildingtable', 'Rebuilding table'),
      formatOption('endtoend', 'End-To-End'),
      formatOption('tips', 'Tips')
    ]
  },
  {
    ...formatOption('interface', 'Interface'),
    call: (json, page, topic) => renderPageInterface(json, page, topic),
    json: jsonInterface,
    topic: [
      formatOption('puzzleTable', 'PuzzleTables'),
      formatOption('modules', 'Modules'),
      formatOption('methods', 'Methods'),
      formatOption('fhelps', 'fHelps')
    ]
  },
  {
    ...formatOption('functions', 'Functions'),
    call: (json, page, topic) => renderPageFunctions(json, page, topic),
    json: jsonFunctions,
    topic: [
      formatOption('puzzleTable', 'PuzzleTables'),
      formatOption('modules', 'Modules'),
      formatOption('gachaSystem', 'GachaSystem'),
      formatOption('methods', 'Methods'),
      formatOption('fhelps', 'fHelps')
    ]
  },
  {
    ...formatOption('reform', 'Reform'),
    call: (_json) => null,
    json: {},
    topic: []
  }
]
