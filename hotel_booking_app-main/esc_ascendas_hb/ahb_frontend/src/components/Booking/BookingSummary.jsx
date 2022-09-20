import React from "react";
import { Card } from "react-bootstrap";

function BookingSummary(props) {
  return (
    <Card className="hotel-booking-info">
      <Card.Body>
        <Card.Title>Booking Summary</Card.Title>
        <hr />
        <Card.Text data-testid="hotelName">
          <strong>
            {props.currentHotel != null
              ? props.currentHotel.name
              : "No Information Available"}
          </strong>
        </Card.Text>
        <Card.Text data-testid="hotelAddr">
          <strong>
            {props.currentHotel != null
              ? props.currentHotel.address
              : "No Information Available"}
          </strong>
        </Card.Text>
        <Card.Text data-testid="roomDesc">
          <strong>
            {props.selectedRoom != null
              ? props.selectedRoom.description
              : "No Information Available"}
          </strong>
        </Card.Text>
        {props.destInfo != null ? (
          <Card.Text data-testid="guestNum">
            <strong>{props.destInfo.rooms}</strong> Room /{" "}
            <strong>
              {(props.destInfo.adults + props.destInfo.children) /
                props.destInfo.rooms}{" "}
            </strong>
            Guests per Room
          </Card.Text>
        ) : (
          <Card.Text data-testid="altGuestNum">
            No Information Available
          </Card.Text>
        )}

        <hr />
        {props.destInfo != null && props.selectedRoom != null ? (
          <div>
            <Card.Text data-testid="startDate">
              Check-in <strong>{props.destInfo.startDate.toString()}</strong>
            </Card.Text>
            <Card.Text data-testid="endDate">
              Check-out <strong>{props.destInfo.endDate.toString()}</strong>
            </Card.Text>
            <Card.Text data-testid="avgPrice">
              Average per room per night{" "}
              <strong>
                SGD
                {Math.round(props.averagePrice * 100) / 100}
              </strong>
            </Card.Text>
            <hr />
            <Card.Text data-testid="totalPrice">
              Total:{" "}
              <strong>
                SGD
                {Math.round(props.selectedRoom.price * 100) / 100}
              </strong>
            </Card.Text>
          </div>
        ) : (
          <Card.Text data-testid="altDisplay">
            No Information Available
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default BookingSummary;
