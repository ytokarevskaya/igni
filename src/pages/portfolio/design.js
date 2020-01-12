import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import RequestForm from "../../components/forms/request-form"
import CallbackForm from "../../components/forms/callback-form"
import ProjectCover from "../../components/project-cover"
import Slider from "rc-slider"
import "rc-slider/assets/index.css";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { ScrollFrame, SectionScroll, COLORS, Title, TextStyled, FrontLayer, ContentPart, InfoBlocks, ContentColumn, RedButton } from "../../components/styled"

import arrowDown from "../../images/arrow-down-white.svg"


const projects = [];
const projectRefs = [];

const PortfolioDesignPage = (props) => {
	const { edges } = useProjectsData();

	edges.map((item) => {
    const project = item.node;
    if (project.category.slug === "design") {
      projects.push(project);
    }
  });

	return (
		<Layout page="portfolio-design">
			<SEO title="IGNI | Портфолио" />
			<ScrollFrame>
				<Section id={0} active={true} name="section-portfolio" headerStyle="white" footerStyle="white">
					<FrontLayer bg={COLORS.LIGHT_BLACK}>
						<Scroll overflowLimit={1} width="100%" pos={["absolute", "0", "0", "0", "0"]}>
		          <ProjectsCarousel>
		          	{projects.map((item, index) => {
	                return (
	                  <Project key={item.id} index={index} project={item} />
	                )
	              })}
	              <ArrowDown src={arrowDown} className="translate-y" />
	              {/*<ProjectsSlider className="translate-x">
							    <Slider />
							  </ProjectsSlider>*/}
		          </ProjectsCarousel>
							<PortfolioDesignTitle>
			          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff" lineWidth="3.3rem">Дизайн</Title>
			          <TextStyled color="#fff" width="18rem" margin="3.5rem 0">сделайте первое впечатление клиента незабываемым</TextStyled>
		          </PortfolioDesignTitle>
		          <ContentPart>
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
		          		<Title color="#fff" lineBottom lineBg="#fff">Приступим к работе над вашим проектом?</Title>
		          	</ContentColumn>
		          	<ContentColumn width="70%">
		          		<CallbackForm />
		          	</ContentColumn>
		          </ContentPart>
		          <ContentPart>
		          	<ContentColumn width="30%">
		          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK}>Почему дизайн имеет значение?</Title>
		          		<TextStyled color={COLORS.BLACK} margin="3.5rem 0">В нашем блоге вы найдете серию статей, посвященных веб-дизайну. Вы узнаете, зачем делать редизайн, какие сайты дают наибольшую конверсию, какие тренды сейчас наиболее актуальны и многое другое</TextStyled>
		          		<RedButton>В блог</RedButton>
		          	</ContentColumn>
		          </ContentPart>
		          <ContentPart flex>
		          	<ContentColumn padding="0 6rem 0 0" width="45rem">
		          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK}>Приступим к работе над вашим проектом?</Title>
		          	</ContentColumn>
		          	<ContentColumn width="35rem">
		          		<TextStyled color={COLORS.BLACK}>Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества. </TextStyled>
		          	</ContentColumn>
		          </ContentPart>
		          <ContentPart padding="0 0 0 24rem">
		          	<RequestForm />
		          </ContentPart>
		        </Scroll>
					</FrontLayer>
				</Section>
			</ScrollFrame>
		</Layout>
	)
}

const ProjectsSlider = styled.div`
	position: absolute;
	bottom: 2.5rem;
	left: 50%;
	width: 40%;
`

const ArrowDown = styled.img`
	position: absolute;
	left: 22rem;
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
      "next": this.props.index === 1
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
  	}
  }

  render() {
  	return (
  		<ProjectCover index={this.props.index} project={this.props.project} state={this.state} prevSlide={this.prevSlide} nextSlide={this.nextSlide} />
  	)
  }
}

const ProjectsCarousel = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
`

export default PortfolioDesignPage