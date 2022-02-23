const BASEURL = "https://api.scryfall.com";
const SEARCHEND = "/cards/search";
const AUTOCOMPLETE = "/cards/autocomplete";
const CARDS = "/cards/";
const CARDBACKIMG = 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest?cb=20140813141013'
const root = document.querySelector(".autocomplete");
const onCardSelect = async (card, summaryElement) => {
  const response = await axios.get(BASEURL + CARDS + card.id);
  summaryElement.innerHTML = cardTemplate(response.data);
}
const cardTemplate = (card) => {
  return `
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-488x680">
            <img src="${card.image_uris.small}" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>${card.name}</strong> <small>${card.mana_cost}</small>
              <br>
              <small>${card.type_line}</small>
              <br>
              <div class="box">${card.oracle_text}</div>
              <br>
              ${card.set_name}
              <br>
              <small>card number: ${card.collector_number}</small>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="reply">
                <span class="icon is-small">
                  <i class="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="retweet">
                <span class="icon is-small">
                  <i class="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like">
                <span class="icon is-small">
                  <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  `
};
const autoCompleteConfig = {
  root,
  renderOption: (card) => {
    const poster = card.image_uris?.small || CARDBACKIMG;
    return `
          <img src="${poster}" class="image is-146x204"/>
          <p>${card.name} (${card.set_name})</p>
      `;
  },
  inputValue: (card) => {
    return card.name;
  },
  fetchData: async (searchTerm) => {
    const response = await axios.get(BASEURL + SEARCHEND, {
      params: {
        q: searchTerm,
      },
    });

    if (response.data.Error) return [];

    console.log(response.data.data);

    return response.data.data;
  },
  onOptionSelect: (card) => {
    onCardSelect(card, document.querySelector("#results"));
  },
  onEnter: (cardList, onOptionSelect) => {
    const resultsDiv = document.querySelector('#results')
    
    removeAllChildNodes(resultsDiv)
    
    cardList.forEach(card => {
      const img = document.createElement('img')
      img.src = card.image_uris?.small
      img.addEventListener('click', () => {onOptionSelect(card)})
      resultsDiv.appendChild(img)
    })
  }
};

createAutoComplete(autoCompleteConfig);