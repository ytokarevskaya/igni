import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Section from "../section"
import { wordEnd } from "../utils"

import { useProjectsData } from "../queries/get-projects-data"
import Scroll from "../scroll"
import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, SectionScroll } from "../styled"


const SectionPortfolio = (props) => {
  const { totalCount, edges } = useProjectsData()
  const projects = {
    'design': [],
    'content': [],
    'marketing': [],
    'digital': []
  }
  edges.map((item) => {
    const project = item.node;
    if (project.category.title === 'Дизайн') {
      projects.design.push(project);
    } else if (project.category.title === 'Контент') {
      projects.content.push(project);
    } else if (project.category.title === 'Маркетинг и реклама') {
      projects.marketing.push(project);
    } else if (project.category.title === 'Диджитал продакшн') {
      projects.digital.push(project);
    }
  });

  return (
  	<Section id={props.id} active={props.active} name="section-portfolio" headerStyle="dark" footerStyle="dark">
      <FrontLayer bg="#f6f7f9">
        <PortfolioTitle className="load-ani unload-ani" data-loaddelay={0} data-unloaddelay={0}>
          <Title fz="5rem" lineBottom lineBg={COLORS.BLACK}>Портфолио <span className="black">IGNI</span></Title>
        </PortfolioTitle>
        <Scroll width="60%" overflowLimit="1.5" pos={["absolute", "40%", "5%", "", ""]} menuItems={["Дизайн", "Контент", "Маркетинг и реклама", "Диджитал продакшн"]}>
          <PortfolioItem className="load-ani unload-ani" data-loaddelay={0} data-unloaddelay={400}>
            <div className="header">
              <Title color={COLORS.BLACK}>Дизайн</Title>
              <Link className="all-projects" to="/portfolio/design">
                <span>Все проекты</span>
              </Link>
            </div>
            <p className="count">{projects.design.length} {'проект' + wordEnd(projects.design.length, 'pr')}</p>
            <PortfolioWorks>
              {projects.design.map((item, index) => {
                if (index < 3) {
                  return (
                    <FormattedPortfolioWork index={index} project={item} type="design" />
                  )
                }
              })}
            </PortfolioWorks>
          </PortfolioItem>
          <PortfolioItem className="load-ani unload-ani" data-loaddelay={0} data-unloaddelay={400}>
            <div className="header">
              <Title color={COLORS.BLACK}>Контент</Title>
              <Link className="all-projects" to="/portfolio/content">
                <span>Все проекты</span>
              </Link>
            </div>
            <p className="count">{projects.content.length} {'проект' + wordEnd(projects.content.length, 'pr')}</p>
            <PortfolioWorks>
              {projects.content.map((item, index) => {
                if (index < 3) {
                  return (
                    <FormattedPortfolioWork index={index} project={item} type="content" />
                  )
                }
              })}
            </PortfolioWorks>
          </PortfolioItem>
          <PortfolioItem className="load-ani unload-ani" data-loaddelay={0} data-unloaddelay={400}>
            <div className="header">
              <Title color={COLORS.BLACK}>Маркетинг и реклама</Title>
              <Link className="all-projects" to="/portfolio/marketing">
                <span>Все проекты</span>
              </Link>
            </div>
            <p className="count">{projects.marketing.length} {'проект' + wordEnd(projects.marketing.length, 'pr')}</p>
            <PortfolioWorks>
              {projects.marketing.map((item, index) => {
                if (index < 3) {
                  return (
                    <FormattedPortfolioWork index={index} project={item} type="marketing" />
                  )
                }
              })}
            </PortfolioWorks>
          </PortfolioItem>
          <PortfolioItem className="load-ani unload-ani" data-loaddelay={0} data-unloaddelay={400}>
            <div className="header">
              <Title color={COLORS.BLACK}>Диджитал продакшн</Title>
              <Link className="all-projects" to="/portfolio/digital">
                <span>Все проекты</span>
              </Link>
            </div>
            <p className="count">{projects.digital.length} {'проект' + wordEnd(projects.digital.length, 'pr')}</p>
            <PortfolioWorks>
              {projects.digital.map((item, index) => {
                if (index < 3) {
                  return (
                    <FormattedPortfolioWork index={index} project={item} type="digital" />
                  )
                }
              })}
            </PortfolioWorks>
          </PortfolioItem>
        </Scroll>
      </FrontLayer>
    </Section>
  )
}

