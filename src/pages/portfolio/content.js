import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import RequestForm from "../../components/forms/request-form"
import CallbackForm from "../../components/forms/callback-form"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { SectionScroll, COLORS, Title, TextStyled, FrontLayer, InfoBlocks, ContentPart, ContentColumn } from "../../components/styled"

import teamIcon from "../../images/team.svg"
import baloonIcon from "../../images/air-balloon.svg"
import arrowDown from "../../images/arrow-down-black.svg"
import contentText from "../../images/content-text.svg"

const PortfolioContentPage = () => {
	const { edges } = useProjectsData();
	const projects = [];
	const projectsBlog = [];
	edges.map((item) => {
    const project = item.node;
    if (project.subcategory === "Ведение личного блога") {
    	projectsBlog.push(project);
    } else if (project.category.title === "Контент") {
      projects.push(project);
    }
  });

	return (
		<Layout page="portfolio-content" menuBtnStyle="right-corner" orderBtnStyle="right-corner" cursorStyle="dark">
			<SEO title="IGNI | Портфолио" />
				<Section id={0} active={true} name="section-portfolio" headerStyle="dark" footerStyle="dark">
					<FrontLayer bg={COLORS.BG_GREY}>
						<Scroll overflowLimit={1} width="auto" pos={["absolute", "0", "0", "0", "0"]} margin="0">
							<ContentPart bg="transparent" padding="10rem 24rem">
			          <Title fz="5rem" color={COLORS.RED} lineBottom lineBg={COLORS.BLACK}>Контент-маркетинг</Title>
			          <TextStyled color={COLORS.BLACK} width="18rem" margin="3.5rem 0">Позвольте клиенту найти то, что он ищет</TextStyled>
				        <PortfolioSlogan>
				        	<Title fz="8rem" outline outlineColor={COLORS.GREY} color={COLORS.BG_GREY}><span className="black no-outline">Наша задача – </span>убедить потенциального клиента в том, что ваш продукт решает его проблему. <br/>Мы делаем это с помощью <span className="red no-outline">контента</span></Title>
				        	{/*<img src={contentText} alt="" />*/}
				        </PortfolioSlogan>
			        </ContentPart>
				      <ArrowDown src={arrowDown} alt="" />
			        <ContentPart bg="transparent" padding="5rem 24rem">
				        <Title color={COLORS.BLACK} margin="0 0 7rem 0">Услуги</Title>
				        <InfoBlocks padding="0 3rem" lineColor={COLORS.GREY}>
				        	<div className="block" style={{"borderLeft" : "unset", "paddingLeft": 0}}>
				        		<Title color={COLORS.BLACK} fz="1.7rem">Нейминг</Title>
				        	</div>
				        	<div className="block">
				        		<Title color={COLORS.BLACK} fz="1.7rem">Контент-маркетинг</Title>
				        	</div>
				        	<div className="block">
				        		<Title color={COLORS.BLACK} fz="1.7rem">Наполнение сайта</Title>
				        	</div>
				        	<div className="block">
				        		<Title color={COLORS.BLACK} fz="1.7rem">Ведение корпоративного или авторского блога</Title>
				        	</div>
				        	<div className="block">
				        		<Title color={COLORS.BLACK} fz="1.7rem">SEO-оптимизация</Title>
				        	</div>
				        	<div className="block">
				        		<Title color={COLORS.BLACK} fz="1.7rem">Локализация</Title>
				        	</div>
				        	<div className="block">
				        		<Title color={COLORS.BLACK} fz="1.7rem">Креативы для рекламы</Title>
				        	</div>
				        	<div className="block" style={{"borderRight" : "unset"}}>
				        		<Title color={COLORS.BLACK} fz="1.7rem">Презентационные материалы</Title>
				        	</div>
				        </InfoBlocks>
			        </ContentPart>
			        <ContentPart bg="transparent" padding="5rem 24rem">
				        <Title color={COLORS.BLACK} margin="0 0 7rem 0">Статистика</Title>
				        <InfoBlocks itemsCount={5}>
				        	<div className="block">
				        		<Title margin="0 0 2.5rem 0">+280 <small>%</small></Title>
				        		<TextStyled color={COLORS.BLACK}>Количество лидов</TextStyled>
				        	</div>
				        	<div className="block">
				        		<Title margin="0 0 2.5rem 0">+145 <small>%</small></Title>
				        		<TextStyled color={COLORS.BLACK}>Длина сессии</TextStyled>
				        	</div>
				        	<div className="block">
				        		<Title margin="0 0 2.5rem 0">+60 <small>%</small></Title>
				        		<TextStyled color={COLORS.BLACK}>Глубина просмотра</TextStyled>
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
			        <ContentPart bg="transparent" padding="5rem 24rem">
				        <Title color={COLORS.BLACK} margin="0 0 5rem 0">Портфолио</Title>
				        {projects.map((item, index) => {
				        	console.log(item);
	                return (
	                  <PortfolioContent key={item.id} project={item} type="all" last={index + 1 === projects.length} />
	                )
	              })}
              </ContentPart>
              <ContentPart bg={COLORS.LIGHT_BLACK} color="#fff" flex>
		          	<ContentColumn width="30%" padding="5rem 0">
		          		<Title color="#fff" lineBottom lineBg="#fff">Приступим к работе над вашим проектом?</Title>
		          	</ContentColumn>
		          	<ContentColumn width="70%">
		          		<CallbackForm />
		          	</ContentColumn>
		          </ContentPart>
		          <ContentPart bg="transparent">
	              <Title fz="5rem" color={COLORS.BLACK}>Ведение личного <br/>блога</Title>
	              {projectsBlog.map((item, index) => {
	                return (
	                  <PortfolioContent key={item.id} project={item} type="blog" last={index + 1 === projectsBlog.length} />
	                )
	              })}
              </ContentPart>
              <ContentPart bg="transparent" padding="5rem 24rem 7rem 24rem" flex>
		          	<ContentColumn width="50rem" padding="0 10rem 0 0">
		          		<Title color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK}>Приступим к работе над вашим проектом?</Title>
		          	</ContentColumn>
		          	<ContentColumn width="40rem">
		          		<TextStyled color={COLORS.BLACK}>Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества. </TextStyled>
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

class PortfolioContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"closed": false
		}
	}

	projectToggle() {
		if (this.state.closed) {
			this.setState({"closed": false});
		} else {
			this.setState({"closed": true});
		}
	}

	render() {
		return (
			<PortfolioContentStyled className={(this.props.type === "all" && this.props.last? "last" : "") + (this.state.closed? " closed" : "")}>
		  	<header>
		  		{this.props.project.logo?
			  		<div className="logo">
			  			<img className="translate-y" src={this.props.project.logo.file.url} />
			  		</div>
		  			: ""}
		  		<div className="info">
		  			<div className="year ff-bebas">{new Date(this.props.project.date).getFullYear()}</div>
		  			<div className={"title" + (this.props.type === "all"? " tt-uppercase" : "")}>{this.props.project.projectTitle}</div>
		  		</div>
		  		<TextStyled color={COLORS.BLACK}>
		  			{this.props.project.projectSubtitle}
		  		</TextStyled>
		  	</header>
		  	{this.props.project.description?
		  		<React.Fragment>
				  	<main>
				  		<div className="title">Перечень работ:</div>
				  		<div className="content">
				  			{this.props.project.description.json.content[0].nodeType === "unordered-list" && this.props.project.description.json.content[0].content.length > 1?
				  			<TextStyled color={COLORS.BLACK} className="is-ul-red is-in-two-columns" dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.project.description.json)}} /> :
				  			<TextStyled color={COLORS.BLACK} className="is-ul-red" dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.project.description.json)}} />
				  			}
				  		</div>
				  	</main>
				  	<HideBtn onClick={(e) => this.projectToggle(e)} className={this.state.closed? "closed" : ""}>{this.state.closed? "Развернуть" : "Скрыть"}</HideBtn>
			  	</React.Fragment>
			  	: ""}
		  </PortfolioContentStyled>
		)
	}
}

