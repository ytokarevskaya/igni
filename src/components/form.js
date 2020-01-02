import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Cookies from 'js-cookie'

import { FormStyled } from "./styled"

let formObj;

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
      <FormStyled action={this.props.action} accept-charset="utf-8" method="post" ref={this.formRef} data-label={this.props.gaLabel} data-title={this.props.title}>
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
  onSend: PropTypes.func
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
  }
}

function inputChange(e) {
  const input = e.currentTarget;
  validateInput(input.parentElement);
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
  const btn = e.currentTarget;
  if (btn.classList.contains("disabled")) return;
  const form = e.currentTarget.parentElement;
  const validated = validateForm(form);
  if (validated) {
    // if (form.dataset.title !== "daccs") {
      formReset(form);
      btn.classList.add("disabled");
    // }
  }
}

function validateForm(form) {
  const fields = form.querySelectorAll(".field");
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

  const fields = form.querySelectorAll(".field");
  fields.forEach((item) => {
    item.classList.remove("validated", "error");
  });

  if (form.querySelector(".checkbox")) form.querySelector(".checkbox").classList.remove("active");
}

function validateInput(field) {
  const input = field.children[0];
  const value = input.value;
  let validated = true;
  field.classList.remove("error", "validated");
  if ((input.classList.contains("required") && value === "") ||
    (input.classList.contains("email_input") && (isEmailSent(value) || (!/\S+@\S+\.\S+/.test(value) && !/@\S+/.test(value)))) ||
    (input.classList.contains("phone_input") && !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value))) {
    validated = false;
    field.classList.add("error");
  } else {
    field.classList.add("validated");
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