const BASEURL = "https://api.scryfall.com";
const SEARCHEND = "/cards/search";
const AUTOCOMPLETE = "/cards/autocomplete";
const CARDS = "/cards/";
const CARDBACKIMG =
  "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest?cb=20140813141013";

const fetchData =  async (searchTerm) => {
    const response = await axios.get(BASEURL + SEARCHEND, {
        params: {
        q: searchTerm,
        },
    });

    if (response.data.Error) return [];

    console.log(response.data.data);

    return response.data.data;
}