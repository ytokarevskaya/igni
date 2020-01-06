import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import Form from "../../components/form"
import ProjectCover from "../../components/project-cover"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { ScrollFrame, SectionScroll, COLORS, Title, TextStyled, FrontLayer, ContentPart, InfoBlocks, ContentColumn, InputFrame, RedButton } from "../../components/styled"

import arrowDown from "../../images/arrow-down-white.png"
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
		<Layout page="portfolio-digital">
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
		          </ProjectsCarousel>
							<PortfolioDesignTitle>
			          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff" width="25rem">Фото и видео продакшн</Title>
			          <TextStyled color="#fff" width="18rem" margin="3.5rem 0">Визуализируйте ваш бизнес</TextStyled>
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
				        		<TextStyled color={COLORS.BLACK}>Длина сессии</TextStyled>
				        	</div>
				        	<div className="block">
				        		<Title margin="0 0 2.5rem 0">+80 <small>%</small></Title>
				        		<TextStyled color={COLORS.BLACK}>Охват наиболее релевантной аудитории</TextStyled>
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
		          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK}>Приступим к работе над вашим проектом?</Title>
		          	</ContentColumn>
		          	<ContentColumn width="35rem">
		          		<TextStyled color={COLORS.BLACK}>Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества. </TextStyled>
		          	</ContentColumn>
		          </ContentPart>
		          <ContentPart padding="0 0 0 24rem">
		          	<Form action="" title="request" checkbox={false}>
				      		<div className="form-inputs">
					      		<InputFrame width="26%">
					      			<label>Имя</label>
					      			<input type="text" name="name" autoComplete="off" />
					      		</InputFrame>
					      		<InputFrame width="15%">
					      			<label>Телефон</label>
					      			<input type="text" name="phone" autoComplete="off" />
					      		</InputFrame>
					      		<InputFrame width="26%">
					      			<label>E-mail</label>
					      			<input type="email" name="email" autoComplete="off" />
					      		</InputFrame>
					      		<InputFrame width="26%">
					      			<label>Компания</label>
					      			<input type="text" name="company" autoComplete="off" />
					      		</InputFrame>
					      		<InputFrame width="100%">
					      			<textarea placeholder="Задача"></textarea>
					      		</InputFrame>
				      		</div>
				      		<div className="form-bottom">
				      			<button className="submit-button transition-03s" type="submit">Отправить бриф</button>
				      		</div>
				      	</Form>
		          </ContentPart>
		        </Scroll>
					</FrontLayer>
				</Section>
			</ScrollFrame>
		</Layout>
	)
}

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

export default PortfolioDigitalPage