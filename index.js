const BASEURL = "https://api.scryfall.com";
const SEARCHEND = "/cards/search";
const AUTOCOMPLETE = "/cards/autocomplete";
const CARDS = "/cards/";

// const fetchData = async (searchTerm) => {
//   const response = await axios.get(BASEURL + SEARCHEND, {
//     params: {
//       q: searchTerm,
//     },
//   });
//   console.log(response.data);
//   const firstCard = response.data.data[0];
//   console.log(firstCard);
//   const tester = document.querySelector("#testdiv");
//   const card = document.createElement("div");
//   const imageSource = firstCard.image_uris.small;
//   //card.innerHTML = ` <img src="${imageSource}"/>`;
//   tester.appendChild(card);
//   const images = Object.keys(firstCard.image_uris);
//   images.forEach((prop) => {
//     const img = document.createElement("img");
//     const p = document.createElement("p");
//     p.innerText = prop;
//     img.src = firstCard.image_uris[prop];
//     card.appendChild(img);
//     card.appendChild(p);
//   });
// };
const root = document.querySelector(".autocomplete");
const autoCompleteConfig = {
  root,
  renderOption: (card) => {
    const poster = card.image_uris.small;
    return `
          <img src="${poster}"/>
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
    // document.querySelector(".tutorial").classList.add("is-hidden");
    onCardSelect(card, document.querySelector("#selected"));
  },
};

createAutoComplete(autoCompleteConfig);

const onCardSelect = async (card, summaryElement) => {
  const response = await axios.get(BASEURL + CARDS + card.id);

  console.log(response);
  // summaryElement.innerHTML = response.data.name;

  summaryElement.innerHTML = cardTemplate(response.data);

  // if (side === "left") cardLeft = card;
  // else cardRight = card;

  // if (cardLeft && cardRight) runComparison(cardLeft, cardRight);
};

const cardTemplate = (card) => {
  return `<div class="box">
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
</div>`;
};
