const root = document.querySelector('.autocomplete')

const renderOption = (card) => {
  const poster = card.image_uris?.small || CARDBACKIMG
  return `
            <img src="${poster}" class="image is-146x204"/>
            <p>${card.name} (${card.set_name})</p>
        `
}

const inputValue = (card) => card.name

const onOptionSelect = (card) =>
  onCardSelect(card, document.querySelector('#results'))

const onCardSelect = async (card, summaryElement) => {
  const response = await axios.get(BASEURL + CARDS + card.id)
  summaryElement.innerHTML = selectedCardTemplate(response.data)
}

const onEnter = (cardList, onOptionSelect) => {
  const resultsDiv = document.querySelector('#results')

  removeAllChildNodes(resultsDiv)

  for (let i = 0; i < 4; i++) {
    const column = document.createElement('div')
    column.classList.add('column')
    resultsDiv.appendChild(column)
  }

  cardList.forEach((card, i) => {
    let x = i % resultsDiv.children.length

    const div = document.createElement('div')
    div.classList.add('block')
    const img = document.createElement('img')

    img.src = card.image_uris?.normal || CARDBACKIMG
    img.addEventListener('click', () => {
      onOptionSelect(card)
    })

    div.appendChild(img)
    resultsDiv.children[x].appendChild(div)
  })
}

const autoCompleteConfig = {
  root,
  renderOption,
  inputValue,
  fetchData,
  onOptionSelect,
  onEnter,
}
