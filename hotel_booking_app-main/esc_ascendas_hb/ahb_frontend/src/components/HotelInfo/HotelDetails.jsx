import React from "react";

import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Card,
  Placeholder,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import HotelCarousel from "./HotelCarousel";
import numNights from "../../utilities/numNights";
import * as Icon from "react-bootstrap-icons";
import Score from "./Score";

function HotelDetails(props) {
  return (
    <Row
      className="description"
      style={{ marginTop: "1%", borderRadius: "3px" }}
    >
      <Col lg={7} style={{ marginTop: "1%" }}>
        <HotelCarousel currentHotel={props.currentHotel} />
      </Col>
      <Col lg={5} style={{ marginTop: "1%" }}>
        <ListGroup>
          <ListGroupItem>
            <Row>
              <Col lg={5}>
                <Card.Title>{props.currentHotel.name}</Card.Title>
              </Col>
              <Col lg={7}>
                <ButtonGroup size="sm">
                  <Button variant="dark" onClick={props.handleMapClick}>
                    <Icon.GeoAltFill /> Show on Map
                  </Button>
                  <Button
                    className="room-options"
                    variant="outline-dark"
                    onClick={props.handleRoomClick}
                  >
                    See Room Options
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Card.Subtitle>{props.currentHotel.address}</Card.Subtitle>
            <Card.Title>
              {props.rating.map((item, index) => (
                <Icon.StarFill key={index} data-testid="filled-star" />
              ))}
              {props.nonRating.map((item, index) => (
                <Icon.Star key={index} data-testid="blank-star" />
              ))}
            </Card.Title>
            <Card.Subtitle>
              Select a room starting from:{" "}
              {props.fetched ? (
                <Card.Title as="strong">
                  SGD
                  {Math.floor(
                    (props.minPrice * 100) /
                      numNights(
                        props.destInfo.startDate,
                        props.destInfo.endDate
                      )
                  ) / 100}
                </Card.Title>
              ) : (
                <Placeholder as="span" animation="glow">
                  <Placeholder xs={3} />
                </Placeholder>
              )}
            </Card.Subtitle>
          </ListGroupItem>
          <ListGroupItem>
            <Score
              score={props.currentHotel.trustyou.score}
              amenities_ratings={props.currentHotel.amenities_ratings}
            />
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default HotelDetails;
