const selectedCardTemplate = (card) => {
  return `
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-488x680">
              <img src="${card.image_uris?.small || CARDBACKIMG}" alt="Image">
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
}
