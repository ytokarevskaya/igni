import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { SectionStyled, PulseBtn } from "./styled"

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
    this.setState({"onhold": "onhold"});
    const cursorBtn = this.sectionRef.current.querySelector(".cursor-btn");
    cursorBtn.style.left = event.clientX + "px";
    cursorBtn.style.top = event.clientY + "px";
    mouseDownTimer = setTimeout(() => {
      if (mouseDownTimer) {
        this.setState({"onhold": ""});
        this.changeSection();
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

  changeSection(id) {
    let nextSectionId;
    if (id) {

    } else {
      nextSectionId = this.id + 1;
      const nextSection = document.querySelector("section[data-id='" + nextSectionId + "']");
      const sectionObj = sectionObjects[this.id];
      if (sectionObjects[nextSectionId]) {
        sectionObjects[nextSectionId].setState({"active": true});
        sectionObjects[this.id].setState({"active": false});
        window.headerObj.setState({"headerStyle": sectionObjects[nextSectionId].props.headerStyle});
      }
    }
    var sideMenu = document.getElementById("side-menu");
    sideMenu.querySelector(".active").classList.remove("active");
    sideMenu.querySelector("[data-id='" + nextSectionId + "'").classList.add("active");
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

let mouseDownTimer;

Section.propTypes = {
  id: PropTypes.number,
  headerStyle: PropTypes.string,
  name: PropTypes.string
}

Section.defaultProps = {
  id: 0,
  headerStyle: "white",
  name: ""
}

const CursorBtn = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 50;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  &::before {
    content: '';
    display: block;
    width: 30%;
    height: 30%;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: width 2s linear, height 2s linear;
  }

  .onhold & {
    visibility: visible;
    opacity: 1;

    &::before {
      width: 100%;
      height: 100%;
    }

    &::after {
      animation: pulse-btn-before 2s ease infinite;
    }
  }
`

export default Section