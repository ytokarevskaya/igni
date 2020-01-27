import React from "react"
import styled from "styled-components"

import { COLORS } from "./styled"

class FileInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"active": false
		}
	}

	render() {
		return (
			<FileInputCover className={"icon-attach" + " " + this.props.inputStyle} pos={this.props.pos || ""}>{this.props.inputText || <div>Прикрепить ТЗ</div>}</FileInputCover>
		)
	}
}

const FileInputCover = styled.div`
	position: ${props => props.pos? props.pos[0] : "absolute"};
  top: ${props => props.pos? props.pos[1] : "22rem"};
  right: ${props => props.pos? props.pos[2] : "2rem"};
  bottom: ${props => props.pos? props.pos[3] : "auto"};
  left: ${props => props.pos? props.pos[4] : "auto"};
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

	&.horizontal {
		transform: none;
	}

	&.icon-square {
		padding-left: 6.5rem;
		line-height: 5rem;
		&::before {
			border: 1px solid ${COLORS.RED};
			padding: 1.2rem;
    	margin-top: -2.2rem;
		}
	}

	.dark & {
		color: #fff;
	}
`

export default FileInput