const debounce = (func, delay = 1000) => {
  let timeoutID

  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const BASEURLGATHERER = 'https://api.magicthegathering.io/v1/'
const CARDSGATHERER = '/cards'

const gathererFetch = async (searchTerm) => {
  const response = await axios.get(BASEURL + CARDS, {
    params: {
      name: searchTerm,
    },
  })

  console.log(response.data)
}
