import React from "react";
import { Card, Col, Badge, Row } from "react-bootstrap";

function Score(props) {
  return (
    <div>
      <Row>
        <Col lg={6}>
          <Card.Title>Hotel Ratings</Card.Title>
          {Object.keys(props.score).map((key, index) => {
            return key !== "kaligo_overall" && props.score[key] !== null ? (
              <div key={index}>
                <Card.Subtitle as="span" data-testid={"rating" + index}>
                  {key[0].toUpperCase() + key.substring(1)}
                </Card.Subtitle>
                <Badge
                  style={{ float: "right" }}
                  bg="dark"
                  data-testid={"rating-score" + index}
                >
                  {props.score[key]}
                </Badge>
              </div>
            ) : null;
          })}
        </Col>
        <Col lg={6}>
          <Card.Title>Amenities Ratings</Card.Title>
          {props.amenities_ratings.map((value, index) => {
            return value.score !== null &&
              value.name !== null &&
              "name" in value &&
              "score" in value ? (
              <div key={index}>
                <Card.Subtitle as="span" data-testid={"amenities" + index}>
                  {value.name[0].toUpperCase() + value.name.substring(1)}
                </Card.Subtitle>
                <Badge
                  data-testid={"amenities-score" + index}
                  style={{ float: "right" }}
                  bg="secondary"
                >
                  {value.score}
                </Badge>
              </div>
            ) : null;
          })}
        </Col>
      </Row>
    </div>
  );
}

export default Score;
