const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
  onEnter,
}) => {
  root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (e) => {
    const items = await fetchData(e.target.value);
    removeAllChildNodes(resultsWrapper);
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    dropdown.classList.add("is-active");

    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));
  if (onEnter) input.addEventListener("keydown", async (e) => {
    if (e.key === 'Enter') {
      dropdown.classList.remove("is-active")
      const items = await fetchData(e.target.value)
      onEnter(items, onOptionSelect)
    }
  })

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) dropdown.classList.remove("is-active");
  });
};
