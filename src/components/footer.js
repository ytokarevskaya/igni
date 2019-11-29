import React from "react"
import styled from "styled-components"

import { PulseBtn, COLORS } from "./styled"

class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			footerStyle: "white"
		}

		if (typeof window !== "undefined") window.footerObj = this;
	}

	render() {
		return (
			<FooterStyled className={this.state.footerStyle}>
				<Socials>
					<a href="" target="_blank" className="icon-linkedin" />
					<a href="" target="_blank" className="icon-dribbble" />
					<a href="" target="_blank" className="icon-instagram" />
					<a href="" target="_blank" className="icon-twitter" />
					<a href="" target="_blank" className="icon-facebook" />
				</Socials>
				<BottomMenu>
					<MusicBtn>
						<div className="icon icon-headphones" />
						<div className="title">Музыка включена</div>
					</MusicBtn>
					<PulseBtn>
						+<span className="text">Удерживайте</span>
					</PulseBtn>
				</BottomMenu>
			</FooterStyled>
		)
	}
}

const FooterStyled = styled.footer`
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;

	&.dark {
		color: ${COLORS.GREY};
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

  ${FooterStyled}.dark & {
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
	position: absolute;
	left: 7rem;
  bottom: 6vh;

	a {
		display: block;
		font-size: 2.2rem;
		margin: 3.5rem 0 0 0;
	}
`

export default Footer