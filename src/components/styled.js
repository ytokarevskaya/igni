import styled from "styled-components"

import redPlus from "../images/red-plus.svg"
import backBtnRed from "../images/back-btn-red.svg"
import backBtnWhite from "../images/back-btn-white.svg"
import backBtnHover from "../images/back-btn-hover.svg"

const COLORS = {
	RED: '#d11e1e',
	RED_HOVER: '#a73b37',
	BLACK: '#0a0d19',
	BLACK_30: 'rgba(0, 0, 0, 0.3)',
  LIGHT_BLACK: '#1f1f22',
	GREY: '#afb1b8',
  LINE_GREY: '#979797',
  LINE_GREY_20: 'rgba(151, 151, 151, 0.2)',
	BG_GREY: '#f6f7f9',
	WHITE_10: 'rgba(255, 255, 255, 0.1)',
	WHITE_20: 'rgba(255, 255, 255, 0.2)'
};

const SectionStyled = styled.section`
	position: relative;
	width: 100%;

	@media screen and (min-width: 1280px) and (pointer: fine) {
		height: ${props => props.height || "100vh"};
		transition: all 1000ms ease-in-out;
  	cursor: none;

		.home &.section-portfolio {
			height: 90vh;
		}
	}
`

const BackLayer = styled.div`
	position: ${props => props.fixed? "fixed" : "absolute"};
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: ${props => props.bg || "unset"};
`

const FrontLayer = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
	background: ${props => props.bg || "unset"};
`

const Title = styled.div`
	position: ${props => props.pos? props.pos[0] : "relative"};
  top: ${props => props.pos? props.pos[1] : "auto"};
  right: ${props => props.pos? props.pos[2] : "auto"};
  bottom: ${props => props.pos? props.pos[3] : "auto"};
  left: ${props => props.pos? props.pos[4] : "auto"};
	font-family: ${props => props.ff || "Bebas"};
	text-transform: uppercase;
	text-align: ${props => props.mTa || "left"};
	font-size: ${props => props.mFz || "5rem"};
  font-weight: ${props => props.fw || "bold"};
  line-height: ${props => props.lh || "1"};
  color: ${props => props.mColor || COLORS.RED};
  width: ${props => props.mWwidth || "auto"};
  margin: ${props => props.mMargin || "0"};
  ${props => props.lineBottom ? "padding-bottom: 3.3rem;" : ""};
  ${props => props.outline? "text-shadow: 1px 0 0px " + (props.outlineColor || COLORS.BLACK) + ", 0 1px 0px " + (props.outlineColor || COLORS.BLACK) + ", -1px 0 0px " + (props.outlineColor || COLORS.BLACK) + ", 0 -1px 0px " + (props.outlineColor || COLORS.BLACK) : ""};

  ${props => props.lineBottom ? "&::before {content: ''; display: block; width: " + (props.lineWidth? props.lineWidth : "7rem") + "; height: 3px; background: " + (props.lineBg? props.lineBg : "#fff") + "; position: absolute; bottom: 0; left: 0;}" : ""};

  .red {
  	color: ${COLORS.RED};
  }

  .black {
  	color: ${COLORS.BLACK};
  }

  small {
  	font-size: 50%;
  }

  .no-outline {
  	text-shadow: none;
  }

  @media screen and (min-width: 1280px) and (pointer: fine) {
  	color: ${props => props.color || COLORS.RED};
		font-size: ${props => props.fz || "5rem"};
  	text-align: ${props => props.ta || "left"};
  	width: ${props => props.width || "auto"};
  	margin: ${props => props.margin || "0"};
  }
`

const TextStyled = styled.div`
	font-size: 1.6rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: ${props => props.lh || "1.5"};
  letter-spacing: 0.37px;
  color: ${props => props.color || "#ffffff"};
  width: ${props => props.width || "auto"};
  margin: ${props => props.margin || "0"};

  .red {
  	color: ${COLORS.RED};
  }

  .black {
  	color: ${COLORS.BLACK};
  }

  &.is-ul-red {
		ul {
	    list-style: none;
	    margin-left: 0;

	    li {
	      position: relative;
	      padding-left: 2rem;
	      margin: 2.5rem 0;

	      &::before {
	        content: '';
	        display: block;
	        width: 0.7rem;
	        height: 0.7rem;
	        background: ${COLORS.RED};
	        position: absolute;
	        left: 0;
	        top: 50%;
	        margin-top: -0.35rem;
	        transform: rotate(45deg);
	      }
	    }
	  }
  }

  &.is-in-two-columns {
  	column-count: 2;
  	column-gap: 3em;
  }
