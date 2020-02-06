import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Scroll from "../components/scroll"
import Section from "../components/section"
import RequestForm from "../components/forms/request-form"
import ProjectCover from "../components/project-cover"

import { getURLParameter } from "../components/utils"
import { useProjectsData } from "../components/queries/get-projects-data"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { COLORS, FrontLayer, ContentPart, ContentColumn, Title, TextStyled, PortfolioBackBtn } from "../components/styled"

export const query = graphql`
  query($id: String!) {
    contentfulProject(id: { eq: $id }) {
      backgroundColor
      backgroundImg {
        file {
          url
        }
      }
      backgroundMode
      backgroundSize
      date
      description {
        json
      }
      descriptionBlocks {
        title
        width
        content {
          json
        }
      }
      id
      logo {
        file {
          url
        }
      }
      preview {
        file {
          url
        }
      }
      projectSubtitle
      projectTitle
      slug
      subcategory
      category {
      	slug
        title
      }
      theme
    }
  }
`

const projects = [];

const ProjectPage = ({ data }) => {
	const project = data.contentfulProject;
	const { edges } = useProjectsData();

	edges.map(item => {
	  const node = item.node;
	  if (node.id !== project.id && node.category.slug === project.category.slug && projects.length <= 5) {
	    projects.push(node);
	  }
	});

	console.log(projects);

	const renderOptions = {
	  renderNode: {
	    [BLOCKS.EMBEDDED_ASSET]: node => {
	    	if (!node.data.target.fields) return;
        return `<img src="${node.data.target.fields.file["en-US"].url}" alt="" />`
      },
	  }
	};

	const Image = ({ file, title, className }) => (
	  <img src={file.url} alt={title} />
	);

	const overrides = {
	  [BLOCKS.EMBEDDED_ENTRY]: {
	    image: {
	      component: Image
	    }
	  }
	};

	return (
	  <Layout page="project">
	    <SEO title="IGNI | Веб-студия полного цикла" />
		    <Section id={0} active={true} name="section-project" headerStyle="white" footerStyle="white" height="auto">
		    	<FrontLayer bg={project.backgroundColor}>
		    		{/*<CategoryTitle>
		          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff" lineWidth="3.5rem">Дизайн</Title>
		          <TextStyled color="#fff" width="18rem" margin="3.5rem 0">Сделайте первое впечатление клиента незабываемым</TextStyled>
	          </CategoryTitle>*/}
		      	<ProjectCover index={0} project={project} />
		      	<a href={"/portfolio/design/?active=" + project.slug}><PortfolioBackBtn className="icon-arrow-bold translate-y" /></a>
		      	<ContentPart bg="transparent" padding="10rem 20%">
		      		<ProjectContent color={project.theme}>
		      			<div dangerouslySetInnerHTML={{__html: project.description? documentToHtmlString(project.description.json, renderOptions) : ""}} />
		      			{/*<ProjectContentRow>
		      				project.descriptionBlocks?
		      					project.descriptionBlocks.map(node => {
		      						return (<div className="column"><RichText richText={node.content.json} overrides={overrides} /></div>)
		      					})
		      				: ""
		      			</ProjectContentRow>*/}
		      			{project.slug === "xena-exchange"?
		      			<React.Fragment>
		      				<ProjectContentRow align="center" justify="flex-end">
		      					<ProjectContentColumn width="45%" padding="0">
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/6xAJbEHwXedLxNjOxHZFOJ/d0f9e15824e6213e355442fcbe1398e8/02_-_iPhone_XS_Front.png" alt="" />
		      					</ProjectContentColumn>
		      					<ProjectContentColumn width="35%">
		      						<h2>О проекте</h2>
		      						<p>Xena Exchange – высокотехнологичная платформа для торговли криптовалютными активами, которой требовался стильный и лаконичный дизайн.</p>
		      						<p>В рамках сотрудничества с Xena Exchange мы успешно провели редизайн основного сайта, личного кабинета и терминала биржи, оформили корпоративный блог и социальные сети, а также запустили несколько промо-кампаний.</p>
		      					</ProjectContentColumn>
		      				</ProjectContentRow>
		      				<ProjectContentRow>
		      					<ProjectContentColumn width="50%">
		      						<h2>Главная страница</h2>
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/15pRkSED7qgChKY2YJr0Ww/ce01470fdd3c8edf36306ed06bf2af0e/B_2.png" alt="" />
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/3rLBe0b0bZ329tQIfLkb9c/0cfa9a2d5bcae7685e2ca9043fff316c/B_2_Copy_2.png" alt="" />
		      					</ProjectContentColumn>
		      					<ProjectContentColumn width="50%">
		      						<div className="h5rem" />
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/6oQrVMh7rjfCdNmwbSwg4g/5384a0152384e92da9fa3da485c8365b/B_2_Copy.png" alt="" />
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/WVikWAizoFcZcflRrYq6H/803fd5b284977ea6b15fe2c53ac0bdad/B_2_Copy_3.png" alt="" />
		      					</ProjectContentColumn>
		      				</ProjectContentRow>
		      				<ProjectContentRow align="center">
		      					<ProjectContentColumn width="60%">
		      						<h2>Обзор котировок</h2>
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/162UWLduPxFeWPjBH6mybM/c10bd2b046408655263a744f2686f7fa/B_2_Copy_4.png" alt="" />
		      					</ProjectContentColumn>
		      					<ProjectContentColumn width="40%">
		      						<img src="https://images.ctfassets.net/iqzj3v996p76/1j8d4dbvgtGLGPjdhx42IU/eed05f80bf79f4e967fa08839ad5b50c/01_-_iPhone_XS_Front.png" alt="" />
		      					</ProjectContentColumn>
		      				</ProjectContentRow>
		      			</React.Fragment>
		      			: ""}
		      			<Title className="thankyou" color="#fff" width="24rem">Благодарим <br/>за внимание</Title>
		      		</ProjectContent>
		      	</ContentPart>
		      	<ContentPart bg="transparent" padding="10rem 0 10rem 25%">
		      		<MoreProjectsCarousel id="more-projects-carousel">
								<div className="carousel-content">
									{projects.map(function(item, index) {
										const projectItem = projects[index];
										return (
											<MoreProjectsCarouselProject className={index === 0? "active transition-05s" : ""} bgColor={projectItem.backgroundColor} bgImg={projectItem.backgroundImg? projectItem.backgroundImg.file.url : ""} bgSize={projectItem.backgroundMode === "Contain"? projectItem.backgroundSize : ""}>
												<a className="div_100" href={"/portfolio/" + projectItem.category.slug + "/" + projectItem.slug}>
													<div className="info ff-bebas">
														<div>{new Date(projectItem.date).getFullYear()}</div>
														<div>{projectItem.subcategory}</div>
													</div>
												</a>
												<div className="title ff-bebas">{projectItem.projectTitle}</div>
												<div className="project-next icon-arrow-bold left" data-dir="-1" onClick={projectChange} />
												<div className="project-next icon-arrow-bold right" data-dir="1" onClick={projectChange} />
											</MoreProjectsCarouselProject>
										)
									})}
								</div>
							</MoreProjectsCarousel>
		      	</ContentPart>
		      	<ContentPart bg="transparent" flex>
	          	<ContentColumn padding="0 6rem 0 0" width="45rem">
	          		<Title color="#fff" lineBottom lineBg="#fff" lineWidth="3.5rem">Приступим к работе над вашим проектом?</Title>
	          	</ContentColumn>
	          	<ContentColumn width="35rem">
	          		<TextStyled color="#fff">Заполните бриф: расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для обсуждения дальнейшего сотрудничества.</TextStyled>
	          	</ContentColumn>
	          </ContentPart>
	          <ContentPartRequestForm bg="transparent" padding="0 0 0 24rem">
	          	<RequestForm inputStyle="horizontal icon-square" pos={["relative", "", "", "", ""]} buttonLabel="Отправить" />
	          </ContentPartRequestForm>
		      </FrontLayer>
	      </Section>
	  </Layout>
	)
}

