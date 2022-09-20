import numNights from "../utilities/numNights";

describe("numNights Function Unit Testing: ", () => {
  it("Boundary Value (today and tomorrow)", () => {
    let today = new Date().toString();
    let tomorrow = new Date(Date.parse(today) + 3600 * 1000 * 24).toString();
    let diff = numNights(today, tomorrow);
    expect(diff).toEqual(1);
  });
  //
  it("Middle Value (today and some other day after today)", () => {
    let nights = 5;
    let today = new Date().toString();
    let someday = new Date(
      Date.parse(today) + 3600 * 1000 * 24 * nights
    ).toString();
    console.log(today, someday);
    var diff = numNights(today, someday);
    expect(diff).toEqual(5);
  });

  it("Boundary Value (invalid)", () => {
    let today = new Date().toString();
    let tomorrow = new Date(Date.parse(today) + 3600 * 1000 * 24).toString();
    let diff = numNights(tomorrow, today);
    expect(diff).toEqual(null);
  });
});
