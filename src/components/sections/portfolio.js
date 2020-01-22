import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Plx from "react-plx"

import Section from "../section"
import Scroll from "../scroll"

import { useProjectsData } from "../queries/get-projects-data"
import { applyStyles } from "../scroll-controller"
import { wordEnd } from "../utils"
import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, SectionScroll } from "../styled"

import mountainImg from "../../images/mountain.jpg"

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

  const parallaxData_title = [
    {
      start: typeof window === "undefined" ? 0 : window.innerHeight * 1,
      end: typeof window === "undefined" ? 0 : window.innerHeight * 2,
      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: "opacity"
        }
      ]
    }
  ]

  const parallaxData_cards = [
    {
      start: typeof window === "undefined" ? 0 : window.innerHeight * 0.8,
      end: typeof window === "undefined" ? 0 : window.innerHeight * 2.1,
      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: "opacity"
        },
        {
          startValue: 50,
          endValue: 0,
          property: "translateY",
          unit: "vh"
        }
      ]
    },
    {
      start: typeof window === "undefined" ? 0 : window.innerHeight * 2.1,
      end: typeof window === "undefined" ? 0 : window.innerHeight * 2.6,
      properties: [
        {
          startValue: 1,
          endValue: 0.5,
          property: "opacity"
        },
        {
          startValue: 0,
          endValue: -30,
          property: "translateY",
          unit: "vh"
        }
      ]
    }
  ]

  return (
  	<Section id={props.id} active={props.active} name="section-portfolio" headerStyle="white" footerStyle="white">
      <FrontLayer>
        <Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true}>
          <h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "12rem", "", "", "20rem"]} className="scrollController-title">Нашe портфолио</Title></h2>
          <PortfolioCarouselMenu id="portfolio-carousel-menu" items={["Дизайн", "Контент", "Маркетинг и реклама", "Диджитал продакшн"]} />
        </Plx>
        <Plx className="parallax-element" parallaxData={parallaxData_cards} animateWhenNotInViewport={true}>
          <PortfolioCarousel id="portfolio-carousel" className="transition-05s scrollController-carousel">
            <div className="carousel-content">
              <PortfolioItem className="load-ani unload-ani carousel-item active" data-loaddelay={0} data-unloaddelay={400}>
                <div className="header">
                  <p className="count transition-05s"><strong className="ff-bebas">{projects.design.length}</strong> {'проект' + wordEnd(projects.design.length, 'pr')}</p>
                  <h3><Title color="#fff">Дизайн</Title></h3>
                  <a className="all-projects" href="/portfolio/design"><span>Перейти</span></a>
                </div>
                <div className="image" />
              </PortfolioItem>
              <PortfolioItem className="load-ani unload-ani carousel-item" data-loaddelay={0} data-unloaddelay={400}>
                <div className="header">
                  <p className="count transition-05s"><strong className="ff-bebas">{projects.content.length}</strong> {'проект' + wordEnd(projects.content.length, 'pr')}</p>
                  <h3><Title color="#fff">Контент</Title></h3>
                  <a className="all-projects" href="/portfolio/design"><span>Перейти</span></a>
                </div>
                <div className="image" />
              </PortfolioItem>
              <PortfolioItem className="load-ani unload-ani carousel-item" data-loaddelay={0} data-unloaddelay={400}>
                <div className="header">
                  <p className="count transition-05s"><strong className="ff-bebas">{projects.marketing.length}</strong> {'проект' + wordEnd(projects.marketing.length, 'pr')}</p>
                  <h3><Title color="#fff">Маркетинг и реклама</Title></h3>
                  <a className="all-projects" href="/portfolio/design"><span>Перейти</span></a>
                </div>
                <div className="image" />
              </PortfolioItem>
              <PortfolioItem className="load-ani unload-ani carousel-item" data-loaddelay={0} data-unloaddelay={400}>
                <div className="header">
                  <p className="count transition-05s"><strong className="ff-bebas">{projects.digital.length}</strong> {'проект' + wordEnd(projects.digital.length, 'pr')}</p>
                  <h3><Title color="#fff">Диджитал продакшн</Title></h3>
                  <a className="all-projects" href="/portfolio/design"><span>Перейти</span></a>
                </div>
                <div className="image" />
              </PortfolioItem>
            </div>
          </PortfolioCarousel>
        </Plx>
      </FrontLayer>
    </Section>
  )
}

