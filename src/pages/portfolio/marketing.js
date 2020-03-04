import React from "react"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Section from "../../components/section"
import RequestForm from "../../components/forms/request-form"
import CallbackForm from "../../components/forms/callback-form"

import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { useProjectsData } from "../../components/queries/get-projects-data"
import { COLORS, Title, TextStyled, FrontLayer, BackLayer, InfoBlocks, ContentPart, ContentColumn, PortfolioBackBtn } from "../../components/styled"

import bgImg from "../../images/fire_bg.jpg"
import circlesIcon from "../../images/circles.svg"
import teamIcon from "../../images/team.svg"
import baloonIcon from "../../images/air-balloon.svg"

const PortfolioMarketingPage = () => {
	const { edges } = useProjectsData();
	const projects = [];
	edges.map((item) => {
    const project = item.node;
    if (project.category.title === "Маркетинг и реклама") {
      projects.push(project);
    }
  });

	return (
		<Layout page="portfolio-marketing">
			<SEO title="IGNI | Портфолио" />
				<Section id={0} active={true} name="section-marketing" headerStyle="white" footerStyle="white" height="auto">
					<BackLayer bg={"url(" + bgImg + ")"} fixed />
					<FrontLayer>
						<ContentPart bg="transparent" padding="10rem 24rem" pos="relative" height="100vh">
							<MarketingTitle>
								<Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem">Performance маркетинг</Title>
			          <TextStyled width="18rem" margin="3.5rem 0">осветите маршрут вашего клиента</TextStyled>
		          </MarketingTitle>
			        <MarketingSlogan>
			        	<Title fz="5rem" color="#fff" lineBottom lineBg="#fff" lineWidth="3.5rem">Интернет реклама – мощнейший инструмент продвижения вашего проекта.</Title>
			        	<TextStyled margin="3.5rem 0">Работа начинается с подбора и анализа целевых аудиторий и формирования аватаров клиента. На основании собранных данных определяются ключевые посылы и форматы рекламы, а также наиболее перспективные рекламные площадки. В дальнейшем аналитика позволяет выделить самые эффективные инструменты продвижения конкретного продукта и снизить стоимость привлечения клиента.</TextStyled>
			        </MarketingSlogan>
			        <MarketingList>
			        	<div>Разработка медиаплана</div>
			        	<div>Контекстная реклама</div>
			        	<div className="is-wide">Медийная реклама и программатик-закупки</div>
			        	<div className="is-wide">Разработка стратегии мобильного продвижения</div>
			        	<div>Таргетированная реклама</div>
			        	<div>Реклама на маркетплейсах</div>
			        	<div>Реклама приложений в сторах</div>
			        	<div>Внедрение колл-трекинга</div>
			        	<div>Email-маркетинг</div>
			        </MarketingList>
		        </ContentPart>
		        <ContentPart bg="#fff" width="calc(100% - 24rem)" padding="10rem 0 10rem 24rem">
			        <Title color={COLORS.BLACK} margin="0 0 7rem 0">Статистика</Title>
			        <InfoBlocks itemsCount={5}>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">+2300 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Количество лидов</TextStyled>
			        	</div>
			        	<div className="block">
			        		<Title margin="0 0 2.5rem 0">~6 <small>%</small></Title>
			        		<TextStyled color={COLORS.BLACK}>Конверсия в действие</TextStyled>
			        	</div>
			        	<div className="block">
			        		<img className="icon" alt="" src={circlesIcon} />
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
		        <ContentPart bg="#fff" width="calc(100% - 24rem)" padding="10rem 0 10rem 0">
			        <Title color={COLORS.BLACK} margin="0 0 0 24rem">Портфолио</Title>
			        {projects.map((item, index) => {
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
            <ContentPart bg="transparent" padding="10rem 24rem 7rem 24rem" flex id="scrollTo-contacts">
	          	<ContentColumn width="50rem" padding="0 10rem 0 0">
	          		<Title color="#fff" lineBottom lineBg="#fff">Приступим к работе над вашим проектом?</Title>
	          	</ContentColumn>
	          	<ContentColumn width="40rem">
	          		<TextStyled color="#fff">Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества. </TextStyled>
	          	</ContentColumn>
	          </ContentPart>
            <ContentPartRequestForm bg="transparent" padding="0 0 0 24rem">
	          	<RequestForm inputStyle="horizontal icon-square" pos={["relative", "", "", "", ""]} />
	          </ContentPartRequestForm>
	          <a href="/"><PortfolioBackBtn className="translate-y" transparent /></a>
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
			  			<img className="translate-y" alt="" src={this.props.project.logo.file.url} />
			  		</div>
		  			: ""}
		  		<div className="info">
		  			<div className="year ff-bebas">{new Date(this.props.project.date).getFullYear()}</div>
		  			<div className={"title" + (this.props.type === "all"? " tt-uppercase" : "")}>{this.props.project.projectTitle}</div>
		  		</div>
		  		<TextStyled color={COLORS.BLACK} className="subtitle">
		  			{this.props.project.projectSubtitle}
		  		</TextStyled>
		  		<TextStyled color={COLORS.BLACK} className="city">
		  			{this.props.project.city}
		  		</TextStyled>
		  	</header>
		  	{this.props.project.description?
		  		<React.Fragment>
				  	<main>
				  		<div className="content">
				  			<div className="number">
				  				<Title>{this.props.project.clicksPerMonth}</Title>
				  				<p>Кликов в месяц</p>
				  			</div>
				  			<div className="number">
				  				<Title>{this.props.project.clickPrice}</Title>
				  				<p>Средняя цена клика, руб.</p>
				  			</div>
				  			<div className="number">
				  				<Title>{this.props.project.conversion} <small>%</small></Title>
				  				<p>Конверсия в действие</p>
				  			</div>
				  			<div className="description">
				  				<div className="description-title">Перечень работ:</div>
				  				<TextStyled color={COLORS.BLACK} dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.project.description.json)}} />
				  			</div>
				  			<div className="result">
				  				<div className="result-title">Результат</div>
				  				<TextStyled color="#fff" dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.project.result.json)}} />
				  			</div>
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
  right: 5rem;
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

