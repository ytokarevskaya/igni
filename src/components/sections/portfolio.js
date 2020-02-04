import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Plx from "react-plx"
import Slider from "react-slick"

import Section from "../section"
import Scroll from "../scroll"

import { useProjectsData } from "../queries/get-projects-data"
import { applyStyles } from "../scroll-controller"
import { wordEnd } from "../utils"
import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, SectionScroll } from "../styled"

import mountainImg from "../../images/mountain.jpg"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


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

const parallaxData_images = [
  {
    start: typeof window === "undefined" ? 0 : window.innerHeight * 2,
    end: typeof window === "undefined" ? 0 : window.innerHeight * 2.4,
    properties: [
      {
        startValue: 30,
        endValue: 0,
        property: "height",
        unit: "vw"
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
  // {
  //   start: typeof window === "undefined" ? 0 : window.innerHeight * 2.1,
  //   end: typeof window === "undefined" ? 0 : window.innerHeight * 2.6,
  //   properties: [
  //     {
  //       startValue: 1,
  //       endValue: 0.5,
  //       property: "opacity"
  //     },
  //     {
  //       startValue: 0,
  //       endValue: -10,
  //       property: "translateY",
  //       unit: "vh"
  //     }
  //   ]
  // }
]

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
  	<Section id={props.id} active={props.active} name="section-portfolio" headerStyle="white" footerStyle="white">
      <FrontLayer>
        <PortfolioCarousel projects={projects} />
      </FrontLayer>
    </Section>
  )
}

class PortfolioCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.slickNext = this.slickNext.bind(this);
    this.slickPrev = this.slickPrev.bind(this);
    this.slickGoToSlide = this.slickGoToSlide.bind(this);
    this.settings = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1200,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      afterChange: onSlideChange
    };
  }

  slickNext() {
    this.slider.slickNext();
  }

  slickPrev() {
    this.slider.slickPrev();
  }

  slickGoToSlide(index) {
    this.slider.slickGoTo(index);
  }

  render() {
    return (
      <React.Fragment>
        <Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true}>
          <h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "12rem", "", "", "20rem"]}>Нашe портфолио</Title></h2>
          <PortfolioCarouselMenu id="portfolio-carousel-menu" items={["Дизайн", "Контент", "Маркетинг и реклама", "Диджитал продакшн"]} nextArrowClick={this.slickNext} prevArrowClick={this.slickPrev} gotoSlide={this.slickGoToSlide} />
        </Plx>
        <Plx className="parallax-element" parallaxData={parallaxData_cards} animateWhenNotInViewport={true}>
          <PortfolioCarouselStyled id="portfolio-carousel" className="transition-05s">
            <Slider ref={slider => (this.slider = slider)} {...this.settings}>
              <PortfolioItem className="carousel-item active">
                <div className="header">
                  <p className="count transition-05s ff-bebas"><strong>{this.props.projects.design.length}</strong> {'проект' + wordEnd(this.props.projects.design.length, 'pr')}</p>
                  <h3><Title color="#fff">Дизайн</Title></h3>
                  <a className="all-projects" href="/portfolio/design"><span>Перейти</span></a>
                </div>
                <Plx className="parallax-element image" parallaxData={parallaxData_images} animateWhenNotInViewport={true} />
              </PortfolioItem>
              <PortfolioItem className="carousel-item">
                <div className="header">
                  <p className="count transition-05s ff-bebas"><strong>{this.props.projects.content.length}</strong> {'проект' + wordEnd(this.props.projects.content.length, 'pr')}</p>
                  <h3><Title color="#fff">Контент</Title></h3>
                  <a className="all-projects" href="/portfolio/content"><span>Перейти</span></a>
                </div>
                <Plx className="parallax-element image" parallaxData={parallaxData_images} animateWhenNotInViewport={true} />
              </PortfolioItem>
              <PortfolioItem className="carousel-item">
                <div className="header">
                  <p className="count transition-05s ff-bebas"><strong>{this.props.projects.marketing.length}</strong> {'проект' + wordEnd(this.props.projects.marketing.length, 'pr')}</p>
                  <h3><Title color="#fff">Маркетинг и реклама</Title></h3>
                  <a className="all-projects" href="/portfolio/marketing"><span>Перейти</span></a>
                </div>
                <Plx className="parallax-element image" parallaxData={parallaxData_images} animateWhenNotInViewport={true} />
              </PortfolioItem>
              <PortfolioItem className="carousel-item">
                <div className="header">
                  <p className="count transition-05s ff-bebas"><strong>{this.props.projects.digital.length}</strong> {'проект' + wordEnd(this.props.projects.digital.length, 'pr')}</p>
                  <h3><Title color="#fff">Диджитал продакшн</Title></h3>
                  <a className="all-projects" href="/portfolio/digital"><span>Перейти</span></a>
                </div>
                <Plx className="parallax-element image" parallaxData={parallaxData_images} animateWhenNotInViewport={true} />
              </PortfolioItem>
            </Slider>
          </PortfolioCarouselStyled>
        </Plx>
      </React.Fragment>
    )
  }
}

