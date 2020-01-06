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
    this.cursor = React.createRef();
    sectionObjects[this.id] = this;

    this.state = {
      "active": this.props.active,
      "onhold": ""
    }
  }

  componentDidMount() {
    if (typeof window === "undefined") return;
    if (this.id === 0) {
      window.headerObj.setState({"headerStyle": this.props.headerStyle});
      window.footerObj.setState({"footerStyle": this.props.footerStyle});
    }
  }

  mouseDownHandler(e) {
    const event = e;
    if (event.nativeEvent.which !== 1) return;
    this.setState({"onhold": "onhold"});
    const cursor = this.cursor.current;
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";
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

  cursorFollow(e) {
    const cursor = this.cursor.current;
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  }

  nextSection() {
    const nextSectionId = this.id + 1;
    changeSection(this.id, nextSectionId)
  }

  render() {
    return (
    	<SectionStyled data-id={this.id} ref={this.sectionRef} className={(this.state.active? "active " : "") + this.state.onhold + " " + this.props.name} onMouseDown={(e) => this.mouseDownHandler(e)} onMouseUp={(e) => this.mouseUpHandler(e)} onMouseMove={(e) => this.cursorFollow(e)}>
        <CursorBtn className={"cursor-btn translate-xy " + this.props.headerStyle} ref={this.cursor} />
    		{this.children}
    	</SectionStyled>
    )
  }
}

const changeSection = (curId, newId) => {
  const curSection = document.querySelector("section[data-id='" + curId + "']");
  const nextSection = document.querySelector("section[data-id='" + newId + "']");
  const sectionObj = sectionObjects[curId];
  const sideMenu = document.getElementById("side-menu");

  if (sectionObjects[newId]) {
    animateUnload(curSection);
    setTimeout(() => {
      sectionObjects[newId].setState({"active": true});
      sectionObjects[curId].setState({"active": false});
      window.headerObj.setState({"headerStyle": sectionObjects[newId].props.headerStyle});
      window.footerObj.setState({"footerStyle": sectionObjects[newId].props.footerStyle});
      if (sideMenu) {
        sideMenu.querySelector(".active").classList.remove("active");
        sideMenu.querySelector("[data-id='" + newId + "'").classList.add("active");
      }
      setTimeout(() => {
        animateLoad(nextSection);
      }, 1000);
    }, 1500);
  }
}

const animateLoad = (section) => {
  section.querySelectorAll(".load-ani").forEach(element => {
    const delay = +element.dataset.loaddelay || 500;
    section.querySelectorAll(".unload-ani").forEach(element => {
      element.classList.remove("unloaded");
    });
    setTimeout(() => {
      element.classList.add("loaded");
    }, delay);
  })
}

const animateUnload = (section) => {
  section.querySelectorAll(".unload-ani").forEach(element => {
    const delay = +element.dataset.unloaddelay || 500;
    setTimeout(() => {
      element.classList.add("unloaded");
      section.querySelectorAll(".load-ani").forEach(element => {
        element.classList.remove("loaded");
      });
    }, delay);
  })
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