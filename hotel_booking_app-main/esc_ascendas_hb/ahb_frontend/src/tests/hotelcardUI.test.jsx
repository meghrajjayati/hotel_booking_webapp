import React from "react";
import { render } from "@testing-library/react";
import Card from "../components/DestSearch/HotelCard";
import { MemoryRouter } from "react-router-dom";

describe("The Hotel Card Component", () => {
  //middle value
  let testHotel1 = {
    name: "myHotel",
    address: "421 Wallaby Way",
    rating: 4,
    price: 451,
    img: "../../public/images/img_not_found.png",
    latitude: 1.038,
    longitude: 1.2,
    trustyou: { score: { overall: 25 } },
  };

  let testHotel2 = { ...testHotel1, rating: 0 };
  let testHotel3 = { ...testHotel1, rating: 5 };
  let testHotel4 = { ...testHotel1, rating: -1 };
  let testHotel5 = { ...testHotel1, rating: 6 };

  it("should render testHotel1 content", () => {
    const component = render(<Card hotel={testHotel1} />, {
      wrapper: MemoryRouter,
    });
    expect(component.getByTestId("hotelName").textContent).toBe(
      testHotel1.name
    );
    expect(component.getByTestId("hotelAddr").textContent).toBe(
      testHotel1.address
    );
    expect(component.getByTestId("trustYou").textContent).toBe(
      String(testHotel1.trustyou.score.overall)
    );
  });

  it("testHotel1 rating should have five stars in total", () => {
    const component = render(<Card hotel={testHotel1} />, {
      wrapper: MemoryRouter,
    });
    //overall rating of hotel
    const filledStars = component.getAllByTestId("filled-star");

    //the remainder out of five stars
    const blankStars = component.getAllByTestId("blank-star");

    expect(filledStars.concat(blankStars)).toHaveLength(5);
  });

  it("testHotel1 rating should have four filled stars", () => {
    const component = render(<Card hotel={testHotel1} />, {
      wrapper: MemoryRouter,
    });
    const stars = component.getAllByTestId("filled-star");
    expect(stars).toHaveLength(4);
  });

  it("the alt tag contains the correct value", () => {
    const component = render(<Card hotel={testHotel1} />, {
      wrapper: MemoryRouter,
    });
    const img = component.getByTestId("image");
    expect(img.alt).toContain("hotel-image");
  });
  //rating boundary testing
  //0 rating
  it("testHotel1 rating is 0, but should have five stars in total ", () => {
    const component = render(<Card hotel={testHotel2} />, {
      wrapper: MemoryRouter,
    });
    //overall rating of hotel
    var filledStars;
    try {
      filledStars = component.getAllByTestId("filled-star"); //try to get number of filled stars
    } catch (e) {
      filledStars = null; //if they don't exist, return null
    }

    //the remainder out of five stars
    const blankStars = component.getAllByTestId("blank-star");

    expect(blankStars).toHaveLength(5);
    expect(filledStars).toBe(null);
  });

  //5 rating
  it("testHotel3 rating is 5, so it should have five filled stars in total", () => {
    const component = render(<Card hotel={testHotel3} />, {
      wrapper: MemoryRouter,
    });
    //overall rating of hotel
    var blankStars;
    try {
      blankStars = component.getAllByTestId("blank-star"); //try to get number of filled stars
    } catch (e) {
      blankStars = null; //if they don't exist, return null
    }

    //the remainder out of five stars
    const filledStars = component.getAllByTestId("filled-star");

    expect(filledStars).toHaveLength(5);
    expect(blankStars).toBe(null);
  });

  //-1 rating
  it("testHotel4 rating is -1, so it should render all blank stars ", () => {
    const component = render(<Card hotel={testHotel4} />, {
      wrapper: MemoryRouter,
    });
    //overall rating of hotel
    var filledStars;
    try {
      filledStars = component.getAllByTestId("filled-star"); //try to get number of filled stars
    } catch (e) {
      filledStars = null; //if they don't exist, return null
    }

    //the remainder out of five stars
    const blankStars = component.getAllByTestId("blank-star");

    expect(blankStars).toHaveLength(5);
    expect(filledStars).toBe(null);
  });

  //6 rating
  it("testHotel5 rating is 6, so it should render all blank stars ", () => {
    const component = render(<Card hotel={testHotel5} />, {
      wrapper: MemoryRouter,
    });
    //overall rating of hotel
    var filledStars;
    try {
      filledStars = component.getAllByTestId("filled-star"); //try to get number of filled stars
    } catch (e) {
      filledStars = null; //if they don't exist, return null
    }

    //the remainder out of five stars
    const blankStars = component.getAllByTestId("blank-star");

    expect(blankStars).toHaveLength(5);
    expect(filledStars).toBe(null);
  });

  it("should render the card properly if hotel does not have a trustyou rating", () => {
    let testHotel6 = { ...testHotel1, trustyou: { score: { overall: null } } };
    const component = render(<Card hotel={testHotel6} />, {
      wrapper: MemoryRouter,
    });
    expect(component.getByTestId("trustYou").textContent).toBe("No Rating");
    expect(component.getByTestId("hotelName").textContent).toBe(
      testHotel6.name
    );
    expect(component.getByTestId("hotelAddr").textContent).toBe(
      testHotel6.address
    );
  });
});
