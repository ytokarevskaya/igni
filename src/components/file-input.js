import React from "react"
import styled from "styled-components"

import { COLORS } from "./styled"

class FileInput extends React.Component {
	constructor(props) {
		super(props);
		this.defaultText = this.props.inputText || "Прикрепить ТЗ"
		this.state = {
			"active": false,
			"inputText": this.defaultText
		}
	}

	inputChange(e) {
		const file = e.target.files[0];
		if (file) {
			this.setState({"inputText": file.name});
		} else {
			this.setState({"inputText": this.defaultText});
		}
	}

	render() {
		return (
			<FileInputCover className={"icon-attach" + " " + this.props.inputStyle} pos={this.props.pos || ""}>
				<div>{this.state.inputText}</div>
				<input type="file" accept="application/msword,application/pdf,application/x-iwork-pages-sffpages,text/plain,application/rtf,text/richtext" onChange={(e) => this.inputChange(e)} />
			</FileInputCover>
		)
	}
}

const FileInputCover = styled.div`
	position: ${props => props.pos? props.pos[0] : "absolute"};
  top: ${props => props.pos? props.pos[1] : "16rem"};
  right: ${props => props.pos? props.pos[2] : "10rem"};
  bottom: ${props => props.pos? props.pos[3] : "auto"};
  left: ${props => props.pos? props.pos[4] : "auto"};
  padding-left: 3.5rem;
  font-size: 1.5rem;
  max-width: 24rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	transform: rotate(-90deg);
	transform-origin: right top;
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

	input {
		opacity: 0;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
`

export default FileInput