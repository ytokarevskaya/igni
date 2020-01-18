import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { SectionStyled, PulseBtn, CursorBtn } from "./styled"
import { applyStyles } from "./scroll-controller"

window.sectionObjects = {};

class Section extends React.Component {
	constructor(props) {
    super(props);
    this.id = this.props.id;
    this.children = this.props.children;
    this.sectionRef = React.createRef();
    this.cursor = React.createRef();
    this.scrollPos = 0;
    window.sectionObjects[this.id] = this;

    this.state = {
      "active": this.props.active,
      "onhold": "",
      "cursorStyle": ""
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.state.active && !prevState.active && typeof this.props.onLoad === "function") {
      this.props.onLoad(this.sectionRef.current);
    }
    return null;
  }

  componentDidMount() {
    if (typeof window === "undefined") return;
    // const currentSection = window.sectionObjects[this.id];
    // currentSection.top = currentSection.sectionRef.current.offsetTop;
    // currentSection.bottom = currentSection.top + currentSection.sectionRef.current.offsetHeight;
    if (this.props.scrollControllerElements && this.props.scrollControllerElements[0]) {
      applyStyles(this.sectionRef.current, this.props.scrollControllerElements[0]);
    }
    if (this.props.active) {
      window.headerObj.setState({"headerStyle": this.props.headerStyle});
      window.footerObj.setState({"footerStyle": this.props.footerStyle});
      animateLoad(this.sectionRef.current);
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
    if (e.target.classList.contains("full-project-link")) {
      this.setState({"cursorStyle": "cursor-plus"});
    } else if (e.target.classList.contains("full-video-link")) {
      this.setState({"cursorStyle": "cursor-play icon-play"});
    } else {
      this.setState({"cursorStyle": ""});
    }
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  }

  nextSection() {
    const nextSectionId = this.id + 1;
    changeSection(this.id, nextSectionId)
  }

  render() {
    return (
    	<SectionStyled data-id={this.id} ref={this.sectionRef} className={"site-section" + (this.state.active? " active" : "") + this.state.onhold + " " + this.props.name} onMouseMove={(e) => this.cursorFollow(e)}>
        {this.props.noCursor? "" : 
          <CursorBtn className={"cursor-btn translate-xy " + this.props.headerStyle + " " + this.state.cursorStyle} ref={this.cursor} />
        }
    		{this.children}
    	</SectionStyled>
    )
  }
}

const changeSection = (curId, newId, callback) => {
  const curSection = document.querySelector("section[data-id='" + curId + "']");
  const nextSection = document.querySelector("section[data-id='" + newId + "']");
  const sectionObj = window.sectionObjects[curId];
  const sideMenu = document.getElementById("side-menu");
  if (window.sectionObjects[newId]) {
    const unloadFunc = window.sectionObjects[curId].props.onUnload;
    if (unloadFunc && typeof unloadFunc === "function") unloadFunc(curSection);
    setTimeout(() => {
      window.sectionObjects[newId].setState({"active": true});
      window.sectionObjects[curId].setState({"active": false});
      window.headerObj.setState({"headerStyle": window.sectionObjects[newId].props.headerStyle});
      window.footerObj.setState({"footerStyle": window.sectionObjects[newId].props.footerStyle});
      if (sideMenu) {
        sideMenu.querySelector(".active").classList.remove("active");
        sideMenu.querySelector("[data-id='" + newId + "'").classList.add("active");
      }
      setTimeout(() => {
        if (typeof callback === "function") callback();
      }, 1000);
    }, 1000);
  }
}

const animateLoad = (section) => {
  section.querySelectorAll(".load-ani").forEach(element => {
    const delay = +element.dataset.loaddelay || 500;
    setTimeout(() => {
      element.classList.add("loaded");
    }, delay);
  })
}

const animateUnload = (section, callback) => {
  const unloadElements = section.querySelectorAll(".unload-ani");
  if (unloadElements.length) {
    unloadElements.forEach((element, index) => {
      const delay = +element.dataset.unloaddelay || 500;
      setTimeout(() => {
        element.classList.add("unloaded");
        if (index + 1 === unloadElements.length) {
          setTimeout(() => {
            callback();
            unloadElements.forEach(el => {
              el.classList.remove("unloaded");
            });
          }, 1000);
        }
      }, delay);
    })
  } else {
    callback();
  }
}

let mouseDownTimer;

Section.propTypes = {
  id: PropTypes.number,
  headerStyle: PropTypes.string,
  footerStyle: PropTypes.string,
  name: PropTypes.string,
  noCursor: PropTypes.bool,
  scrollControllerElements: PropTypes.object,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func
}

Section.defaultProps = {
  id: 0,
  headerStyle: "white",
  footerStyle: "white",
  name: "",
  noCursor: false,
  scrollControllerElements: null
}

export default Section

export { changeSection, animateLoad }