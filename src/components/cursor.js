import React from "react"

import { CursorBtnStyled } from "./styled"

class CursorBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      "cursorStyle": this.props.cursorStyle || ""
    }
    this.cursorRef = React.createRef();
	}

	cursorMove(e) {
		e.persist();
		const cursor = this.cursorRef.current;
		const cursorCircle = cursor.nextElementSibling;

    if (e.target.classList.contains("full-project-link")) {
      this.setState({"cursorStyle": "cursor-plus"});
    } else if (e.target.classList.contains("full-video-link")) {
      this.setState({"cursorStyle": "cursor-play icon-play"});
    } else {
      this.setState({"cursorStyle": this.props.cursorStyle || ""});
    }
    cursor.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px)";
    setTimeout(() => { cursorCircle.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px)";}, 100);
	}

	render() {
		return (
			<React.Fragment>
				<CursorBtnStyled ref={this.cursorRef} className={"cursor-btn " + this.state.cursorStyle}>
				</CursorBtnStyled>
				<div className="cursor-circle" />
			</React.Fragment>
		)
	}
}

export default CursorBtn