function projectChange(e) {
	const frame = document.getElementById("more-projects-carousel").children[0];
	const target = e.currentTarget;
	const dir = +target.dataset.dir;
	const curProject = frame.querySelector(".active");
	let nextProject;
	if (dir === 1) {
		nextProject = curProject.nextElementSibling;
	} else {
		nextProject = curProject.previousElementSibling;
	}
	if (nextProject) {
		curProject.classList.remove("active");
		nextProject.classList.add("active");
		frame.style.transform = "translateX(-" + nextProject.offsetLeft + "px)";
	}
}

const MoreProjectsCarouselProject = styled.div`
	position: relative;
	height: 100%;
	width: 90rem;
	color: #fff;
	background-color: ${props => props.bgColor || COLORS.BLACK};
	background-image: ${props => props.bgImg? ("url(" + props.bgImg + ")") : "unset"};
	background-size: ${props => props.bgSize || "cover"};
	background-repeat: no-repeat;
	background-position: center center;
	flex-shrink: 0;
	margin-right: 10rem;
	box-shadow: 3px 5px 19px -8px rgba(0, 0, 0, 0.35);

	&.active {
		.title {
			font-weight: bold;
		}
	}

	&:first-child {
		.project-next.left {
			display: none;
		}
	}

	&:last-child {
		.project-next.right {
			display: none;
		}
	}

	.title {
		font-size: 5rem;
  	font-weight: 100;
  	text-transform: uppercase;
  	position: absolute;
  	bottom: -10rem;
  	left: 0;
	}

	.info {
		font-size: 1.8rem;
		position: absolute;
		left: 3.5rem;
		top: 3.5rem;
		bottom: 3.5rem;
		width: 20rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.project-next {
		position: absolute;
		top: 50%;
		font-size: 2.2rem;
		z-index: 1;

		&.left {
			left: 3.5rem;
			transform: translateY(-50%);
		}
		&.right {
			transform: rotate(180deg) translateY(50%);
			right: 3.5rem;
		}
	}
`

