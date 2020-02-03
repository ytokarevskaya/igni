import React from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

import { COLORS, Title, TextStyled, BgVideo, PortfolioBackBtn } from "./styled"

const ProjectCover = (props) => {
	const isCarousel = props.prevSlide && props.nextSlide;
	return (
		<ProjectStyled data-index={props.index} className={"portfolio-item" + (props.state.active? " is-active" : "") + (props.state.loading? " animate-load" : "") + (props.state.unloading? " animate-unload" : "") + (props.state.next? " is-next" : "")} bg={props.project.backgroundColor} bgImg={props.project.backgroundImg? props.project.backgroundImg.file.url : ""} bgSize={props.project.backgroundMode === "Contain"? props.project.backgroundSize : ""} static={!isCarousel} category={props.project.category.slug}>
			{props.project.category.slug === "design" && isCarousel ?
				<a className="full-project-link div_100" href={"/portfolio/" + props.project.category.slug + "/" + props.project.slug} /> : ""
			}
			{props.video?
				<BgVideo>
	        <video autoPlay={props.index === 0} className="project-video translate-xy" loop={true}>
	          <source src={props.video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
	        </video>
	      </BgVideo>
				: ""
			}
			{/*isCarousel && props.index > 0?
				"" : 
		  <div onClick={props.prevSlide} className="back-btn icon-arrow-bold translate-y" />
				<a href="/"><PortfolioBackBtn className="icon-arrow-bold translate-y" /></a>
			*/}
			<ProjectInfo className="transition-03s">
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
  nextSlide: PropTypes.func,
  video: PropTypes.string
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

const animateUnload = keyframes`
  0% {
    opacity: 1;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 50%;
  }
  40% {
  	opacity: 1;
		width: 50%;
		height: 50%;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
  }
  100% {
  	opacity: 1;
  	width: 50%;
		height: 50%;
		top: 50%;
    left: -100%;
    transform: translate3d(-50%, -50%, 0);
  }
`

const animateLoad = keyframes`
  0% {
  	opacity: 1;
  	width: 50%;
		height: 50%;
		top: 50%;
    left: 100%;
    transform: translate3d(-50%, -50%, 0);
  }
  40% {
  	opacity: 1;
		width: 50%;
		height: 50%;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
  }
  100% {
    opacity: 1;
		width: 100vw;
		height: 100vh;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
  }
`

const ProjectStyled = styled.div`
	position: ${props => props.static? "relative" : "absolute"};
	width: 50%;
  height: 50%;
	left: ${props => props.static? "auto" : "100%"};
	top: ${props => props.static? "auto" : "50%"};
	background-color: ${props => props.bg || "transparent"};
	background-image: ${props => props.bgImg? "url(" + props.bgImg + ")" : "unset"};
	background-size: ${props => props.bgSize? props.bgSize : "cover"};
	background-repeat: no-repeat;
	background-position: center center;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
	transition: all 1000ms ease;
	transform: translate3d(0, -50%, 0);

	&.is-active, &.is-next, &.animate-unload, &.animate-load {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
		${props => props.category === "digital"? "&::before {content: '';display: block;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.4);position: absolute;left: 0;top: 0;pointer-events: none;}" : ""}
	}

	&.is-active {
		width: 100vw;
		height: 100vh;
		left: 0;
		${props => props.static? "transform: none;" : ""}

		${ProjectNextInfo}, .project-title-bottom {
    	opacity: 0;
    }

    ${ProjectInfo} {
    	pointer-events: none;
    }
	}

	&.animate-unload {
		animation: 2.4s ${animateUnload} ease-out forwards;

		${ProjectInfo} {
    	opacity: 0;
    }
	}

	&.animate-load {
		animation: 2.4s ${animateLoad} ease-out forwards;

		${ProjectInfo} {
    	opacity: 0;
    }
	}

	&.is-next {
		left: 100%;
		width: 50%;
    height: 50%;
    background-color: ${props => props.bg || COLORS.BLACK};
    transform: translate3d(-35rem, -50%, 0);
    transition: all 1000ms ease 1000ms;
    z-index: 1;

    ${ProjectInfo} {
    	opacity: 0;
    }
    ${ProjectNextInfo} {
    	opacity: 1;
    }
    .full-project-link, .full-video-link {
    	display: none;
    }
	}

	.full-project-link, .full-video-link {
		cursor: none;
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

	${BgVideo} {
		width: 100%;
		height: 100%;
		
		video {
			width: 100%;
			height: auto;
		}
	}
`

export default ProjectCover