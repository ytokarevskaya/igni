import React from "react"
import styled from "styled-components"
import MaskedInput from "react-maskedinput"

import Form from "../form"
import { COLORS, InputFrame } from "../styled"

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    }
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
  	return (
			<Form action="" title="request" checkbox={false} theme={this.props.theme || "dark"}>
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
					<FileInput />
				</div>
			</Form>
		)
	}
}

class FileInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"active": false
		}
	}

	render() {
		return (
			<FileInputCover className="icon-attach">Прикрепить ТЗ</FileInputCover>
		)
	}
}

const FileInputCover = styled.div`
	position: absolute;
  right: 2rem;
  top: 22rem;
  padding-left: 3.5rem;
  font-size: 1.5rem;
	transform: rotate(-90deg);
	&::before {
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -1rem;
		font-size: 2rem;
		color: ${COLORS.RED};
	}
`

export default RequestForm