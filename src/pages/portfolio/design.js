import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import Form from "../../components/form"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { ScrollFrame, SectionScroll, COLORS, Title, TextStyled, FrontLayer, ContentPart, InfoBlocks, ContentColumn, InputFrame, RedButton } from "../../components/styled"

import arrowDown from "../../images/arrow-down-white.png"


const projects = [];
const projectRefs = [];

const PortfolioDesignPage = (props) => {
	const { edges } = useProjectsData();

	edges.map((item) => {
    const project = item.node;
    if (project.category.title === "Дизайн") {
      projects.push(project);
    }
  });

	return (
		<Layout page="portfolio-design">
			<SEO title="IGNI | Портфолио" />
			<ScrollFrame>
				<Section id={0} active={true} name="section-portfolio" headerStyle="white" footerStyle="white">
					<FrontLayer bg={COLORS.LIGHT_BLACK}>
						<Scroll width="100%" pos={["absolute", "0", "0", "0", "0"]}>
		          <ProjectsCarousel>
		          	{projects.map((item, index) => {
	                return (
	                  <Project key={item.id} index={index} project={item} />
	                )
	              })}
	              <ArrowDown src={arrowDown} className="translate-y" />
		          </ProjectsCarousel>
							<PortfolioDesignTitle>
			          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff">Дизайн</Title>
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
		          		<Form action="" title="request" checkbox={false}>
					      		<div className="form-inputs">
						      		<InputFrame width="35%">
						      			<label>Имя</label>
						      			<input type="text" name="name" autoComplete="off" />
						      		</InputFrame>
						      		<InputFrame width="35%">
						      			<label>Телефон</label>
						      			<input type="text" name="phone" autoComplete="off" />
						      		</InputFrame>
					      			<button className="submit-button transition-03s" type="submit">Отправить бриф</button>
					      		</div>
					      	</Form>
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
  		<ProjectStyled data-index={this.props.index} className={"portfolio-item" + (this.state.active? " is-active" : "") + (this.state.next? " is-next" : "")} bg={this.props.project.backgroundColor} bgImg={this.props.project.backgroundImg? this.props.project.backgroundImg.file.url : ""} bgSize={this.props.project.backgroundMode === "Contain"? this.props.project.backgroundSize : ""}>
  			{this.props.index > 0?
  				<div onClick={this.prevSlide} className="back-btn icon-arrow-bold translate-y" />
  			: ""}
  			<ProjectInfo>
  				<div className="project-year ff-bebas">{new Date(this.props.project.date).getFullYear()}</div>
  				<Title className="project-title" margin="3rem 0" color="#fff">{this.props.project.projectTitle}</Title>
  				<TextStyled className="project-subtitle">{this.props.project.projectSubtitle}</TextStyled>
  				<div className="project-subcategory ff-bebas">{this.props.project.subcategory}</div>
  			</ProjectInfo>
  			<ProjectNextInfo>
  				<div className="project-year ff-bebas">{new Date(this.props.project.date).getFullYear()}</div>
  				<div className="project-next icon-arrow-bold" onClick={this.nextSlide} />
  				<div className="project-subcategory ff-bebas">{this.props.project.subcategory}</div>
  			</ProjectNextInfo>
  			<div className="project-title-bottom ff-bebas">{this.props.project.projectTitle}</div>
  		</ProjectStyled>
  	)
  }
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

const ProjectsCarousel = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
`

const ProjectStyled = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 100%;
	top: 50%;
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
		transform: translate3d(-100%, -50%, 0);
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

export default PortfolioDesignPage