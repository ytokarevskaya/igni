import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import RequestForm from "../../components/forms/request-form"
import CallbackForm from "../../components/forms/callback-form"
import ProjectCover from "../../components/project-cover"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { getURLParameter } from "../../components/utils"
import { SectionScroll, COLORS, Title, TextStyled, FrontLayer, ContentPart, InfoBlocks, ContentColumn, RedButton, PortfolioBackBtn } from "../../components/styled"

import arrowDown from "../../images/arrow-down-white.svg"


const projects = [];
const projectRefs = [];

const PortfolioDesignPage = (props) => {
	const { edges } = useProjectsData();
	let activeProject = 0;

	edges.map((item) => {
    const project = item.node;
    if (project.category.slug === "design") {
      projects.push(project);
      if (getURLParameter("active") && getURLParameter("active") === project.slug) {
      	activeProject = projects.length - 1;
      }
    }
  });

	return (
		<Layout page="portfolio-design">
			<SEO title="IGNI | Портфолио" />
			<Section id={0} active={true} name="section-portfolio" headerStyle="white" footerStyle="white" height="auto">
				<FrontLayer bg={COLORS.LIGHT_BLACK}>
	          <ProjectsCarousel id="projects-carousel">
	          	{projects.map((item, index) => {
                return (
                  <Project key={item.id} index={index} project={item} activeProject={activeProject} lastProject={projects.length - 1} />
                )
              })}
              <ArrowDown src={arrowDown} className="translate-y" />
              {/*<ProjectsSlider className="translate-x">
						    <Slider />
						  </ProjectsSlider>*/}
						  {/*<ProjectsCarouselNavigation items={projects} activeProject={activeProject} />*/}
						  <a href="/"><PortfolioBackBtn className="icon-arrow-bold translate-y" /></a>
	          </ProjectsCarousel>
						<PortfolioDesignTitle>
		          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff" lineWidth="3.3rem">Дизайн</Title>
		          <TextStyled color="#fff" width="18rem" margin="3.5rem 0">Сделайте первое впечатление клиента незабываемым</TextStyled>
	          </PortfolioDesignTitle>
	          <ContentPart id="scrollTo-statistics">
	          	<Title color={COLORS.BLACK}>Статистика</Title>
	          	<InfoBlocks itemsCount={5}>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+150 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Количество лидов</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+120 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Длина сессии</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+65 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Посещаемость</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+40 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Глубина просмотра</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">-50 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Количество отказов</TextStyled>
			        	</div>
			        </InfoBlocks>
	          </ContentPart>
	          <ContentPart bg={COLORS.LIGHT_BLACK} color="#fff" flex>
	          	<ContentColumn width="30%">
	          		<Title color="#fff" lineBottom lineBg="#fff" lineWidth="3.5rem">Приступим к работе над вашим проектом?</Title>
	          	</ContentColumn>
	          	<ContentColumn width="70%">
	          		<CallbackForm noFileInput buttonLabel="Готово!" />
	          	</ContentColumn>
	          </ContentPart>
	          <ContentPart>
	          	<ContentColumn width="30%">
	          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK} lineWidth="3.5rem">Почему дизайн имеет значение?</Title>
	          		<TextStyled color={COLORS.BLACK} margin="3.5rem 0">В нашем блоге вы найдете серию статей, посвященных веб-дизайну. Вы узнаете, зачем делать редизайн, какие сайты дают наибольшую конверсию, какие тренды сейчас наиболее актуальны и многое другое.</TextStyled>
	          		<RedButton>В блог</RedButton>
	          	</ContentColumn>
	          </ContentPart>
	          <ContentPart flex  id="scrollTo-contacts">
	          	<ContentColumn padding="0 6rem 0 0" width="45rem">
	          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK} lineWidth="3.5rem">Приступим к работе над вашим проектом?</Title>
	          	</ContentColumn>
	          	<ContentColumn width="35rem">
	          		<TextStyled color={COLORS.BLACK}>Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества. </TextStyled>
	          	</ContentColumn>
	          </ContentPart>
	          <ContentPartRequestForm padding="0 0 0 24rem">
	          	<RequestForm inputStyle="horizontal icon-square" pos={["relative", "", "", "", ""]} />
	          </ContentPartRequestForm>
				</FrontLayer>
			</Section>
		</Layout>
	)
}

class ProjectsCarouselNavigation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ProjectsCarouselNavigationStyled className="translate-xy" id="carousel-navigation">
				{this.props.items.map((item, index) => {
					return (
						<div className={"item" + (index === this.props.activeProject? " is-active" : "")} key={index} data-index={index} onClick={carouselNavigationClick}>
							<div className="line" />
							<div className="line" />
							<div className="line" />
							<div className="line" />
							<div className="line" />
							<div className="line" />
						</div>
					)
				})}
			</ProjectsCarouselNavigationStyled>
		)
	}
}

