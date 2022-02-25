const advancedSearchRoot = document.querySelector('#advanced-search')

const inputTypesArray = ["Name", "Type", "Text"]

const onSubmit = async (formData) => {
    let searchTerm = queryAssemble(formData)
    const response = await axios.get(BASEURL + SEARCHEND, {
      params: {
        q: searchTerm
      }
    })

    autoCompleteConfig.onEnter(response.data.data, autoCompleteConfig.onOptionSelect)
}

const queryAssemble = formData => {
    let searchTerm = ''
  
    for (const key in formData) {
      switch (key) {
        case 'Name': {
          searchTerm += ` ${formData[key]}`
          break
        }
        case 'Type': {
          searchTerm += ` t:${formData[key]}`
          break
        }
        case 'Color': {
          searchTerm += ` ${formData[key]}`
          break
        }
        case 'Text': {
          const words = formData[key].split(' ')
          words.forEach(word => searchTerm += ` o:${word}`)
          break
        }
      }
    }
  
    return searchTerm
}

const advancedSearchFormConfig = {
    root: advancedSearchRoot,
    inputTypesArray,
    onSubmit,
}