const PortfolioCarouselMenu = (props) => (
  <PortfolioCarouselMenuStyled id="portfolio-carousel-menu">
    {props.items.map((item, index) => {
      return (
        <div key={index} className={"item" + (index === 0? " active" : "")} data-index={index} onClick={(e) => props.gotoSlide(e.target.dataset.index)}>{item}</div>
      )
    })}
    <div onClick={props.prevArrowClick} className="arrow arrow-prev icon-prev transition-05s" />
    <div onClick={props.nextArrowClick} className="arrow arrow-next icon-next transition-05s" />
  </PortfolioCarouselMenuStyled>
)

function onSlideChange(index) {
  const menuFrame = document.getElementById("portfolio-carousel-menu");
  const curItem = menuFrame.querySelector(".active");
  curItem.classList.remove("active");
  menuFrame.children[index].classList.add("active");
}

function carouselArrowClick(e) {
  const arrow = e.target;
  const menuFrame = arrow.parentElement;
  const carouselContent = document.getElementById("portfolio-carousel").querySelector(".carousel-content");
  const curItem = menuFrame.querySelector(".active");
  const dir = (arrow.classList.contains("arrow-prev")? -1 : 1);
  let nextItem;
  let nextIndex;
  if (dir === 1) {
    nextItem = curItem.nextElementSibling;
  } else if (dir === -1) {
    nextItem = curItem.previousElementSibling;
  }
  if (nextItem && !nextItem.classList.contains("arrow")) {
    nextIndex = +nextItem.dataset.index;
  } else if (dir === 1) {
    nextIndex = 0;
    nextItem = menuFrame.children[nextIndex];
  } else if (dir === -1) {
    nextIndex = menuFrame.children.length - 3;
    nextItem = menuFrame.children[nextIndex];
  }
  curItem.classList.remove("active");
  nextItem.classList.add("active");
  moveCarousel(nextIndex);
}

function carouselItemClick(e) {
  const target = e.target;
  const menuFrame = target.parentElement;
  menuFrame.querySelector(".active").classList.remove("active");
  target.classList.add("active");
  moveCarousel(+target.dataset.index);
}

function moveCarousel(moveTo) {
  const carousel = document.getElementById("portfolio-carousel");
  const carouselContent = carousel.querySelector(".carousel-content");
  const curItem = carousel.querySelector(".active");
  const nextItem = carousel.querySelectorAll(".carousel-item")[moveTo];
  carouselContent.classList.add("is-animated");
  carouselContent.style.transform = "translateX(-" + nextItem.offsetLeft + "px)";
  curItem.classList.remove("active");
  nextItem.classList.add("active");
  setTimeout(() => {
    // const clone = carouselContent.children[0].cloneNode(true);
    // carouselContent.classList.remove("is-animated");
    // carouselContent.append(clone);
  }, 1300);
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
    border-bottom: 1px solid transparent;
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
    &:hover {
      background: ${COLORS.RED};
    }
  }
`

const PortfolioCarouselStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 20rem;
  padding-left: 20rem;

  .carousel-content {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;

    &.is-animated {
      transition: transform 1200ms ease-in-out;
    }
  }
`

const PortfolioItem = styled.div`
  display: inline-block;
  vertical-align: bottom;
  // margin-right: 10vw;
  position: relative;
  padding: 27rem 10vw 0 0;

  &:focus {
    outline: none;
  }

  .all-projects {
    position: absolute;
    bottom: 6.3rem;
    right: 8.6vw;

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
    min-height: 20.5rem;

    ${Title} {
      font-size: 5rem;
      transition: font-size 1000ms ease;
    }
  }

  .count {
    font-size: 1.6rem;
    font-weight: normal;
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

  .slick-active & {
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