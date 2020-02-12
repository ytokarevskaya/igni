import React from "react"
import axios from "axios";
import PropTypes from "prop-types"
import styled from "styled-components"
import Cookies from "js-cookie"

import { FormStyled } from "./styled"

let formObj;
const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyBDRbcPmGThAqVj"
});

class Form extends React.Component {
  constructor({props, children}) {
    super(props);
    formObj = this;
    this.children = children;
    this.formRef = React.createRef();
    this.href = typeof window === "undefined"? "" : window.location.href;
  }

  componentDidMount(props) {
    formInit(this.formRef);
  }

  render() {
    return (
      <FormStyled action={this.props.action} accept-charset="utf-8" method="post" ref={this.formRef} data-label={this.props.gaLabel} data-title={this.props.title} onSubmit={formSubmit} className={this.props.theme}>
        {/*<Inputs items={this.props.children} labels={this.props.labels} />*/}
        {this.props.children}
        {this.props.checkbox?
          <div className="checkbox" onClick={checkboxChange} onKeyDown={checkboxKeyDown} role="checkbox" aria-checked="false" tabIndex="0"><span />I agree to the Privacy Policy</div> : ""
        }
        {/*<button type="submit" onClick={formSubmit}>{this.props.buttonText || "Отправить"}</button>*/}
      </FormStyled>
    )
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  action: PropTypes.string.isRequired,
  gaLabel: PropTypes.string,
  buttonText: PropTypes.string,
  checkbox: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  onSend: PropTypes.func,
  theme: PropTypes.string
}

Form.defaultProps = {
  gaLabel: "",
  buttonText: "Отправить",
  checkbox: true,
  labels: [],
  title: ""
};

function formInit(ref) {
  const form = ref.current;
  const inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].onchange = inputChange;
    inputs[i].onkeyup = inputChange;
    inputs[i].onfocus = inputFocus;
    inputs[i].onblur = inputBlur;
  }
}

function inputChange(e) {
  const input = e.currentTarget;
  validateInput(input);
}

function inputFocus(e) {
  const inputLabel = e.currentTarget.parentElement.querySelector("label");
  if (inputLabel) inputLabel.classList.add("is-focus");
}

function inputBlur(e) {
  const input = e.currentTarget;
  const inputLabel = input.parentElement.querySelector("label");
  if (!input.value && inputLabel) {
    inputLabel.classList.remove("is-focus");
  }
}

// function Inputs(props) {
//   return (
//     props.items.map((item, index) =>
//       <div className={"field n" + index} key={getRandom()}>
//         {item}
//         {<span className="icon-delete" />
//         <span className="icon-done" /> }
//         {props.labels[index] ? <div className="label">{props.labels[index]}</div> : ""}
//       </div>
//     )
//   );
// }

function formSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = form.querySelector(".submit-button");
  if (btn.classList.contains("disabled")) return;
  const validated = validateForm(form);
  if (validated) {
    if (form.dataset.title === "callback") {
      const base = Airtable.base("appTq4eodkVDyFlNv");
      base("Table 1").create({
        "Name": form.querySelector(".name_input").value,
        "Phone": form.querySelector(".phone_input").value
      }, (err, record) => {
        if (err) {
          return;
        }
      });
    } else if (form.dataset.title === "request") {
      const base = Airtable.base("appTq4eodkVDyFlNv");
      base("Table 1").create({
        "Name": form.querySelector(".name_input").value,
        "Phone": form.querySelector(".phone_input").value
      }, (err, record) => {
        if (err) {
          return;
        }
      });
    }
    formReset(form);
    btn.classList.add("disabled");
  }
}

function validateForm(form) {
  const fields = form.querySelectorAll("input, textarea");
  const check = form.querySelector(".checkbox");
  let validated = true;

  for (let i = 0; i < fields.length; i += 1) {
    const inputValidated = validateInput(fields[i]);
    if (!inputValidated) validated = false;
  }

  if (check && !check.classList.contains("active")) {
    check.classList.add("error");
    validated = false;
  }
  return validated;
}

function formReset(form) {
  form.reset();

  const fields = form.querySelectorAll("input, textarea");
  fields.forEach((item) => {
    item.classList.remove("validated", "error");
  });

  if (form.querySelector(".checkbox")) form.querySelector(".checkbox").classList.remove("active");
}

function validateInput(input) {
  const value = input.value;
  let validated = true;
  input.classList.remove("error", "validated");
  if ((input.classList.contains("required") && value === "") ||
    (input.classList.contains("email_input") && (isEmailSent(value) || (!/\S+@\S+\.\S+/.test(value) && !/@\S+/.test(value)))) ||
    (input.classList.contains("phone_input") && !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value))) {
    validated = false;
    input.classList.add("error");
  } else {
    input.classList.add("validated");
  }
  return validated;
}

function isEmailSent(value) {
  const cookieString = Cookies.get("email_sent");
  const cookieArr = cookieString? cookieString.split(',') : [];
  return cookieArr.indexOf(value) !== -1;
}

function writeCookieEmail(value) {
  const cookieString = Cookies.get("email_sent");
  const cookieArr = cookieString? cookieString.split(',') : [];
  if (cookieArr.indexOf(value) === -1) cookieArr.push(value);
  Cookies.set("email_sent", cookieArr.join(","), { expires: 365 });
}

function checkboxChange(e) {
  e.currentTarget.classList.remove("error");
  if (e.currentTarget.classList.contains("active")) {
    e.currentTarget.classList.remove("active");
  } else {
    e.currentTarget.classList.add("active");
  }
}

function checkboxKeyDown(e) {
  if (e.keyCode === 13) {
    checkboxChange(e);
  }
}

export default Form