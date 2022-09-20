import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import RoomCard from "../components/HotelInfo/RoomCard";
import { MemoryRouter } from "react-router-dom";
describe("The Room Card Component", () => {
  let room1 = {
    roomNormalizedDescription: "Superior Room, 1 Queen Bed",
    roomAdditionalInfo: { breakfastInfo: "hotel_detail_breakfast_included" },
    free_cancellation: false,
    price: 124,
  };
  let destInfo = {
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600 * 1000 * 24),
  };
  let room2 = { ...room1, free_cancellation: true };
  let room3 = {
    roomNormalizedDescription: "Superior Room, 1 Queen Bed",
    roomAdditionalInfo: { breakfastInfo: "hotel_detail_breakfast_included" },
    price: 124,
  };

  //check if room card is rendered properly
  it("should render room content", () => {
    const component = render(
      <RoomCard roomData={room1} destInfo={destInfo} />,
      {
        wrapper: MemoryRouter,
      }
    );
    expect(component.getByTestId("roomDesc").textContent).toBe(
      room1.roomNormalizedDescription
    );
    expect(component.getByTestId("is-not-free").textContent).toBe(
      "Non Refundable"
    );
    expect(component.queryByTestId("is-free")).toBeNull();
    expect(component.getByTestId("room-price").textContent).toBe(
      "SGD" + room1.price
    );
    expect(component.getByTestId("select")).toBeDefined();
  });

  //check if free cancellation is true
  it("should render 'Free Cancellation'", () => {
    const component = render(
      <RoomCard roomData={room2} destInfo={destInfo} />,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(component.getByTestId("is-free").textContent).toBe(
      "Free Cancellation"
    );
    expect(component.queryByTestId("is-not-free")).toBeNull(); //Non refundable does not exist
  });
  it("should render 'Non Refundable'", () => {
    const component = render(
      <RoomCard roomData={room3} destInfo={destInfo} />,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(component.getByTestId("is-not-free").textContent).toBe(
      "Non Refundable"
    );
    expect(component.queryByTestId("is-free")).toBeNull();
  });
});
