import React from "react";
import BookingSummary from "../components/Booking/BookingSummary";
import { render } from "@testing-library/react";

describe("The BookingSummary Component", () => {
  let hotel1 = { name: "Hotel 81 Palace", address: "25 Lorong 16 Geylang" };
  let room1 = { description: "TWIN STANDARD", price: 73.11 };
  let destInfo = {
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600 * 1000 * 24),
    rooms: 1,
    adults: 2,
    children: 0,
  };
  it("should render the component correctly", () => {
    const component = render(
      <BookingSummary
        currentHotel={hotel1}
        selectedRoom={room1}
        destInfo={destInfo}
        averagePrice={73.11}
      />
    );
    expect(component.getByTestId("hotelName").textContent).toBe(hotel1.name);
    expect(component.getByTestId("hotelAddr").textContent).toBe(hotel1.address);
    expect(component.getByTestId("roomDesc").textContent).toBe(
      room1.description
    );
    expect(component.getByTestId("guestNum").textContent).toBe(
      destInfo.rooms +
        " Room / " +
        (destInfo.adults + destInfo.children) +
        " Guests per Room"
    );
    expect(component.getByTestId("startDate").textContent).toBe(
      "Check-in " + destInfo.startDate.toString()
    );
    expect(component.getByTestId("endDate").textContent).toBe(
      "Check-out " + destInfo.endDate.toString()
    );
    expect(component.getByTestId("avgPrice").textContent).toBe(
      "Average per room per night SGD" + 73.11
    );
    expect(component.getByTestId("totalPrice").textContent).toBe(
      "Total: SGD" + room1.price
    );
  });

  it("should render correctly if no details are provided", () => {
    let hotel2 = null;
    let destInfo = null;
    let room1 = null;
    const component = render(
      <BookingSummary
        currentHotel={hotel2}
        selectedRoom={room1}
        destInfo={destInfo}
        averagePrice={73.11}
      />
    );
    expect(component.getByTestId("hotelName").textContent).toBe(
      "No Information Available"
    );
    expect(component.getByTestId("hotelAddr").textContent).toBe(
      "No Information Available"
    );
    expect(component.getByTestId("roomDesc").textContent).toBe(
      "No Information Available"
    );
    expect(component.getByTestId("altGuestNum").textContent).toBe(
      "No Information Available"
    );
    expect(component.queryByTestId("startDate")).toBe(null);
    expect(component.queryByTestId("endDate")).toBe(null);
    expect(component.queryByTestId("avgPrice")).toBe(null);
    expect(component.queryByTestId("totalPrice")).toBe(null);
    expect(component.queryByTestId("altDisplay").textContent).toBe(
      "No Information Available"
    );
  });
  it("should render correctly if no details are provided", () => {
    let hotel2 = null;
    let destInfo = null;
    let room1 = null;
    const component = render(
      <BookingSummary
        currentHotel={hotel2}
        selectedRoom={room1}
        destInfo={destInfo}
        averagePrice={73.11}
      />
    );
    expect(component.getByTestId("hotelName").textContent).toBe(
      "No Information Available"
    );
    expect(component.getByTestId("hotelAddr").textContent).toBe(
      "No Information Available"
    );
    expect(component.getByTestId("roomDesc").textContent).toBe(
      "No Information Available"
    );
    expect(component.getByTestId("altGuestNum").textContent).toBe(
      "No Information Available"
    );
    expect(component.queryByTestId("startDate")).toBe(null);
    expect(component.queryByTestId("endDate")).toBe(null);
    expect(component.queryByTestId("avgPrice")).toBe(null);
    expect(component.queryByTestId("totalPrice")).toBe(null);
    expect(component.queryByTestId("altDisplay").textContent).toBe(
      "No Information Available"
    );
  });
});