const PortfolioCarouselMenu = (props) => (
  <PortfolioCarouselMenuStyled className="scrollController-menu">
    {props.items.map((item, index) => {
      return (
        <div className={"item" + (index === 0? " active" : "")} data-index={index} onClick={carouselItemClick}>{item}</div>
      )
    })}
    <div onClick={carouselArrowClick} className="arrow arrow-prev icon-prev" />
    <div onClick={carouselArrowClick} className="arrow arrow-next icon-next" />
  </PortfolioCarouselMenuStyled>
)

function carouselArrowClick(e) {
  const arrow = e.target;
  const menuFrame = arrow.parentElement;
  const curItem = menuFrame.querySelector(".active");
  const dir = (arrow.classList.contains("arrow-prev")? -1 : 1);
  let nextItem;
  if (dir === 1) {
    nextItem = curItem.nextElementSibling;
  } else if (dir === -1) {
    nextItem = curItem.previousElementSibling;
  }
  if (nextItem && !nextItem.classList.contains("arrow")) {
    curItem.classList.remove("active");
    nextItem.classList.add("active");
    moveCarousel(+nextItem.dataset.index);
  }
}

function carouselItemClick(e) {
  const target = e.target;
  const menuFrame = target.parentElement;
  menuFrame.querySelector(".active").classList.remove("active");
  target.classList.add("active");
  moveCarousel(+target.dataset.index);
}

function moveCarousel(index) {
  const carousel = document.getElementById("portfolio-carousel");
  const carouselContent = carousel.querySelector(".carousel-content");
  const curItem = carousel.querySelector(".active");
  const nextItem = carousel.querySelectorAll(".carousel-item")[index];
  carouselContent.style.transform = "translateX(-" + nextItem.offsetLeft + "px)";
  curItem.classList.remove("active");
  nextItem.classList.add("active");
}

const PortfolioCarouselMenuStyled = styled.aside`
  position: absolute;
  top: 12rem;
  left: 40%;
  display: flex;
  align-items: flex-end;

  .item {
    font-size: 1.6rem;
    font-weight: 500;
    margin-right: 4.5rem;
    padding-bottom: 1.6rem;
    &.active {
      border-bottom: 1px solid #fff;
    }
  }

  .arrow {
    position: relative;
    margin: 0 1.2rem;
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
    background: ${COLORS.WHITE_20};
    &::before {
      font-size: 1.1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -0.5em;
    }
  }
`

const PortfolioCarousel = styled.div`
  position: absolute;
  left: 15rem;
  right: 0;
  top: 20rem;
  padding-left: 5rem;
  white-space: nowrap;
  overflow: hidden;

  .carousel-content {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    transition: transform 1000ms ease;
  }
`

const PortfolioItem = styled.div`
  display: inline-block;
  vertical-align: bottom;
  margin-right: 10vw;
  position: relative;
  padding-top: 30rem;

  .all-projects {
    padding-bottom: 1.4rem;
    span {
      position: relative;
      color: #fff;
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0 3rem 0 10rem;
      margin-bottom: -0.5em;
      cursor: pointer;
      &::before {
        content: '+';
        display: block;
        width: 4.6rem;
        height: 4.6rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 4.6rem;
        text-align: center;
        position: absolute;
        left: 3rem;
        top: 50%;
        margin-top: -2.3rem;
        transition: all 500ms ease;
      }
    }
    &:hover {
      span::before {
        background: ${COLORS.RED};
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    width: 100%;

    ${Title} {
      font-size: 5rem;
      transition: font-size 1000ms ease;
    }
  }

  .count {
    font-size: 1.6rem;
    color: #fff;
    text-transform: uppercase;
    opacity: 0;
    width: 100%;

    strong {
      font-size: 3.5rem;
      margin-right: 1rem;
    }
  }

  .image {
    width: 65vw;
    height: 30vw;
    margin: 0 0 0 -3rem;
    background-image: url(${mountainImg});
    background-size: cover;
    background-position: center center;
  }

  &.active {
    .header {
      ${Title} {
        font-size: 15rem;
      }
    }

    .count {
      opacity: 1;
    }
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