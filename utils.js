const debounce = (func, delay = 1000) => {
  let timeoutID;

  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const runComparison = (cardLeft, cardRight) => {
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification "
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification "
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftStatValue = parseInt(leftStat.dataset.value);
    const rightStatValue = parseInt(rightStat.dataset.value);

    if (leftStatValue > rightStatValue) {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    } else if (leftStatValue < rightStatValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    }
    console.log(leftStatValue, rightStatValue);
  });
};

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
    value = parseInt(word);
    if (!isNaN(value)) return prev + value;
    else return prev;
  }, 0);

  return `
      <article class="media">
          <figure class="media-left">
          <p class="image">
              <img src="${movieDetail.Poster}" />
          </p>
          </figure>
          <div class="media-content">
          <div class="content">
              <h1>${movieDetail.Title}</h1>
              <h4>${movieDetail.Genre}</h4>
              <p>${movieDetail.Plot}</p>
          </div>
          </div>
      </article>
      <article data-value=${awards} class="notification is-primary">
          <p class="title">${movieDetail.Awards}</p>
          <p class="subtitle">Awards</p>
      </article>
      <article data-value=${dollars} class="notification is-primary">
          <p class="title">${movieDetail.BoxOffice}</p>
          <p class="subtitle">Box Office</p>
          </article>
      <article data-value=${metascore} class="notification is-primary">
          <p class="title">${movieDetail.Metascore}</p>
          <p class="subtitle">Metascore</p>
      </article>
      <article data-value=${imdbRating} class="notification is-primary">
          <p class="title">${movieDetail.imdbRating}</p>
          <p class="subtitle">IMDB Rating</p>
      </article>
      <article data-value=${imdbVotes} class="notification is-primary">
          <p class="title">${movieDetail.imdbVotes}</p>
          <p class="subtitle">IMDB Votes</p>
      </article>
  `;
};
