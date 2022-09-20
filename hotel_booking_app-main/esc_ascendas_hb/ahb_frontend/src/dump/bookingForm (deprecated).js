import React from "react";
import { FormErrors } from "../components/Booking/FormErrors";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
// import "./bookingForm.css";
import { v4 as uuidv4 } from "uuid";

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
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

    fetch("http://localhost:5000", {
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
          <h3> Booking Confirmed </h3>
          <h4 className="Booking Details">
            Your Booking ID {this.state.booking_id}
          </h4>
          <img
            src="https://icon-library.com/images/celebration-icon-png/celebration-icon-png-7.jpg"
            alt="Booking Confirmed"
          />
        </div>
      );
    } else {
      return (
        <div className="card">
          <div className="credit-card ">
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
          </div>

          <form onSubmit={this.handleSubmit} className="bookingForm">
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <br />
            <div className="form-group">
              <div className="form-group">
                <input
                  type="text"
                  required
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Full Name"
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="form-group">
                <input
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
                  onFocus={this.handleInputFocus}
                  onKeyPress={this.addSpace}
                />
                <div className="form-group">
                  <input
                    type="text"
                    required
                    name="expiry"
                    onChange={this.handleChange}
                    placeholder="Expiry Date: MM/YY"
                    pattern="\d\d/\d\d"
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="form-group">
                  <input
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
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={this.state.phone_num}
                    name="phone_num"
                    onChange={this.handleChange}
                    onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                    maxLength={12}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={this.state.address}
                    name="address"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Message to Hotel "
                    name="message"
                    onChange={this.handleChange}
                  />
                </div>
                <div
                  className={`form-group ${this.errorClass(
                    this.state.formErrors.email
                  )}`}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn-large pink"
                    disabled={!this.state.formValid}
                  >
                    {" "}
                    Confirm booking
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default MyForm;
