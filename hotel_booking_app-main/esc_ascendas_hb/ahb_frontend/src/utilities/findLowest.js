const findLowestPrice = (roomArr) => {
  var min_price = Infinity;
  if (roomArr == null || roomArr === []) return null;
  roomArr.forEach((element) => {
    if (element.price < min_price && element.price > 0)
      min_price = element.price;
  });
  if (min_price === Infinity) return "error";
  return min_price;
};

export default findLowestPrice;
