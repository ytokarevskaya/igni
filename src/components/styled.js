import styled from "styled-components"

const COLORS = {
	RED: '#de5650',
	BLACK: '#0a0d19',
	GREY: '#afb1b8',
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
  ${props => props.lineBottom ? "padding-bottom: 3.3rem;" : ""};

  ${props => props.lineBottom ? "&::before {content: ''; display: block; width: 3.5rem; height: 3px; background: #fff; position: absolute; bottom: 0; left: 0;}" : ""};

  .red {
  	color: ${COLORS.RED};
  }
`

const TextStyled = styled.div`
	font-size: 1.6rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.37px;
  color: ${props => props.color || "#ffffff"};
  width: ${props => props.width || "auto"};
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
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 50;
  margin: -1.5rem;

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

  &.visible {
  	visibility: visible;
    opacity: 1;
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

export { COLORS, ScrollFrame, SectionStyled, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, CursorBtn }