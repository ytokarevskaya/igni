import React from "react"

import Form from "../form"
import { InputFrame } from "../styled"
import MaskedInput from "react-maskedinput"

class RequestForm extends React.Component {
  state = {
    phone: ''
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
  	return (
			<Form action="" title="request" checkbox={false}>
				<div className="form-inputs">
		  		<InputFrame width="26%">
		  			<label>Имя</label>
		  			<input className="required name_input" type="text" name="name" autoComplete="off" />
		  		</InputFrame>
		  		<InputFrame width="15%">
		  			<label>Телефон</label>
		  			<MaskedInput className="required phone_input" mask="+7 (111) 111-11-11" type="text" name="phone" autoComplete="off" onChange={this._onChange}/>
		  		</InputFrame>
		  		<InputFrame width="26%">
		  			<label>E-mail</label>
		  			<input className="required email_input" type="email" name="email" autoComplete="off" />
		  		</InputFrame>
		  		<InputFrame width="26%">
		  			<label>Компания</label>
		  			<input className="company_input" type="text" name="company" autoComplete="off" />
		  		</InputFrame>
		  		<InputFrame width="100%">
		  			<textarea className="task_input" placeholder="Задача"></textarea>
		  		</InputFrame>
				</div>
				<div className="form-bottom">
					<button className="submit-button transition-03s" type="submit">Отправить бриф</button>
				</div>
			</Form>
		)
	}
}

export default RequestForm