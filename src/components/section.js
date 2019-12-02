import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { SectionStyled, PulseBtn, CursorBtn } from "./styled"

let sectionObjects = {};

class Section extends React.Component {
	constructor(props) {
    super(props);
    this.id = this.props.id;
    this.children = this.props.children;
    this.sectionRef = React.createRef();
    sectionObjects[this.id] = this;

    this.state = {
      "active": this.props.active,
      "onhold": ""
    }
  }

  componentWillMount() {
    if (typeof window === "undefined") return;
  }

  mouseDownHandler(e) {
    const event = e;
    if (event.nativeEvent.which !== 1) return;
    this.setState({"onhold": "onhold"});
    const cursorBtn = this.sectionRef.current.querySelector(".cursor-btn");
    cursorBtn.style.left = event.clientX + "px";
    cursorBtn.style.top = event.clientY + "px";
    mouseDownTimer = setTimeout(() => {
      if (mouseDownTimer) {
        this.setState({"onhold": ""});
        this.nextSection();
      }
      mouseDownTimer = null;
    }, 2000);
  }

  mouseUpHandler(e) {
    if (mouseDownTimer) {
      clearTimeout(mouseDownTimer);
      mouseDownTimer = null;
    }
    this.setState({"onhold": ""});
  }

  mouseMoveHandler(e) {
    if (this.state.onhold === "onhold") {
      const cursorBtn = this.sectionRef.current.querySelector(".cursor-btn");
      cursorBtn.style.left = e.clientX + "px";
      cursorBtn.style.top = e.clientY + "px";
    }
  }

  nextSection() {
    const nextSectionId = this.id + 1;
    changeSection(this.id, nextSectionId)
  }

  render() {
    return (
    	<SectionStyled data-id={this.id} ref={this.sectionRef} className={(this.state.active? "active " : "") + this.state.onhold + " " + this.props.name} onMouseDown={(e) => this.mouseDownHandler(e)} onMouseUp={(e) => this.mouseUpHandler(e)} onMouseMove={(e) => this.mouseMoveHandler(e)}>
        <CursorBtn className="cursor-btn translate-xy" />
    		{this.children}
    	</SectionStyled>
    )
  }
}

const changeSection = (curId, newId) => {
  const nextSection = document.querySelector("section[data-id='" + newId + "']");
  const sectionObj = sectionObjects[curId];
  const sideMenu = document.getElementById("side-menu");

  if (sectionObjects[newId]) {
    sectionObjects[newId].setState({"active": true});
    sectionObjects[curId].setState({"active": false});
    window.headerObj.setState({"headerStyle": sectionObjects[newId].props.headerStyle});
    window.footerObj.setState({"footerStyle": sectionObjects[newId].props.footerStyle});
    sideMenu.querySelector(".active").classList.remove("active");
    sideMenu.querySelector("[data-id='" + newId + "'").classList.add("active");
  }
}

let mouseDownTimer;

Section.propTypes = {
  id: PropTypes.number,
  headerStyle: PropTypes.string,
  footerStyle: PropTypes.string,
  name: PropTypes.string
}

Section.defaultProps = {
  id: 0,
  headerStyle: "white",
  footerStyle: "white",
  name: ""
}



export default Section

export { changeSection }