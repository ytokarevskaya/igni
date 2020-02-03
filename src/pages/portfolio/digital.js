import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import RequestForm from "../../components/forms/request-form"
import ProjectCover from "../../components/project-cover"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { SectionScroll, COLORS, Title, TextStyled, FrontLayer, ContentPart, InfoBlocks, ContentColumn, RedButton } from "../../components/styled"

import arrowDown from "../../images/arrow-down-white.svg"
import teamIcon from "../../images/team.svg"
import baloonIcon from "../../images/air-balloon.svg"

const projects = [];
const projectRefs = [];

const PortfolioDigitalPage = (props) => {
	const { edges } = useProjectsData();

	edges.map((item) => {
    const project = item.node;
    if (project.category.slug === "digital") {
      projects.push(project);
    }
  });

	return (
		<Layout page="portfolio-digital" menuBtnStyle="right-corner" orderBtnStyle="right-corner" cursorStyle="dark">
			<SEO title="IGNI | Портфолио" />
			<Section id={0} active={true} name="section-portfolio" headerStyle="white" footerStyle="white">
				<FrontLayer bg={COLORS.LIGHT_BLACK}>
					<Scroll overflowLimit={1} width="100%" pos={["absolute", "0", "0", "0", "0"]}>
	          <ProjectsCarousel id="projects-carousel">
	          	{projects.map((item, index) => {
                return (
                  <Project key={item.id} index={index} project={item} />
                )
              })}
              <ArrowDown src={arrowDown} className="translate-y" />
	          </ProjectsCarousel>
						<PortfolioDesignTitle>
		          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff" lineWidth="3.5rem" width="25rem">Фото и видео продакшн</Title>
		          <TextStyled color="#fff" width="25rem" margin="3.5rem 0">Визуализируйте ваш бизнес</TextStyled>
	          </PortfolioDesignTitle>
	          <ContentPart>
	          	<Title color={COLORS.BLACK}>Статистика</Title>
	          	<InfoBlocks itemsCount={5}>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+15 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Количество лидов</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+130 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Повышение доверия к бренду</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+80 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Заполненность контент-плана</TextStyled>
			        	</div>
			        	<div className="block">
			        		<img className="icon" alt="" src={teamIcon} />
			        		<TextStyled color={COLORS.BLACK}>Новые источники трафика</TextStyled>
			        	</div>
			        	<div className="block">
			        		<img className="icon" alt="" src={baloonIcon} />
			        		<TextStyled color={COLORS.BLACK}>Увеличение доверия к бренду</TextStyled>
			        	</div>
			        </InfoBlocks>
			        <TextStyled color={COLORS.BLACK}><span className="red">*</span> Средние показатели на основании существующих кейсов</TextStyled>
	          </ContentPart>
	          <ContentPart flex>
	          	<ContentColumn padding="0 6rem 0 0" width="45rem">
	          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK} lineWidth="3.5rem">Приступим к работе над вашим проектом?</Title>
	          	</ContentColumn>
	          	<ContentColumn width="35rem">
	          		<TextStyled color={COLORS.BLACK}>Заполните бриф: расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для обсуждения дальнейшего сотрудничества.</TextStyled>
	          	</ContentColumn>
	          </ContentPart>
	          <ContentPartRequestForm padding="0 0 0 24rem">
	          	<RequestForm inputStyle="horizontal icon-square" pos={["relative", "", "", "", ""]} />
	          </ContentPartRequestForm>
	        </Scroll>
				</FrontLayer>
			</Section>
		</Layout>
	)
}

const ContentPartRequestForm = styled(ContentPart)`
	.form-bottom {
		justify-content: space-between;
	}

	.submit-button {
		order: 1;
	}
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

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": this.props.index === 0,
      "next": this.props.index === 1,
      "loading": 0,
      "unloading": 0
    }
    projectRefs.push(this);
  }

  nextSlide() {
  	const curItem = document.querySelector(".portfolio-item.is-active");
  	if (curItem) {
  		const curIndex = +curItem.dataset.index;
  		const newIndex = curIndex + 1;
  		projectRefs[curIndex].setState({"active": false});
  		projectRefs[newIndex].setState({"next": false});
  		projectRefs[newIndex].setState({"active": true});
  		if (projectRefs[newIndex + 1]) {
  			projectRefs[newIndex + 1].setState({"next": true});
  		}
  		handleVideos(curItem, curItem.nextElementSibling);
  	}
  }

  prevSlide() {
  	const curItem = document.querySelector(".portfolio-item.is-active");
  	if (curItem) {
  		const curIndex = +curItem.dataset.index;
  		const newIndex = curIndex - 1;
  		if (projectRefs[curIndex + 1]) {
  			projectRefs[curIndex + 1].setState({"next": false});
  		}
  		projectRefs[curIndex].setState({"active": false});
  		projectRefs[newIndex].setState({"next": false});
  		projectRefs[newIndex].setState({"active": true});
  		projectRefs[curIndex].setState({"next": true});
  		handleVideos(curItem, curItem.previousElementSibling);
  	}
  }

  render() {
  	return (
  		<ProjectCover index={this.props.index} project={this.props.project} state={this.state} prevSlide={this.prevSlide} nextSlide={carouselNextSlide} loading={this.state.loading} unloading={this.state.unloading} video={this.props.project.videoFile.file.url} />
  	)
  }
}

function carouselNextSlide(index) {
	index = typeof index === "number"? index : null;
	const carousel = document.getElementById("projects-carousel");
	const curItem = carousel.querySelector(".portfolio-item.is-active");
	if (curItem) {
		const curIndex = +curItem.dataset.index;
		const nextIndex = index || (projectRefs[curIndex + 1]? curIndex + 1 : 0);
		const nextItem = carousel.querySelector(".portfolio-item[data-index='" + nextIndex + "'");
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
				handleVideos(curItem, nextItem);
			}, 2400)
		}, 1000);
	}
}

function handleVideos(curProject, nextProject) {
	const curVideo = curProject.querySelector(".project-video");
	const newVideo = nextProject.querySelector(".project-video");
	if (curVideo) curVideo.pause();
	if (newVideo) newVideo.play();
}

const ProjectsCarousel = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
  overflow: hidden;
`

export default PortfolioDigitalPage