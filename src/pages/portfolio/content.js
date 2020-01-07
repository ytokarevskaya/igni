import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import Scroll from "../../components/scroll"
import RequestForm from "../../components/forms/request-form"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { ScrollFrame, SectionScroll, COLORS, Title, TextStyled, FrontLayer, InfoBlocks, ContentPart } from "../../components/styled"

import teamIcon from "../../images/team.svg"
import baloonIcon from "../../images/air-balloon.svg"
import arrowDown from "../../images/arrow-down-black.png"

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
		<Layout page="portfolio-content">
			<SEO title="IGNI | Портфолио" />
			<ScrollFrame>
				<Section id={0} active={true} name="section-portfolio" headerStyle="dark" footerStyle="dark">
					<FrontLayer bg="#f6f7f9">
						<Scroll overflowLimit={1} width="auto" pos={["absolute", "10rem", "0", "0", "24rem"]}>
		          <Title fz="5rem" color={COLORS.RED} lineBottom lineBg={COLORS.BLACK}>Контент-маркетинг</Title>
		          <TextStyled color={COLORS.BLACK} width="18rem" margin="3.5rem 0">Позвольте клиенту найти то, что он ищет</TextStyled>
			        <PortfolioSlogan>
			        	<Title fz="8rem" outline color="#fff"><span className="black no-outline">Посетитель</span> попадает на ваш сайт <span className="black no-outline">в поисках</span> конкретного <span className="black no-outline">решения.</span> Емкие <span className="black no-outline">заголовки и</span> интересное <span className="black no-outline">наполнение</span> с учетом SEO <span className="red no-outline">определяют полезность</span> вашего <span className="red no-outline">предложения</span>, а новые источники трафика, например, корпоративный блог, <span className="black no-outline">привлекают новых лидов.</span></Title>
			        </PortfolioSlogan>
			        <ArrowDown src={arrowDown} className="translate-y" />
			        <Title color={COLORS.BLACK} margin="7rem 0">Статистика</Title>
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
			        <Title color={COLORS.BLACK} margin="7rem 0">Портфолио</Title>
			        {projects.map((item, index) => {
                return (
                  <PortfolioContent key={item.id} project={item} type="all" last={index + 1 === projects.length} />
                )
              })}
              <Title fz="5rem" color={COLORS.BLACK} lineBottom lineBg={COLORS.BLACK}>Ведение личного <br/>блога</Title>
              {projectsBlog.map((item, index) => {
                return (
                  <PortfolioContent key={item.id} project={item} type="blog" last={index + 1 === projectsBlog.length} />
                )
              })}
              <ContentPart padding="0 0 8rem 24rem">
		          	<RequestForm />
		          </ContentPart>
		        </Scroll>
					</FrontLayer>
				</Section>
			</ScrollFrame>
		</Layout>
	)
}

const PortfolioContent = (props) => (
	<PortfolioContentStyled className={props.type === "all" && props.last? "last" : ""}>
  	<header>
  		{props.project.logo?
	  		<div className="logo">
	  			<img className="translate-y" src={props.project.logo.file.url} />
	  		</div>
  			: ""}
  		<div className="info">
  			<div className="year ff-bebas">{new Date(props.project.date).getFullYear()}</div>
  			<div className={"title" + (props.type === "all"? " tt-uppercase" : "")}>{props.project.projectTitle}</div>
  		</div>
  		<TextStyled color={COLORS.BLACK}>
  			{props.project.projectSubtitle}
  		</TextStyled>
  	</header>
  	{props.project.description?
	  	<main>
	  		<div className="title">Перечень работ:</div>
	  		<div className="content">
	  			<TextStyled color={COLORS.BLACK} className="is-ul-red is-in-two-columns" dangerouslySetInnerHTML={{__html: documentToHtmlString(props.project.description.json)}} />
	  		</div>
	  	</main>
	  	: ""}
  </PortfolioContentStyled>
)

const ArrowDown = styled.img`
	position: absolute;
	left: 0;
	top: 70%;
	height: 9rem;
`

const PortfolioContentStyled = styled.article`
	color: ${COLORS.BLACK};
	padding: 10rem 0;
	border-bottom: 1px solid ${COLORS.LINE_GREY_20};

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
		padding: 5rem 0 0 0;
		border-top: 1px dashed ${COLORS.LINE_GREY_20};

		.title {
			font-size: 1.6rem;
  		font-weight: 300;
  		color: ${COLORS.BLACK_30};
  		padding-right: 12rem;
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
`

const PortfolioSlogan = styled.div`
	margin: 20rem 0 10rem 0;
	padding: 0 33rem;
	line-height: 1.13;
`

export default PortfolioContentPage