const ContentPartRequestForm = styled(ContentPart)`
	.form-bottom {
		justify-content: space-between;
	}

	.submit-button {
		order: 1;
	}
`

const HideBtn = styled.div`
	position: absolute;
  right: 0;
  top: 10.5rem;
  font-size: 1.6rem;
  font-weight: 600;

  &::before {
  	content: '–';
  	color: ${COLORS.RED};
  	font-size: 1.8rem;
  	margin-right: 1.5rem;
  }

  &.closed {
		&::before {
			content: '+';
		}
  }
`

const ArrowDown = styled.img`
  position: absolute;
  right: 5rem;
  bottom: 10rem;
  height: 9rem;
`

const PortfolioContentStyled = styled.article`
  position: relative;
	color: ${COLORS.BLACK};
	padding: 5rem 0;
	border-bottom: 1px solid ${COLORS.BLACK};

	&.last {
		border-bottom: none;
	}

	header {
		display: flex;
		align-items: center;
    height: 13rem;
    padding-bottom: 5rem;
		
		.logo {
			width: 25rem;
			height: 100%;
			padding: 1rem 8rem 1rem 0;
			border-right: 1px solid ${COLORS.RED};

			img {
				position: relative;
				top: 50%;
				max-height: 5.5rem;
			}
		}

		.info {
			position: relative;
			height: 100%;
			min-width: 20rem;
			padding: 1rem 5rem 1rem 2.5rem;
			border-right: 1px solid ${COLORS.LINE_GREY_20};

			.year {
				font-size: 1.6rem;
			}

			.title {
				font-size: 1.7rem;
  			font-weight: bold;
  			position: absolute;
  			bottom: 0;
  			left: 2.5rem;
			}
		}

		${TextStyled} {
			max-width: 33rem;
			padding-left: 2.5rem;
			align-self: flex-end;
		}
	}

	main {
		display: flex;
		align-items: flex-start;
		padding: 5rem 0 0 0;
		border-top: 1px dashed ${COLORS.LINE_GREY_20};
		max-height: 50rem;
		overflow: hidden;
		transition: all 1000ms ease;

		.title {
			font-size: 1.6rem;
  		font-weight: 300;
  		color: ${COLORS.BLACK_30};
  		padding-right: 12rem;
  		margin-top: 1.7rem;
		}

		.content {
			width: 65%;

			ul li:first-child {
				margin-top: 0;
			}

			a {
				color: ${COLORS.RED};
				font-weight: bold;
			}
		}
	}

	&.closed {
		main {
			max-height: 0;
			border: unset;
		}
	}
`

const PortfolioSlogan = styled.div`
	margin: 10rem 0 0 0;
	padding: 0 8rem 0 0;
	line-height: 1.13;
`

export default PortfolioContentPage