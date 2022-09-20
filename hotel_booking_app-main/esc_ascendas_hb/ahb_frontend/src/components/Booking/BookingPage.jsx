import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import BookingForm from "./BookingForm";
import numNights from "../../utilities/numNights";
import BookingSummary from "./BookingSummary";

function BookingPage(props) {
  const [averagePrice, updatePrice] = useState(0);
  useEffect(() => {
    let nights = numNights(props.destInfo.startDate, props.destInfo.endDate);
    updatePrice(props.selectedRoom.price / nights);
  }, []);
  return (
    <Container className="ds">
      <Row>
        <Col lg="9">
          <BookingForm
            className="booking"
            destInfo={props.destInfo}
            selectedRoom={props.selectedRoom}
            currentHotel={props.currentHotel}
          />
        </Col>
        <Col lg="3">
          <BookingSummary
            averagePrice={averagePrice}
            destInfo={props.destInfo}
            selectedRoom={props.selectedRoom}
            currentHotel={props.currentHotel} //change this one
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;
