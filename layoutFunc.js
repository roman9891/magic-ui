const layout = (card) => {
  imageURI = ["normal"];
  let poster = "";
  if (card.layout == !imageURI) poster = card.image_uris.small;
  return poster;
};
//
