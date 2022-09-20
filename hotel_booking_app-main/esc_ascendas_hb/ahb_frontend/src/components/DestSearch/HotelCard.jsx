import React from "react";
import { Col, Row, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Map from "../HotelInfo/Map";
import * as Icon from "react-bootstrap-icons";
import range from "../../utilities/Range";

function Cards(props) {
  const popover = (
    <Popover id="popover-basic" style={{ maxWidth: "450px" }}>
      <Popover.Header>{props.hotel.address}</Popover.Header>
      <Popover.Body>
        <Map
          lat={props.hotel.latitude}
          long={props.hotel.longitude}
          width="400px"
          height="300px"
        />
      </Popover.Body>
    </Popover>
  );

  const assignHotel = () => {
    props.updateCurrentHotel(props.hotelList[props.id]);
    console.log("updating hotel");
    console.log(props.hotelList[props.id]);
  };

  const maxRating = 5;
  const [rating, nonRating] = range(0, props.hotel.rating, maxRating);
  var starCount = 0;

  return (
    <Card
      bg={"Light"}
      border={"dark"}
      style={{ margin: "1% 0 0", width: "98%" }}
    >
      <Card.Body>
        <Row>
          <Col lg={3}>
            <img
              data-testid="image"
              src={props.img}
              alt="hotel-image"
              style={{
                height: "200px",
                width: "300px",
                margin: "-10px -5%",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./images/img_not_found.png";
              }}
            />
          </Col>
          <Col lg={6} style={{ textAlign: "left" }}>
            <Card.Title variant="left">
              <span data-testid="hotelName">{props.hotel.name}</span>{" "}
              <Badge data-testid="trustYou" bg={"primary"}>
                {props.hotel.trustyou.score.overall === null
                  ? "No Rating"
                  : props.hotel.trustyou.score.overall}
              </Badge>
            </Card.Title>
            <Card.Subtitle>
              <span data-testid="hotelAddr">{props.hotel.address}</span>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
                rootClose="true"
              >
                <Button
                  size="sm"
                  variant="link"
                  style={{ position: "relative", bottom: "3px" }}
                >
                  <Icon.GeoAltFill />
                  Show on Map
                </Button>
              </OverlayTrigger>
            </Card.Subtitle>
            <Card.Subtitle>
              {rating.map((item, index) => {
                starCount++;
                return <Icon.StarFill key={index} data-testid="filled-star" />;
              })}
              {nonRating.map((item, index) => {
                if (starCount < 5) {
                  starCount++;
                  return <Icon.Star key={index} data-testid="blank-star" />;
                } else return null; //add constraints on number of stars
              })}
            </Card.Subtitle>
          </Col>
          <Col lg={3} className="more-info">
            <Row style={{ position: "relative", top: "50px", right: "1%" }}>
              <Card.Title>
                SGD
                <strong>{props.hotel.price}</strong>
              </Card.Title>
              <Card.Subtitle>
                {props.night} Nights {props.adults}{" "}
                {props.adults > 1 ? <span>Adults</span> : <span>Adult</span>}{" "}
                {props.children > 0 ? (
                  <span>{props.children} Children</span>
                ) : null}
              </Card.Subtitle>
              <Card.Subtitle>May include taxes and charges</Card.Subtitle>
            </Row>
            <Link to="/hotelinfo">
              <Button
                size="lg"
                onClick={assignHotel}
                className="hotel-button"
                variant="dark"
              >
                See Availability →
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Cards;
