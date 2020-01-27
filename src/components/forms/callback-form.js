import React from "react"

import Form from "../form"
import FileInput from "../file-input"
import { InputFrame } from "../styled"
import MaskedInput from "react-maskedinput"

class CallbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    }
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
    	<Form action="" title="callback" checkbox={false} theme={this.props.theme || "dark"}>
        <div className="form-inputs">
          <InputFrame width="35%">
            <label>Имя</label>
            <input className="required name_input" type="text" name="name" autoComplete="off" />
          </InputFrame>
          <InputFrame width="35%">
            <label>Телефон</label>
            <MaskedInput className="required phone_input" mask="+7 (111) 111-11-11" type="text" name="phone" autoComplete="off" onChange={this._onChange}/>
          </InputFrame>
          <button className="submit-button transition-03s" type="submit">{this.props.buttonLabel || "Отправить бриф"}</button>
          {this.props.noFileInput?
            "" : <FileInput inputStyle="horizontal icon-square" inputText={<div>Вы можете приложить <strong>готовый бриф</strong></div>} pos={["relative", "5rem", "", "", ""]} />}
        </div>
      </Form>
    )
  }
}

export default CallbackForm