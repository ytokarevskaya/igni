import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { COLORS, Title, TextStyled } from "./styled"

const ProjectCover = (props) => {
	const isCarousel = props.prevSlide && props.nextSlide;
	return (
		<ProjectStyled data-index={props.index} className={"portfolio-item" + (props.state.active? " is-active" : "") + (props.state.next? " is-next" : "")} bg={props.project.backgroundColor} bgImg={props.project.backgroundImg? props.project.backgroundImg.file.url : ""} bgSize={props.project.backgroundMode === "Contain"? props.project.backgroundSize : ""} static={!isCarousel}>
			{isCarousel && props.index > 0?
				<div onClick={props.prevSlide} className="back-btn icon-arrow-bold translate-y" />
			: ""}
			<ProjectInfo>
				<div className="project-year ff-bebas">{new Date(props.project.date).getFullYear()}</div>
				<Title className="project-title" margin="3rem 0" color="#fff">{props.project.projectTitle}</Title>
				<TextStyled className="project-subtitle">{props.project.projectSubtitle}</TextStyled>
				<div className="project-subcategory ff-bebas">{props.project.subcategory}</div>
			</ProjectInfo>
			<ProjectNextInfo>
				<div className="project-year ff-bebas">{new Date(props.project.date).getFullYear()}</div>
				{isCarousel ?
					<div className="project-next icon-arrow-bold" onClick={props.nextSlide} />
					: ""}
				<div className="project-subcategory ff-bebas">{props.project.subcategory}</div>
			</ProjectNextInfo>
			<div className="project-title-bottom ff-bebas">{props.project.projectTitle}</div>
		</ProjectStyled>
	)
}

ProjectCover.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.object.isRequired,
  state: PropTypes.object,
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func
}

ProjectCover.defaultProps = {
  state: {
  	active: true,
  	next: false
  },
  prevSlide: null,
  nextSlide: null
}

const ProjectInfo = styled.div`
	position: absolute;
	left: 24rem;
	top: 40%;
	width: 35rem;

	.project-year, .project-subcategory {
		font-size: 1.7rem;
	}
	.project-year {
		margin-bottom: 7rem;
	}
	.project-subcategory {
		margin-top: 7rem;
	}
`

const ProjectNextInfo = styled(ProjectInfo)`
	position: absolute;
	left: 4.5rem;
	top: 4.5rem;
	bottom: 4.5rem;
	width: 20rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.project-year, .project-subcategory {
		margin: 0;
	}

	.project-next {
		font-size: 3rem;
		transform: rotate(180deg);
		text-align: right;
	}
`

const ProjectStyled = styled.div`
	position: ${props => props.static? "relative" : "absolute"};
	width: 100vw;
	height: 100vh;
	left: ${props => props.static? "auto" : "100%"};
	top: ${props => props.static? "auto" : "50%"};
	background-color: ${props => props.bg || "#fff"};
	background-image: ${props => props.bgImg? "url(" + props.bgImg + ")" : "unset"};
	background-size: ${props => props.bgSize? props.bgSize : "cover"};
	background-repeat: no-repeat;
	background-position: center center;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
	transition: all 1000ms ease;
	transform: translate3d(0, -50%, 0);

	&.is-active, &.is-next {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
	}

	&.is-active {
		transform: ${props => props.static? "none" : "translate3d(-100%, -50%, 0)"};
		${ProjectNextInfo}, .project-title-bottom {
    	opacity: 0;
    }
	}

	&.is-next {
		width: 50%;
    height: 50%;
    transform: translate3d(-35rem, -50%, 0);
    transition: all 1000ms ease 1000ms;

    ${ProjectInfo}, .back-btn {
    	opacity: 0;
    }
    ${ProjectNextInfo} {
    	opacity: 1;
    }
	}

	.project-title-bottom {
		font-size: 5rem;
  	font-weight: 100;
  	text-transform: uppercase;
  	position: absolute;
  	top: 100%;
  	left: 0;
  	width: 30rem;
  	margin-top: 5.5rem;
	}

	.back-btn {
		font-size: 1.7rem;
		color: ${COLORS.RED};
		background: #fff;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		position: absolute;
		left: 0;
		top: 50%;
		padding: 1.8rem 2.5rem;
	}
`

export default ProjectCover