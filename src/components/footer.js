import React from "react"
import styled from "styled-components"

import { PulseBtn, COLORS } from "./styled"
import { checkScroll } from "../pages/index"

class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			footerStyle: "white"
		}

		if (typeof window !== "undefined") window.footerObj = this;
	}

	orderBtnClick(e) {
		e.preventDefault();
		if (this.props.page === "home") {
			window.sectionObjects[4].sectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
			setTimeout(() => { checkScroll(); }, 500);
		} else {
			document.location.href = e.target.attr.href;
		}
	}

	render() {
		return (
			<FooterStyled className={this.state.footerStyle + " page-" + this.props.page}>
				<Socials>
					<a href="" target="_blank" className="icon-linkedin" />
					<a href="" target="_blank" className="icon-dribbble" />
					<a href="" target="_blank" className="icon-instagram" />
					<a href="" target="_blank" className="icon-twitter" />
					<a href="" target="_blank" className="icon-facebook" />
				</Socials>
				<BottomMenu className="mobile-hidden">
					<MusicBtn>
						<div className="icon icon-headphones" />
						<div className="title">Музыка включена</div>
					</MusicBtn>
					{/*<PulseBtn>
						+<span className="text">Удерживайте</span>
					</PulseBtn>*/}
				</BottomMenu>
				{this.props.page === "home"? <ScrollHelp className="translate-x" id="footer-scroll-help">Скролл</ScrollHelp> : ""}
				<OrderBtn href="/?active=4" onClick={(e) => this.orderBtnClick(e)} id="footer-callback-btn" className={this.props.orderBtnStyle}>
          <div className="icon icon-pen" />
          <div className="title">Оставить заявку</div>
        </OrderBtn>
			</FooterStyled>
		)
	}
}

const ScrollHelp = styled.div`
	color: #fff;
	font-size: 1.6rem;
  font-weight: 500;
  position: absolute;
  left: 50%;
  bottom: 6vh;
`

const FooterStyled = styled.footer`
	position: fixed;
	top: 5rem;
	right: 0;
	width: 5rem;
	z-index: 30;

	&.dark {
		color: ${COLORS.GREY};
	}

	@media screen and (min-width: 1280px) and (pointer: fine) {
		right: auto;
		top: auto;
		left: 0;
		bottom: 0;
		width: 100%;
	}
`

const BottomMenu = styled.div`
	position: absolute;
	left: 20rem;
  bottom: 6vh;
  display: flex;

  ${PulseBtn} {
  	margin-left: 6rem;
  }

  ${FooterStyled}.dark &,
  ${FooterStyled}.page-portfolio-design &,
  ${FooterStyled}.page-portfolio-digital &,
  ${FooterStyled}.page-project & {
  	display: none;
  }
`

const MusicBtn = styled.div`
	cursor: pointer;

	> div {
		display: inline-block;
		vertical-align: middle;
	}

	.icon {
		font-size: 2.5rem;
	}

	.title {
		font-size: 1.6rem;
	  font-weight: 500;
	  color: #fff;
	  margin-left: 2.4rem;
	}
`

const Socials = styled.div`
	text-align: center;

	a {
		font-size: 1.3rem;
    margin: 2.5rem 0 0 0;
		display: block;
	}

	@media screen and (min-width: 1280px) and (pointer: fine) {
		position: absolute;
		left: 7rem;
	  bottom: 6vh;

	  a {
			font-size: 2.2rem;
			margin: 3.5rem 0 0 0;
	  }
	}
`

const OrderBtn = styled.a`
  position: absolute;
  right: 5rem;
  bottom: -1px;
  width: 13.5rem;
  height: 22rem;
  border: 1px solid #fff;
  cursor: pointer;
  padding: 3.5rem 2.5rem;
  display: block;

  .icon {
    position: relative;
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
    background: ${COLORS.RED};
    color: #fff;
    font-size: 1.5rem;
    border: 1px solid #fff;

    &::before {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -0.5em;
    }
  }

  .title {
    font-size: 1.6rem;
	  font-weight: 600;
    color: #fff;
	  line-height: 1.5;
	  margin-top: 2.5rem;
  }

  &.right-corner {
  	position: fixed;
    bottom: auto;
    top: 0;
    right: 10rem;
    border: unset;
    width: auto;
    height: 10rem;
    padding: 0 3.5rem;
    display: flex;
    align-items: center;
    background: ${COLORS.RED};

    .icon {
    	background: #fff;
    	color: ${COLORS.RED};
    }

    .title {
    	margin: 0 0 0 1.5rem;
    }
  }
`

export default Footer