const PortfolioContentStyled = styled.article`
  position: relative;
	color: ${COLORS.BLACK};
	padding: 5rem 0 0 24rem;
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

		.subtitle {
			max-width: 33rem;
			padding: 0 2.5rem;
		}

		.city {
			max-width: 23rem;
			padding: 0 2.5rem 0 5rem;
		}
	}

	main {
		display: flex;
		align-items: flex-start;
		border-top: 1px solid ${COLORS.LINE_GREY_20};
		max-height: 50rem;
		overflow: hidden;
		transition: all 800ms ease-in-out;

		.title {
			font-size: 1.6rem;
  		font-weight: 300;
  		color: ${COLORS.BLACK_30};
  		padding-right: 12rem;
  		margin-top: 1.7rem;
		}

		.content {
			display: flex;

			a {
				color: ${COLORS.RED};
				font-weight: bold;
			}

			.number {
				width: 25rem;
				padding: 5rem;
				border-right: 1px solid ${COLORS.LINE_GREY_20};

				&:first-child {
					padding-left: 0;
				}

				p {
					color: ${COLORS.BLACK};
					font-size: 1.6rem;
				}
			}

			.description {
				padding: 5rem;
				flex-grow: 1;

				.description-title {
					color: ${COLORS.BLACK_30};
					margin-bottom: 5rem;
					font-size: 1.6rem;
				}
			}

			.result {
				padding: 5rem;
				background: ${COLORS.RED};
				width: 50rem;

				.result-title {
					color: #fff;
					margin-bottom: 5rem;
					font-size: 1.6rem;
				}
			}
		}
	}

	&.closed {
		main {
			max-height: 0;
			border: unset;
			padding: 0;
		}
	}
`

const MarketingList = styled.div`
	position: absolute;
	right: 24rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	width: 43rem;
	flex-wrap: wrap;

	div {
		width: 50%;
		text-align: center;
		font-family: "Bebas", sans-serif;
		font-size: 1.6rem;
		color: #fff;
		text-transform: uppercase;
		background: ${COLORS.WHITE_10};
		border: 1px solid #fff;
		padding: 2rem 0;

		&.is-wide {
			width: 100%;
		}
	}
`

const MarketingTitle = styled.div`
	position: absolute;
	top: 50%;
	left: 24rem;
	transform: translateY(-50%);
`

const MarketingSlogan = styled.div`
	width: 48rem;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`

export default PortfolioMarketingPage