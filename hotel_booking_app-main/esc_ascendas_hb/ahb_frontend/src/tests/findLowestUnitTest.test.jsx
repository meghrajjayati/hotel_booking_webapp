import findLowestPrice from "../utilities/findLowest";

describe("findLowestPrice Function Unit Test", () => {
  it("Prices in increasing order", () => {
    let c = 10;
    let arr = [];
    for (let i = 0; i < c; i++) {
      arr.push({
        price: i + 1,
      });
    }
    let lowest = findLowestPrice(arr);
    expect(lowest).toEqual(1);
  });

  it("Prices in decreasing order", () => {
    let c = 10;
    let arr = [];
    for (let i = c; i > -1; i--) {
      arr.push({
        price: i + 1,
      });
    }
    let lowest = findLowestPrice(arr);
    expect(lowest).toEqual(1);
  });

  it("Prices with some negative values", () => {
    let priceArr = [1, 2, 3, 4, -1, -2, 3, -4];
    let arr = [];
    for (let i = 0; i < priceArr.length; i++) {
      arr.push({
        price: priceArr[i],
      });
    }
    let lowest = findLowestPrice(arr);
    expect(lowest).toEqual(1);
  });

  it("Prices with a negative value", () => {
    let priceArr = [5, 2, 3, 4, -500, 53, 22];
    let arr = [];
    for (let i = 0; i < priceArr.length; i++) {
      arr.push({
        price: priceArr[i],
      });
    }
    let lowest = findLowestPrice(arr);
    expect(lowest).toEqual(2);
  });

  it("Prices with all negative values", () => {
    let priceArr = [-5, -2, -3, -4, -500, -53, -22];
    let arr = [];
    for (let i = 0; i < priceArr.length; i++) {
      arr.push({
        price: priceArr[i],
      });
    }
    let lowest = findLowestPrice(arr);
    expect(lowest).toEqual("error");
  });

  it("no prices in array", () => {
    let arr = [];
    let lowest = findLowestPrice(arr);
    expect(lowest).toEqual("error");
  });
});
