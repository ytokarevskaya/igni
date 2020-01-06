import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Scroll from "../components/scroll"
import Section from "../components/section"
import Form from "../components/form"
import ProjectCover from "../components/project-cover"

import { getURLParameter } from "../components/utils"
import { useProjectsData } from "../components/queries/get-projects-data"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import RichText from '@madebyconnor/rich-text-to-jsx'
import { BLOCKS } from "@contentful/rich-text-types"
import { COLORS, ScrollFrame, FrontLayer, ContentPart, ContentColumn, Title, TextStyled, InputFrame } from "../components/styled"

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
	debugger;

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

	const ProjectContentRow = styled.div``
	return (
	  <Layout page="project">
	    <SEO title="IGNI | Веб-студия полного цикла" />
	    <ScrollFrame>
		    <Section id={0} active={true} name="section-project" headerStyle="white" footerStyle="white">
		    	<FrontLayer bg={project.backgroundColor}>
			    	<Scroll overflowLimit={1} width="100%" pos={["absolute", "0", "0", "0", "0"]}>
			    		<CategoryTitle>
			          <Title fz="5rem" color="#fff" lineBottom lineBg="#fff">Дизайн</Title>
			          <TextStyled color="#fff" width="18rem" margin="3.5rem 0">сделайте первое впечатление клиента незабываемым</TextStyled>
		          </CategoryTitle>
			      	<ProjectCover index={0} project={project} />
			      	<ContentPart bg="transparent" padding="10rem 25%">
			      		<ProjectContent theme={project.theme}>
			      			<div dangerouslySetInnerHTML={{__html: project.description? documentToHtmlString(project.description.json, renderOptions) : ""}} />
			      			{/*<ProjectContentRow>
			      				project.descriptionBlocks?
			      					project.descriptionBlocks.map(node => {
			      						return (<div className="column"><RichText richText={node.content.json} overrides={overrides} /></div>)
			      					})
			      				: ""
			      			</ProjectContentRow>*/}
			      			<Title className="thankyou" color="#fff" width="24rem">Благодарим <br/>за внимание</Title>
			      		</ProjectContent>
			      	</ContentPart>
			      	<ContentPart bg="transparent" padding="10rem 0 10rem 25%">
			      		<MoreProjects projects={projects} />
			      	</ContentPart>
			      	<ContentPart bg="transparent" flex>
		          	<ContentColumn padding="0 6rem 0 0" width="45rem">
		          		<Title color="#fff" lineBottom lineBg="#fff">Приступим к работе над вашим проектом?</Title>
		          	</ContentColumn>
		          	<ContentColumn width="35rem">
		          		<TextStyled color="#fff">Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества. </TextStyled>
		          	</ContentColumn>
		          </ContentPart>
		          <ContentPart bg="transparent" padding="0 0 0 24rem">
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

const MoreProjects = (props) => {
	return (
		<MoreProjectsCarousel id="more-projects-carousel">
			<div className="carousel-content transition-05s">
				{props.projects.map((item, index) => {
					return (
						<MoreProjectsCarouselItem key={item.id} className={index === 0? "active transition-05s" : ""} bg={item.backgroundColor} bgImg={item.backgroundImg? item.backgroundImg.file.url : ""} bgSize={item.backgroundMode === "Contain"? item.backgroundSize : ""} theme={item.theme}>
							<a className="div_100" href={"/portfolio/" + item.category.slug + "/" + item.slug}>
								<div className="info ff-bebas">
									<div>{new Date(item.date).getFullYear()}</div>
									<div>{item.subcategory}</div>
								</div>
							</a>
							<div className="title ff-bebas">{item.projectTitle}</div>
							<div className="project-next icon-arrow-bold left" data-dir="-1" onClick={projectChange} />
							<div className="project-next icon-arrow-bold right" data-dir="1" onClick={projectChange} />
						</MoreProjectsCarouselItem>
					)
				})}
			</div>
		</MoreProjectsCarousel>
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

const MoreProjectsCarouselItem = styled.div`
	position: relative;
	height: 100%;
	width: 90rem;
	color: ${props => props.theme === "Dark"? "#fff" : COLORS.BLACK};
	background-color: ${props => props.bg || "#fff"};
	background-image: ${props => props.bgImg? "url(" + props.bgImg + ")" : "unset"};
	background-size: ${props => props.bgSize? props.bgSize : "cover"};
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
	}
`

const CategoryTitle = styled.div`
	position: absolute;
	top: 10rem;
	left: 24rem;
	z-index: 1;
`
const ProjectContentColumn = styled.div`
	display: inline-block;
	vertical-align: top;
	width: ${props => props.width || "100%"};
	padding: 3rem;
`;

const ProjectContent = styled.div`
	position: relative;
	font-size: 1.6rem;
	line-height: 1.5;
	color: ${props => props.theme === "Dark"? "#fff" : COLORS.BLACK};

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
		padding: 5rem 3rem 5rem 0;
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

export default ProjectPage