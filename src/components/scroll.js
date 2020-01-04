import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { COLORS, SectionScroll } from "./styled"

class Scroll extends React.Component {
	constructor(props) {
		super(props);
		this.menu = React.createRef();
		this.frame = React.createRef();
		this.overflowLimit = +this.props.overflowLimit;
	}

	itemClick(e) {
		const target = e.currentTarget;
		if (target.classList.contains("active")) return;
		this.scrollScreen(null, target.dataset.id);
	}

	scrollScreen(e, itemId) {
		const scrollFrame = this.frame.current;
		const menu = this.menu.current;
		const scrollContent = scrollFrame.querySelector(".scroll-content");

		let newPos;
		let targetIndex = 0;

		if (e) {
			const curPos = +scrollFrame.dataset.pos;
			newPos = curPos - e.deltaY * 0.5;
			if (newPos > 0) newPos = 0;
			// debugger;
			if (newPos <= -(scrollContent.clientHeight - window.innerHeight) * this.overflowLimit) newPos = -(scrollContent.clientHeight - window.innerHeight) * this.overflowLimit;
			for (let i = 0; i < scrollContent.children.length; i++) {
			  const item = scrollContent.children[i];
			  if (item.offsetTop < -newPos) {
			    targetIndex = i;
			  }
			}
		} else if (itemId !== "undefined") {
			const targetItem = scrollContent.children[itemId];
			targetIndex = itemId;
			newPos = -targetItem.offsetTop;
		}

		scrollFrame.dataset.pos = newPos;
		scrollFrame.style.transform = "translate3d(0, " + newPos + "px, 0)";

		if (menu) {
			menu.querySelector(".active").classList.remove("active");
			menu.children[targetIndex].classList.add("active");
		}
	}

	render() {
			let scrollMenu;
			if (this.props.menuItems.length) {
				scrollMenu = (
					<SectionScrollMenu ref={this.menu} className="scroll-menu translate-y">
					{this.props.menuItems.map((item, index) => {
						return (
							<div key={index} className={"item transition-05s" + (index === 0? " active" : "")} data-id={index} onClick={(e) => this.itemClick(e)}>{item}</div>
						)
					})}
			    </SectionScrollMenu>
				);
			}
	    return (
	    	<React.Fragment>
			    <SectionScroll ref={this.frame} data-pos="0" className="section-scroll transition-05s" width={this.props.width} pos={this.props.pos} onWheel={(e) => this.scrollScreen(e)}>
			    	<div className="scroll-content">
			    		{this.props.children}
			    	</div>
			    </SectionScroll>
			    {scrollMenu? scrollMenu : ""}
				</React.Fragment>
	    )
	}
}

Scroll.propTypes = {
  menuItems: PropTypes.array,
  width: PropTypes.string,
  pos: PropTypes.array,
  overflowLimit: PropTypes.number
}

Scroll.defaultProps = {
  menuItems: [],
  width: "100%",
  pos: ["absolute", "0", "0", "0", "0"],
  overflowLimit: 1.2
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


export default Scroll