import range from "../utilities/range";
//Range should return two arrays containing arbitrary Number values with total lengths depending on the start, end and maximum value parameters
describe("Range Function Unit Test: ", () => {
  it("Middle Value (valid)", () => {
    const [leftarr, rightarr] = range(0, 3, 5);
    expect(leftarr.length).toBe(3);
    expect(rightarr.length).toBe(2);
  });
  it("Min Value (valid)", () => {
    const [leftarr, rightarr] = range(0, 0, 5);
    expect(leftarr.length).toBe(0);
    expect(rightarr.length).toBe(5);
  });
  it("Max Value (valid)", () => {
    const [leftarr, rightarr] = range(0, 5, 5);
    expect(leftarr.length).toBe(5);
    expect(rightarr.length).toBe(0);
  });
  it("Boundary Value (invalid, end value = 6)", () => {
    const [leftarr, rightarr] = range(0, 6, 5);
    expect(leftarr.length).toBe(0);
    expect(rightarr.length).toBe(5);
    expect(rightarr).toEqual([0, 0, 0, 0, 0]);
  });

  it("Boundary Value(invalid, end value = -1)", () => {
    const [leftarr, rightarr] = range(0, -1, 5);
    expect(leftarr.length).toBe(0);
    expect(rightarr.length).toBe(5);
    expect(rightarr).toEqual([0, 0, 0, 0, 0]);
  });

  it("Boundary Value(invalid, start value = -1)", () => {
    const [leftarr, rightarr] = range(-1, 5, 5);
    expect(leftarr.length).toBe(0);
    expect(rightarr.length).toBe(5);
    expect(rightarr).toEqual([0, 0, 0, 0, 0]);
  });

  it("Boundary Value(invalid, end value < start value)", () => {
    const [leftarr, rightarr] = range(3, 2, 5);
    expect(leftarr.length).toBe(0);
    expect(rightarr.length).toBe(5);
    expect(rightarr).toEqual([0, 0, 0, 0, 0]);
  });
});
