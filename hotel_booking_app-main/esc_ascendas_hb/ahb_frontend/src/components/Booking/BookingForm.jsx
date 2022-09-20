import React from "react";
import { FormErrors } from "./FormErrors";
import {
  Form,
  FloatingLabel,
  Col,
  Row,
  Container,
  Button,
  Card,
} from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { v4 as uuidv4 } from "uuid";
// import "./bookingForm.css";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    //change state: add hotel name, destination, nights, number of guests props in when combining
    this.state = {
      name: "",
      phone_num: "",
      address: "",
      expiry: "",
      message: "",
      number: "",
      email: "",
      cvc: "",
      formErrors: { email: "" },
      emailValid: false,
      formValid: false,
      focus: "",
      showResults: false,
      booking_id: "",
      fullname: "",
      destInfo: props.destInfo,
      selectedRoom: props.selectedRoom,
      currentHotel: props.currentHotel,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    this.handleInputFocus(event);
    console.log(this.state.name);
    this.setState({ [target.name]: event.target.value }, () => {
      this.validateField(target.name, target.value);
    });
  };
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.state.booking_id = uuidv4();
    console.log(this.state.booking_id);

    fetch("http://localhost:4000/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response);
        }
        //if not throw an error to be handled in catch block
      })
      .catch(function (error) {
        //Handle error
        console.log(error);
      })
      .then(function (json) {
        console.log(json);
      });
    this.setState({ ...this.state, showResults: true });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      { formErrors: fieldValidationErrors, emailValid: emailValid },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({ formValid: this.state.emailValid });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    if (this.state.showResults) {
      return (
        <div id="PaymentForm">
          <Card className="particulars-container">
            <Card.Body>
              <Card.Title> Booking Confirmed! </Card.Title>
              <Card.Subtitle className="Booking Details">
                Your Booking ID is: <strong>{this.state.booking_id}</strong>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormErrors formErrors={this.state.formErrors} />
            <Container className="particulars-container">
              <Card.Body>
                <Card.Title>Personal Information</Card.Title>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <FloatingLabel label="Full Name">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Full name"
                        name="fullname"
                        value={this.state.fullname}
                        onChange={this.handleChange}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <FloatingLabel label="Phone Number">
                      <Form.Control
                        type="number"
                        placeholder="Phone Number"
                        required
                        value={this.state.phone_num}
                        name="phone_num"
                        onChange={this.handleChange}
                        onInput={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            this.setState({ value: e.target.value });
                          }
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        maxLength={12}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <FloatingLabel label="Address">
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        required
                        value={this.state.address}
                        name="address"
                        onChange={this.handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <FloatingLabel label="Email">
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={this.handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <FloatingLabel label="Message to Hotel (Optional)">
                      <Form.Control
                        as="textarea"
                        type="text"
                        placeholder="Message to Hotel "
                        name="message"
                        onChange={this.handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Container>
            <Container className="particulars-container">
              <Card.Body>
                <Card.Title>
                  Payment Information{" "}
                  <img
                    className="payment-logos"
                    src="https://cdn-s3.kaligo.com/assets/images/Amex.jpg"
                  />
                  <img
                    className="payment-logos"
                    src="https://cdn-s3.kaligo.com/assets/images/checkout/visa.png"
                  />
                  <img
                    className="payment-logos"
                    src="https://cdn-s3.kaligo.com/assets/images/checkout/mastercard.png"
                  />
                </Card.Title>
                <Row className="mb-3">
                  <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                  />
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <FloatingLabel label="Card Number">
                      <Form.Control
                        type="number"
                        required
                        name="number"
                        onChange={this.handleChange}
                        placeholder="Card Number"
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        maxLength={16}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <FloatingLabel label="Name on Card">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={this.handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="3">
                    <FloatingLabel label="Expiry Date: MM/YY">
                      <Form.Control
                        type="text"
                        required
                        name="expiry"
                        onChange={this.handleChange}
                        placeholder="Expiry Date: MM/YY"
                        pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <FloatingLabel label="CVC">
                      <Form.Control
                        type="number"
                        required
                        name="cvc"
                        onChange={this.handleChange}
                        placeholder="CVV"
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        maxLength={4}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Button
                    type="submit"
                    variant="dark"
                    size="lg"
                    disabled={!this.state.formValid}
                  >
                    Confirm Booking
                  </Button>
                </Row>
              </Card.Body>
            </Container>
          </Form>
        </div>
      );
    }
  }
}

export default MyForm;
