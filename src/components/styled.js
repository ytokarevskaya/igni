import styled from "styled-components"

const COLORS = {
	RED: '#de5650',
	RED_HOVER: '#a73b37',
	BLACK: '#0a0d19',
	BLACK_30: 'rgba(0, 0, 0, 0.3)',
  LIGHT_BLACK: '#1f1f22',
	GREY: '#afb1b8',
  LINE_GREY: '#979797',
  LINE_GREY_20: 'rgba(151, 151, 151, 0.2)',
	BG_GREY: '#f6f7f9'
};

const ScrollFrame = styled.main`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`

const SectionStyled = styled.section`
	position: relative;
	width: 100%;
	height: 100vh;
	transition: all 800ms ease-in-out;
	visibility: hidden;
	opacity: 0;
  cursor: none;

	&.active {
		position: absolute;
		top: 0;
		left: 0;
		visibility: visible;
		opacity: 1;
	}

	&.onhold {
		cursor: none;
	}
`

const BackLayer = styled.div`
	position: absolute;
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
	position: relative;
	font-family: ${props => props.ff || "Bebas"};
	text-transform: uppercase;
	text-align: ${props => props.ta || "left"};
	font-size: ${props => props.fz || "5rem"};
  font-weight: bold;
  line-height: ${props => props.lh || "1"};
  color: ${props => props.color || COLORS.RED};
  width: ${props => props.width || "auto"};
  margin: ${props => props.margin || "0"};
  ${props => props.lineBottom ? "padding-bottom: 3.3rem;" : ""};
  ${props => props.outline? "text-shadow: 1px 0 0px #000, 0 1px 0px #000, -1px 0 0px #000, 0 -1px 0px #000" : ""};

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

const CursorBtn = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 25;
  tranform: translate(-50%, -50%);

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

  &.dark {
    background: rgba(175, 177, 184, 0.3);
    &::before {
      background: ${COLORS.GREY};
    }
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

const RedButton = styled.div`
	display: ${props => props.display || "inline-block"};
	background: ${COLORS.RED};
	color: #fff;
	font-size: 1.6rem;
	padding: ${props => props.padding || "1.2rem 2.4rem"};
	transition: background 300ms ease;
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
  margin-right: 15rem;
	width: ${props => props.width || "auto"};
  transform: translate3d(0,0,0);
`

const InfoBlocks = styled.div`
	display: flex;
	margin: 7rem 0;

	.block {
		width: ${props => props.itemsCount? 100/props.itemsCount + "%" : "auto"};
		padding: 1rem 8rem;
		border-left: 1px solid ${COLORS.LINE_GREY};
		&:last-child {
			border-right: 1px solid ${COLORS.LINE_GREY};
		}

		.icon {
			height: 4rem;
    	margin-bottom: 2.5rem;
		}
	}
`

const ContentPart = styled.div`
	padding: ${props => props.padding || "10rem 24rem"};
	background: ${props => props.bg || COLORS.BG_GREY};
	color: ${props => props.color || COLORS.BLACK};
	display: ${props => props.flex? "flex" : "block"};
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
	}

	input {
		padding-right: 12rem;
	}

	textarea {
		resize: vertical;
    height: 5.5rem;
    min-height: 5.5rem;
    max-height: 15rem;
    overflow: hidden;
	}

	label {
		font-size: 1.6rem;
  	font-weight: 300;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}
`

const FormStyled = styled.div`
	background: ${COLORS.LIGHT_BLACK};
	padding: 7rem 11rem;

	.form-inputs {
		display: flex;
		flex-wrap: wrap;
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
  	&:hover {

  	}
	}
`

export { COLORS, ScrollFrame, SectionStyled, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, CursorBtn, SectionScroll, ContentPart, InfoBlocks, InputFrame, FormStyled, ContentColumn, RedButton }