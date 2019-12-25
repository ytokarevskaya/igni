import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { COLORS } from "./styled"

class ScrollMenu extends React.Component {
	constructor(props) {
		super(props);
		this.menu = React.createRef();
	}

	componentDidMount() {
		if (typeof window !== "undefined") {
			document.getElementById(this.props.scrollId).onwheel=this.scrollScreen.bind(this);
		}
	}

	itemClick(e) {
		const target = e.currentTarget;
		if (target.classList.contains("active")) return;
		this.scrollScreen(null, target.dataset.id);
	}

	scrollScreen(e, itemId) {
		const scrollFrame = document.querySelector("section.active .section-scroll");
		const menu = this.menu.current;

		let newPos;
		let targetIndex = 0;

		if (e) {
			const curPos = +scrollFrame.dataset.pos;
			newPos = curPos - e.deltaY * 0.5;
			if (newPos > 0) newPos = 0;
			if (newPos < -scrollFrame.clientHeight * 0.8) newPos = -scrollFrame.clientHeight * 0.8;
			for (let i = 0; i < scrollFrame.children.length; i++) {
			  const item = scrollFrame.children[i];
			  if (item.offsetTop < -newPos) {
			    targetIndex = i;
			  }
			}
		} else if (itemId !== "undefined") {
			const targetItem = scrollFrame.children[itemId];
			targetIndex = itemId;
			newPos = -targetItem.offsetTop;
		}

		scrollFrame.dataset.pos = newPos;
		scrollFrame.style.transform = "translate3d(0, " + newPos + "px, 0)";

		menu.querySelector(".active").classList.remove("active");
		menu.children[targetIndex].classList.add("active");
	}

	render() {
	    return (
			<SectionScrollMenu ref={this.menu} className="translate-y">
				{this.props.items.map((item, index) => {
					return (
						<div key={index} className={"item transition-05s" + (index === 0? " active" : "")} data-id={index} onClick={(e) => this.itemClick(e)}>{item}</div>
					)
				})}
		    </SectionScrollMenu>
	    )
	}
}

const SectionScrollMenu = styled.aside`
  position: absolute;
  top: 70%;
  left: 24rem;
  
  .item {
    position: relative;
    font-size: 1.6rem;
    color: ${COLORS.BLACK};
    padding: 0 1.7rem;
    margin: 3rem 0;
    cursor: pointer;

    &.active, &:hover {
      color: ${COLORS.RED};
    }

    &.active {
      font-weight: 600;

      &::before {
        content: '';
        display: block;
        width: 2px;
        height: 3.5rem;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -1.75rem;
        background: ${COLORS.RED};
      }
    }
  }
`


export default ScrollMenu