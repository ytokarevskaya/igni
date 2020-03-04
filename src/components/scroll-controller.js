import React from "react"
import styled from "styled-components"

import { changeSection } from "./section"

class ScrollController extends React.Component {
	constructor(props) {
		super(props);
		this.frame = React.createRef();
		this.state = {
			"activeSectionIndex": 0,
			"scrollBlocked": false
		}
	}

	scrollScreen(e) {
		// const scrollFrame = this.frame.current;
		// const scrollContent = scrollFrame.querySelector(".scroll-frame-content");

		// let newPos;

		// const curPos = +scrollFrame.dataset.pos;
		// const delta = e.deltaY > 0? 1 : -1;
		// newPos = curPos - delta * 60;
		// if (newPos > 0) newPos = 0;
		// if (newPos <= -(scrollContent.clientHeight - window.innerHeight) * this.overflowLimit) newPos = -(scrollContent.clientHeight - window.innerHeight) * this.overflowLimit;

		// // debugger;
		// const currentSection = getCurrentSectionByPos(newPos).sectionRef.current;

		// if (+currentSection.dataset.id !== this.state.activeSectionIndex) {
		// 	animateLoad(currentSection);
		// 	// todo: animate unload
		// 	this.setState({"activeSectionIndex" : currentSection.dataset.id});
		// }
		// scrollFrame.dataset.pos = newPos;
		// scrollContent.style.transform = "translate3d(0, " + newPos + "px, 0)";
	}

	scrollController(e) {
		if (typeof window === "undefined") return;
		if (this.state.scrollBlocked) return;
		const scrollFrame = this.frame.current;
		const activeSection = scrollFrame.querySelector(".site-section.active");

		const path = e.nativeEvent.path || (e.nativeEvent.composedPath && e.nativeEvent.composedPath());
		if (path && path.indexOf(activeSection.querySelector(".section-scroll")) !== -1) return;

		const activeSectionId = +activeSection.dataset.id;
		const activeSectionObj = window.sectionObjects[activeSectionId];

		this.setState({"scrollBlocked": true});
		const curPos = activeSectionObj.scrollPos;
		const delta = e.deltaY > 0? 1 : -1;
		const scrollElements = activeSectionObj.props.scrollControllerElements || {};
		if (delta === 1) {
			const newPos = curPos + 100;
			if (scrollElements[newPos]) {
				applyStyles(activeSection, scrollElements[newPos]);
				activeSectionObj.scrollPos = newPos;
			} else {
				changeSection(activeSectionId, activeSectionId + 1, () => {
					if (scrollElements[0]) {
						setTimeout(() => {
							applyStyles(activeSection, scrollElements[0]);
						}, 2000);
					}
				});
			}
		} else if (delta === -1) {
			changeSection(activeSectionId, activeSectionId - 1, () => {
				if (scrollElements[0]) {
					setTimeout(() => {
						applyStyles(activeSection, scrollElements[0]);
					}, 2000);
				}
			});
		}
		setTimeout(() => {
			this.setState({"scrollBlocked": false});
		}, 1500);
	}

  render() {
  	return (
  		<ScrollControllerFrame ref={this.frame} data-pos="0" onWheel={(e) => this.scrollController(e)}>
  			<div className="scroll-frame-content">
  				{this.props.children}
  			</div>
  		</ScrollControllerFrame>
  	)
  }
}

function applyStyles(frame, scrollElements) {
	// console.log(scrollElements);
	for (const selector in scrollElements) {
		const style = scrollElements[selector];
		const element = frame.querySelectorAll(selector);
		if (element.length) {
			element.forEach((item) => {
				for (const property in style) {
					const value = style[property];
					item.style[property] = value;
				}
			});
		}
	}
}

function getCurrentSectionByPos(pos) {
	for (var index in window.sectionObjects) {
		const section = window.sectionObjects[index];
	  if (-pos >= (section.top - 100) && -pos <= section.bottom) {
	    return section;
	  }
	}
	return window.sectionObjects[0];
}

function scrollToSection(section) {

}

const ScrollControllerFrame = styled.main`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;

  .scroll-frame-content {
		transform: translate3d(0,0,0);
	  transform-style: preserve-3d;
	  transition: transform 500ms linear;
  }
`

export default ScrollController

export { applyStyles }