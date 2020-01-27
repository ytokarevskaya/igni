import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { SectionStyled, PulseBtn } from "./styled"
import { applyStyles } from "./scroll-controller"

if (typeof window !== "undefined") window.sectionObjects = {};

class Section extends React.Component {
	constructor(props) {
    super(props);
    this.id = this.props.id;
    this.children = this.props.children;
    this.sectionRef = React.createRef();
    this.scrollPos = 0;
    if (typeof window !== "undefined") window.sectionObjects[this.id] = this;

    this.state = {
      "active": this.props.active,
      "onhold": ""
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
    const currentSection = window.sectionObjects[this.id];
    const sectionMenu = document.getElementById("side-menu");
    currentSection.top = currentSection.sectionRef.current.offsetTop;
    currentSection.bottom = currentSection.top + currentSection.sectionRef.current.offsetHeight;
    if (this.props.scrollControllerElements && this.props.scrollControllerElements[0]) {
      applyStyles(this.sectionRef.current, this.props.scrollControllerElements[0]);
    }
    if (this.props.active) {
      window.headerObj.setState({"headerStyle": this.props.headerStyle});
      window.footerObj.setState({"footerStyle": this.props.footerStyle});
      currentSection.sectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
      if (sectionMenu) {
        sectionMenu.children[this.id].classList.add("active");
      }
    }
  }

  nextSection() {
    const nextSectionId = this.id + 1;
    changeSection(this.id, nextSectionId)
  }

  render() {
    return (
    	<SectionStyled data-id={this.id} ref={this.sectionRef} className={"site-section" + (this.state.active? " active" : "") + " " + this.props.name}>
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
  scrollControllerElements: PropTypes.object,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func
}

Section.defaultProps = {
  id: 0,
  headerStyle: "white",
  footerStyle: "white",
  name: "",
  scrollControllerElements: null
}

export default Section

export { changeSection, animateLoad }