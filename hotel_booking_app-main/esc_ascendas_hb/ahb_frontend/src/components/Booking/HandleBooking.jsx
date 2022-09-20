import React from "react";
import {
  Form,
  FloatingLabel,
  Col,
  Row,
  Container,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";

// import "./bookingForm.css";

class handleForm extends React.Component {
  constructor(props) {
    super(props);
    //change state: add hotel name, destination, nights, number of guests props in when combining
    this.state = {
      booking_id: "",
      showResults: false,
      currentHotel: "",
      selectedRoom: "",
      destInfo: "",
      hotel_address: "",
      adults: "",
      rooms: "",
      children: "",
      startDate: "",
      endDate: "",
      destination: "",
      button: 0,
      bookingstatus: "",
      isDeleted: false,
      isClicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //this.OnClick = this.OnClick.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    this.handleInputFocus(event);
    this.setState({ [target.name]: event.target.value }, () => {});
  };
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.button === 1) {
      axios
        .post(`http://localhost:4000/handlebooking`, this.state)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          try {
            if (res.data !== "No Booking") {
              this.setState({
                ...this.state,
                showResults: true,
                currentHotel: res.data.name,
                hotel_address: res.data.address,
                adults: res.data.adults,
                rooms: res.data.rooms,
                children: res.data.children,
                startDate: res.data.startDate,
                endDate: res.data.endDate,
                destination: res.data.destination,
              });
            } else {
              this.setState({
                ...this.state,
                showResults: false,
                isClicked: true,
              });
            }
          } catch (error) {
            this.setState({ ...this.state, showResults: false });
          }
        });
    }
    if (this.state.button === 0) {
      console.log("Button 2 clicked!");
      axios
        .post(`http://localhost:4000/deletebooking`, this.state)
        .then((res) => {
          try {
            this.setState({
              ...this.state,
              showResults: true,
              currentHotel: res.data.name,
              hotel_address: res.data.address,
              adults: res.data.adults,
              rooms: res.data.rooms,
              children: res.data.children,
              startDate: res.data.startDate,
              endDate: res.data.endDate,
              destination: res.data.destination,
              isDeleted: true,
            });
          } catch (error) {
            this.setState({ ...this.state, showResults: false });
          }
        });
    }
  };

  render() {
    if (this.state.showResults && !this.state.isDeleted) {
      return (
        <Form onSubmit={this.handleSubmit} className="ds">
          <Card
            className="hotel-booking-info"
            style={{
              margin: "3% auto auto",
              maxHeight: "500px",
              maxWidth: "500px",
            }}
          >
            <Card.Body>
              <div id="PaymentForm">
                <Card.Title>Booking Summary</Card.Title>
                <hr />
                <Card.Text>
                  <strong>{this.state.bookingstatus}</strong>
                </Card.Text>
                <Card.Text>
                  Booking ID: <strong>{this.state.booking_id}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>{this.state.currentHotel}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>{this.state.hotel_address}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>{this.state.destination}</strong>
                  <Card.Text>
                    <strong>{this.state.rooms}</strong> Room /{" "}
                    <strong>
                      {(this.state.adults + this.state.children) /
                        this.state.rooms}{" "}
                    </strong>
                    Guests per Room
                  </Card.Text>
                  <hr />
                  Check-in <strong>{this.state.startDate}</strong>
                </Card.Text>
                <Card.Text>
                  Check-out <strong>{this.state.endDate}</strong>
                </Card.Text>
                <Button
                  type="submit"
                  variant="dark"
                  onClick={() => (this.state.button = 0)}
                  size="lg"
                  name="btn2"
                  style={{ marginLeft: "100px" }}
                >
                  {" "}
                  Delete Booking{" "}
                </Button>
                <hr />
              </div>
            </Card.Body>
          </Card>
        </Form>
      );
    } else if (this.state.isDeleted) {
      return (
        <div className="ds">
          <Card
            className="hotel-booking-info"
            style={{
              margin: "3% auto auto",
              maxHeight: "400px",
              maxWidth: "700px",
            }}
          >
            <Card.Body>
              <Card.Title>Your Booking has been deleted.</Card.Title>
              <Card.Subtitle>
                Booking Reference ID: <strong>{this.state.booking_id}</strong>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Form onSubmit={this.handleSubmit} className="ds">
            <Container className="particulars-container">
              <Card.Body>
                <Card.Title>Retrieve Booking</Card.Title>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <FloatingLabel label="Booking ID">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Booking ID"
                        name="booking_id"
                        value={this.state.booking_id}
                        onChange={this.handleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Button
                      type="submit"
                      onClick={() => (this.state.button = 1)}
                      name="btn1"
                      variant="dark"
                      size="lg"
                    >
                      View Booking{" "}
                    </Button>
                  </Col>
                  <Col lg={3}>
                    {
                      <Alert
                        variant="dark"
                        dismissible={true}
                        onClose={() => {
                          this.state.isClicked = false;
                        }}
                        show={this.state.isClicked && !this.state.showResults}
                      >
                        Booking not found!
                      </Alert>
                    }
                  </Col>
                </Row>
              </Card.Body>
            </Container>
          </Form>
        </div>
      );
    }
  }
}

export default handleForm;