const ProjectsCarouselNavigationStyled = styled.div`
	position: absolute;
	bottom: 7.5rem;
	left: 50%;
	display: flex;
	height: 5px;

	.item {
		display: flex;
		align-items: center;
		transition-delay: 500ms;

		&.is-active {
			transition-delay: 0;
			.line {
				height: 17px;
				&:first-child, &:last-child {
					height: 10px;
				}
			}
		}
		&:not(.is-active):hover {
			transition-delay: 0;
			.line {
				height: 10px;
				&:first-child, &:last-child {
					height: 8px;
				}
			}
		}

		.line {
			width: 1px;
			height: 5px;
			background: #fff;
			margin: 0 3px;
			transition: height 500ms ease;
		}
	}
`

const ContentPartRequestForm = styled(ContentPart)`
	.form-bottom {
		justify-content: space-between;
	}

	.submit-button {
		order: 1;
	}
`

const ProjectsSlider = styled.div`
	position: absolute;
	bottom: 2.5rem;
	left: 50%;
	width: 40%;
`

const ArrowDown = styled.img`
	position: absolute;
	left: 23.5rem;
	bottom: 2.5rem;
	height: 9rem;
`

const PortfolioDesignTitle = styled.div`
	position: absolute;
	top: 10rem;
	left: 24rem;
`

function carouselNavigationClick(e) {
	const target = e.currentTarget;
	const index = +target.dataset.index;
	const currentNext = document.getElementById("projects-carousel").querySelector(".portfolio-item.is-next");
	const currentNextIndex = +currentNext.dataset.index;
	if (currentNextIndex !== index) {
		projectRefs[currentNextIndex].setState({"next": false});
		projectRefs[index].setState({"next": true});
	}
	setTimeout(() => {
		carouselNextSlide(index);
	}, currentNextIndex === index? 0 : 1500);
	// navigationMenuToggle(index);
}

function navigationMenuToggle(activeIndex) {
	const nav = document.getElementById("carousel-navigation");
	nav.querySelector(".is-active").classList.remove("is-active");
	nav.children[activeIndex].classList.add("is-active");
}

function carouselNextSlide(index) {
	index = typeof index === "number"? index : null;
	const carousel = document.getElementById("projects-carousel");
	const curItem = carousel.querySelector(".portfolio-item.is-active");
	if (curItem) {
		const curIndex = +curItem.dataset.index;
		const nextIndex = index || (projectRefs[curIndex + 1]? curIndex + 1 : 0);
		projectRefs[curIndex].setState({"active": false});
		projectRefs[curIndex].setState({"unloading" : true});
		setTimeout(() => {
			projectRefs[nextIndex].setState({"next": false});
			projectRefs[nextIndex].setState({"loading": true});
			// navigationMenuToggle(nextIndex);
			setTimeout(() => {
				projectRefs[nextIndex].setState({"loading": false});
				projectRefs[nextIndex].setState({"active": true});
				projectRefs[curIndex].setState({"unloading" : false});
				if (projectRefs[nextIndex + 1]) {
					projectRefs[nextIndex + 1].setState({"next": true});
				} else {
					projectRefs[0].setState({"next": true});
				}
			}, 1800)
		}, 900);
	}
}

function carouselPrevSlide() {
	const carousel = document.getElementById("projects-carousel");
	const curItem = carousel.querySelector(".portfolio-item.is-active");
	if (curItem) {
		const curIndex = +curItem.dataset.index;
		const nextIndex = projectRefs[curIndex - 1]? curIndex - 1 : projectRefs.length - 1;
		projectRefs[curIndex].setState({"active": false});
		projectRefs[curIndex].setState({"unloading" : true});
		setTimeout(() => {
			projectRefs[nextIndex].setState({"next": false});
			projectRefs[nextIndex].setState({"loading": true});
			setTimeout(() => {
				projectRefs[nextIndex].setState({"loading": false});
				projectRefs[nextIndex].setState({"active": true});
				projectRefs[curIndex].setState({"unloading" : false});
				if (projectRefs[curIndex + 1]) {
					projectRefs[curIndex + 1].setState({"next": false});
				}
			}, 1800)
		}, 900);
	}
	// const curItem = document.querySelector(".portfolio-item.is-active");
	// if (curItem) {
	// 	const curIndex = +curItem.dataset.index;
	// 	const newIndex = curIndex - 1;
	// 	if (projectRefs[curIndex + 1]) {
	// 		projectRefs[curIndex + 1].setState({"next": false});
	// 	}
	// 	projectRefs[curIndex].setState({"active": false});
	// 	projectRefs[newIndex].setState({"next": false});
	// 	projectRefs[newIndex].setState({"active": true});
	// 	projectRefs[curIndex].setState({"next": true});
	// }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": this.props.index === this.props.activeProject,
      "next": (this.props.index === this.props.activeProject + 1) || (this.props.activeProject === this.props.lastProject && this.props.index === 0),
      "loading": 0,
      "unloading": 0
    }
    projectRefs.push(this);
  }

  render() {
  	return (
  		<ProjectCover index={this.props.index} project={this.props.project} state={this.state} prevSlide={carouselPrevSlide} nextSlide={carouselNextSlide} loading={this.state.loading} unloading={this.state.unloading} />
  	)
  }
}

const ProjectsCarousel = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
`

export default PortfolioDesignPage