const FormattedPortfolioWork = (props) => {
  let logo;
  if (props.type === "content" || props.type === "marketing") {
    logo = props.project.logo? <img className="logo is-big is-on-top" src={props.project.logo.file.url} /> : '';
  } else {
    logo = props.project.logo? <img className="logo" src={props.project.logo.file.url} /> : '';
  }
  return (
    <PortfolioWork href={"/portfolio/" + props.project.category.slug + "/" + props.project.slug} key={props.project.id} bg={props.project.backgroundColor} bgImg={props.project.preview? props.project.preview.file.url : ''} className={"transition-03s load-ani unload-ani" + (props.project.theme? " theme-" + props.project.theme : " theme-Dark")} data-loaddelay={props.index * 200 + 800} data-unloaddelay={props.index * 200 + 800}>
      <div className="ff-bebas info"><span className="year">{new Date(props.project.date).getFullYear()}</span> {props.project.subcategory}</div>
      {logo}
      <div className="title">{props.project.projectTitle}{(props.type === "digital"? <span className="time"> 1 : 15</span> : '')}</div>
      <div className="description" dangerouslySetInnerHTML={{__html: props.project.projectSubtitle}} /> 
    </PortfolioWork>
  )
}

const PortfolioWork = styled.a`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  width: 32%;
  height: 55rem;
  padding: 3rem;
  background-color: ${props => props.bg || "#fff"};
  background-image: ${props => "url(" + props.bgImg + ")" || "unset"};
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  cursor: pointer;
  box-shadow: 0 4px 10px -5px rgba(55, 59, 68, 0.26);
  transition-delay: 0ms!important;

  &.theme-Light {
    color: ${COLORS.BLACK};
    .description {
      hr {
        background: ${COLORS.LINE_GREY};
      }
    }
  }
  &.theme-Dark {
    color: #fff;
  }
  &.load-ani, &.unload-ani.unloaded {
    transform: translateY(-3rem);
  }
  &.load-ani.loaded {
    transform: translateY(0);
  }
  &:hover {
    transform: translateY(-1rem)!important;
  }

  .logo {
    display: block;
    max-height: 5rem;
    max-width: 5rem;
    margin-bottom: 2rem;
    &.is-big {
      max-width: 50%;
    }
    &.is-on-top {
      position: absolute;
      left: 3rem;
      top: 7rem;
    }
  }

  .title {
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 1.5rem;

    .time {
      float: right;
    }
  }

  .description {
    font-size: 1.6rem;
    line-height: 1.5;

    hr {
      background: #fff;
      margin: 2rem 0;
    }
  }

  .info {
    position: absolute;
    top: 3rem;
    left: 3rem;
    text-transform: uppercase;
    font-size: 1.5rem;

    .year {
      margin-right: 2rem;
    }
  }
`

const PortfolioWorks = styled.div`
  display: flex;
  margin: 3rem 0;
  justify-content: space-between;
`

const PortfolioItem = styled.div`
  margin-bottom: 6rem;

  .all-projects {
    display: flex;
    flex-grow: 1;
    border-bottom: 1px solid ${COLORS.LINE_GREY};
    margin: 0 0 0.8rem 3rem;
    align-items: flex-end;
    padding-right: 30vw;
    justify-content: flex-end;

    span {
      position: relative;
      color: ${COLORS.BLACK};
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0 3rem 0 10rem;
      margin-bottom: -0.5em;
      background: ${COLORS.BG_GREY};
      cursor: pointer;
      &::before {
        content: '+';
        display: block;
        width: 4.6rem;
        height: 4.6rem;
        border-radius: 50%;
        background: ${COLORS.RED};
        color: #fff;
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 4.6rem;
        text-align: center;
        position: absolute;
        left: 3rem;
        top: 50%;
        margin-top: -2.3rem;
      }
    }
  }

  .header {
    display: flex;
    width: calc(100% + 30vw);
  }

  .count {
    font-size: 1.6rem;
    color: ${COLORS.BLACK};
  }
`
const PortfolioTitle = styled.div`
  position: absolute;
  left: 24rem;
  top: 10rem;
  z-index: 1;

  ${Title} {
    position: relative;
  }
`

export default SectionPortfolio