`

const PulseBtn = styled.div`
	position: relative;
	width: 3rem;
	height: 3rem;
	background: #fff;
	border-radius: 50%;
	cursor: pointer;
	color: ${COLORS.RED};
	line-height: 3rem;
	text-align: center;
	font-size: 2.4rem;
	font-weight: 200;

	&::after, &::before {
		content: '';
		display: block;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
	}

	&::before {
		animation: pulse-btn-before 2s ease infinite;
	}

	&::after {
		animation: pulse-btn-after 2s ease 0.8s infinite;
	}

	.text {
		position: absolute;
		left: 100%;
		top: 0;
		display: block;
		font-size: 1.6rem;
	  font-weight: 500;
	  line-height: 3rem;
	  color: #fff;
	  margin: 0 0 0 2.4rem;
	}
`

const PlusBtn = styled.div`
	width: ${props => props.size || "2.3rem"};
  height: ${props => props.size || "2.3rem"};
  border-radius: 50%;
  background-color: ${props => props.bg || "unset"};
  background-image: ${props => props.bg? "unset" : "url(" + redPlus + ")"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  transition: background 500ms ease;
  // &::before {
  //   content: '+';
  //   color: #fff;
  //   font-size: 1.6rem;
  //   display: block;
  //   width: 100%;
  //   line-height: ${props => props.size || "2.3rem"};
  //   text-align: center;
  // }
  // &:hover {
  // 	background: ${COLORS.RED_HOVER};
  // }
`

const CursorBtnStyled = styled.div`
	@media screen and (min-width: 1280px) and (pointer: fine) {
	  position: fixed;
	  left: 0;
	  top: 0;
	  width: 4rem;
	  height: 4rem;
	  pointer-events: none;
	  z-index: 51;
	  will-change: transform;

	  &::after {
	    content: '';
	    display: block;
	    border-radius: 50%;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate3d(-50%, -50%, 0);
	  }

	  & + .cursor-circle {
	  	position: fixed;
	  	left: 0;
	  	top: 0;
	  	width: 4rem;
		  height: 4rem;
		  background: rgba(255, 255, 255, 0.5);
		  border-radius: 50%;
		  border: 1px solid #fff;
		  will-change: transform;
		  pointer-events: none;
	  	z-index: 50;
	  }

	  &::before {
	    content: '';
	    display: block;
	    width: 0.5rem;
	    height: 0.5rem;
	    background: #fff;
	    border-radius: 50%;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate3d(-50%, -50%, 0);
	  }

	  &.dark {
	    background: rgba(175, 177, 184, 0.3);
	    &::before {
	      background: ${COLORS.GREY};
	    }
	  }

	  &.cursor-plus {
	  	&::before {
	  		content: '+';
	  		background: ${COLORS.RED};
	  		color: ${COLORS.LIGHT_BLACK};
	  		border: 1px solid #fff;
	  		font-size: 1.8rem;
		    font-weight: normal;
		    text-align: center;
		    line-height: 2.3rem;
		    width: 2.3rem;
		    height: 2.3rem;
	  	}
	  }

	  &.cursor-play {
	  	border: 1px solid #fff;

	  	&::before {
	  		color: #fff;
	  		font-size: 1rem;
        line-height: normal;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    margin -0.5em -0.45em;
		    width: 0;
		    height: 0;
		    transition: width 500ms linear, height 500ms linear;
	  	}
	  }

	  .onhold & {
	    visibility: visible;
	    opacity: 1;

	    &::before {
	    	font-size: 0;
	      width: 100%;
	      height: 100%;
	    }

	    &::after {
	      animation: pulse-btn-before 2s ease infinite;
	    }
	  }
	}
`

const RedButton = styled.div`
	display: ${props => props.display || "inline-block"};
	background: ${COLORS.RED};
	color: #fff;
	font-size: 1.6rem;
	padding: ${props => props.padding || "1.2rem 2.4rem"};
	transition: background 300ms ease;
	border-radius: 2px;
	&:hover {
		background: ${COLORS.RED_HOVER};
	}
`

const SectionScroll = styled.div`
  position: ${props => props.pos? props.pos[0] : "absolute"};
  top: ${props => props.pos? props.pos[1] : "40%"};
  right: ${props => props.pos? props.pos[2] : "15%"};
  bottom: ${props => props.pos? props.pos[3] : "auto"};
  left: ${props => props.pos? props.pos[4] : "auto"};
  margin: ${props => props.margin || "0 15rem 0 0"};
	width: ${props => props.width || "auto"};
  transform: translate3d(0,0,0);
  transform-style: preserve-3d;
  transition: transform 300ms linear;
`

const InfoBlocks = styled.div`
	display: flex;
	margin: 7rem 0;

	.block {
		width: ${props => props.itemsCount? 100/props.itemsCount + "%" : "auto"};
		padding: ${props => props.padding || "1rem 8rem"};
		border-left: 1px solid ${props => props.lineColor || COLORS.LINE_GREY};
		&:last-child {
			border-right: 1px solid ${props => props.lineColor || COLORS.LINE_GREY};
		}

		.icon {
			height: 4rem;
    	margin-bottom: 2.5rem;
		}
	}
`

const ContentPart = styled.div`
	position: ${props => props.pos || "static"};
	padding: ${props => props.mPadding || "2rem"};
	background: ${props => props.bg || COLORS.BG_GREY};
	color: ${props => props.color || COLORS.BLACK};
	display: ${props => props.mFlex? "flex" : "block"};
	width: ${props => props.width || "100%"};
	height: ${props => props.height || "auto"};

	@media screen and (min-width: 1280px) and (pointer: fine) {
		padding: ${props => props.padding || "10rem 24rem"};
		display: ${props => props.flex? "flex" : "block"};
	}
`

const ContentColumn = styled.div`
	width: ${props => props.width || "auto"};
	padding: ${props => props.padding || "0"};
`

const InputFrame = styled.div`
	position: relative;
	width: ${props => props.width || "auto"};
	height: ${props => props.height || "auto"};

	input, textarea {
		font-size: 1.6rem;
  	font-weight: 600;
  	color: #fff;
		width: 100%;
		padding: 1.8rem 0;
		border: none;
		border-bottom: 1px solid #fff;
		background: unset;
		margin: 0 0 1.5rem 0;
		&:focus {
			outline: none;
		}
		&.error {
			border-bottom-color: ${COLORS.RED};
			color: ${COLORS.RED};
		}
	}

	input {
		padding-right: 12rem;
		&::placeholder {
			font-size: 0;
		}
	}

	textarea {
		resize: vertical;
    height: 5.5rem;
    min-height: 5.5rem;
    max-height: 15rem;
    overflow: hidden;
	}

	label {
		color: #fff;
		font-size: 1.6rem;
  	font-weight: 300;
		position: absolute;
		left: 0;
		right: 100%;
    top: calc(50% - 0.75rem);
    text-align: right;
    white-space: nowrap;
		transform: translateY(-50%);
		transition: right 500ms ease;
		pointer-events: none;

		&.is-focus {
			right: 0;
		}
	}
`

const FormStyled = styled.form`
	position: relative;
	background: ${COLORS.LIGHT_BLACK};
	padding: 7rem 11rem;

	.form-inputs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.form-bottom {
		display: flex;
		justify-content: flex-end;
		margin-top: 6rem;
	}

	.submit-button {
		font-size: 1.6rem;
  	font-weight: 600;
  	color: #fff;
  	padding: 1.2rem 2.2rem;
  	background: ${COLORS.RED};
  	border: none;
  	cursor: none;
  	flex-grow: 0;
    height: 5rem;
    transition: background 500ms ease;
    border-radius: 2px;

  	&:hover {
			background: ${COLORS.RED_HOVER};
  	}
		&:focus {
			outline: none;
		}
		&.disabled {
			pointer-events: none;
			opacity: 0.6;
		}
	}

	&.light {
		background: ${COLORS.WHITE_20};
	}
`

const PortfolioBackBtn = styled.div`
	font-size: 1.7rem;
	background-image: ${props => props.transparent? "url(" + backBtnWhite + ")" : "url(" + backBtnRed + ")"};
	background-size: contain;
	background-repeat: no-repeat;
	width: 7rem;
	height: 5.3rem;
	position: fixed;
	left: -1px;
	top: 50%;
	transition: background-image 500ms ease;

	&:hover {
		background-image: url(${backBtnHover});
	}
`

const BgVideo = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
		background: transparent;
		transition: background 500ms ease;
		pointer-events: none;
	}

  &.is-blurred {
  	filter: blur(6px);
  	&::before {
  		background: rgba(5, 11, 31, 0.25);
  	}
  }

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
  }
`


export { COLORS, SectionStyled, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, CursorBtnStyled, PlusBtn, SectionScroll, ContentPart, InfoBlocks, InputFrame, FormStyled, ContentColumn, RedButton, PortfolioBackBtn, BgVideo }