const MoreProjectsCarousel = styled.div`
	position: relative;
	height: 60rem;
  padding-bottom: 10rem;
	width: 100%;
	overflow: hidden;

	.carousel-content {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		transition: all 1000ms ease;
	}
`

const CategoryTitle = styled.div`
	position: absolute;
	top: 10rem;
	left: 24rem;
	z-index: 1;
`

const ProjectContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: ${props => props.align || "top"};
	justify-content: ${props => props.justify || "space-between"};
`

const ProjectContentColumn = styled.div`
	flex-grow: 0;
	width: ${props => props.width || "100%"};
	padding: ${props => props.padding || "3rem"};
`

const ProjectContent = styled.div`
	position: relative;
	font-size: 1.6rem;
	line-height: 1.5;
	color: ${props => props.color === "Dark"? "#fff" : COLORS.BLACK};

	h1, h2, h3, h4, h5, h6 {
		font-family: "Bebas", sans-serif;
		font-weight: bold;
		text-transform: uppercase;
	}

	h1, h2 {
		font-size: 5rem;
	}

	h5 {
		font-size: 1.9rem;
	}

	h6 {
		font-size: 1.9rem;
		display: inline-block;
		padding: 7rem 3rem 7rem 0;
		width: 35%;
		vertical-align: top;
	}

	h6 + p {
		display: inline-block;
		padding: 5rem 3rem;
		width: 50%;
		vertical-align: top;
	}

	.thankyou {
		position: absolute;
		left: 100%;
		bottom: 0;
		margin-left: 3rem;
	}

	.column {
		display: inline-block;
		vertical-align: top;
		padding: 3rem;
	}

	img {
		margin: 1.8rem 0;
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

export default ProjectPage