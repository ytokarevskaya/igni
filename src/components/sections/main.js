import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Plx from "react-plx"

import Section from "../section"
import { applyStyles } from "../scroll-controller"

import { COLORS, FrontLayer, Title, TextStyled, PlusBtn, RedButton } from "../styled"

const onSectionUnload = (section) => {
  const video = document.getElementById("bg-video");
  video.pause();
  video.parentElement.classList.add("is-blurred");
}

const onSectionLoad = (section) => {
  const video = document.getElementById("bg-video");
  video.play();
  video.parentElement.classList.remove("is-blurred");
}


const SectionMain = (props) => {
  const parallaxData = [
    {
      start: 0,
      duration: typeof window === "undefined" ? 0 : window.innerHeight * 1,
      properties: [
        {
          startValue: 1,
          endValue: 0,
          property: "opacity"
        }
      ]
    }
  ]

  return(
  	<Section id={props.id} active={props.active} name="section-main" headerStyle="white" footerStyle="white">
      <FrontLayer className="load-fadeIn">
        <Plx className="parallax-element div_100" parallaxData={parallaxData} animateWhenNotInViewport={true}>
          <Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "20rem", "", "", "20rem"]} className="scrollController-title">Освещая темное пространство веба</Title>
          <Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="12rem" pos={["absolute", "50%", "", "", "20rem"]} margin="-12rem 0 0 0" className="scrollController-title"><h1>Веб-студия полного цикла</h1></Title>
          <Title fz="45rem" mFz="10rem" color="#fff" mColor="#fff" className="scrollController-title" lh="0.8" pos={["absolute", "50%", "", "", "18rem"]}>IGNI</Title>
          <HomeTitlePopup />
        </Plx>
          {/*<Link to="/portfolio">
            <PortfolioBtn className="transition-05s" href="/portfolio">
              <div className="icon icon-fire transition-05s" />
              <div className="title transition-05s">Портфолио</div>
            </PortfolioBtn>
          </Link>
          <PulseBtn>+</PulseBtn>*/}
      </FrontLayer>
    </Section>
  )
}

class HomeTitlePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": false
    }
  }

  togglePopup() {
    if (this.state.active) {
      this.setState({"active": false});
    } else {
      this.setState({"active": true});
    }
  }

  render() {
    return(
      <React.Fragment>
        <HomeTitle className={this.state.active? " active" : ""}>
          <h2><Title fz="5rem" width="40rem" color="#fff" margin="0 0 3.5rem 0" lineBottom lineWidth="0">Комплексные <br/>услуги по созданию <br/>и продвижению <br/>сайтов</Title></h2>
          <div className="hidden-content">
            <TextStyled width="40rem">
              <p>Главная задача команды igni — обеспечить эффективное взаимодействие клиента и бизнеса в вебе. Чтобы достичь максимальных показателей, мы предлагаем не только маркетинговое сопровождение, но и конкретные действия по улучшению продукта.</p>
            </TextStyled>
            <a href="/portfolio/"><RedButton>Портфолио</RedButton></a>
          </div>
          <PlusBtn size="3.7rem" className="transition-05s" onClick={(e) => this.togglePopup(e)} />
        </HomeTitle>
        <HomeTitlePopupBg className={this.state.active? " active" : ""} />
      </React.Fragment>
    )
  }
}

const HomeTitle = styled.div`
  position: absolute;
  top: 55%;
  left: 55%;
  margin-top: -4.5rem;
  z-index: 6;
  transition: all 1000ms ease;

  ${Title} {
    &::before {
      transition: width 500ms ease;
    }
  }

  ${RedButton} {
    margin: 3rem 0 4rem 0;
  }

  .hidden-content {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: all 1500ms ease;
  }

  &.active {
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);

    .hidden-content {
      max-height: 100rem;
      opacity: 1;
    }

    ${Title} {
      &::before {
        width: 7rem;
      }
    }

    ${PlusBtn} {
      transform: rotate(-45deg);
    }
  }
`

const HomeTitlePopupBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 55%;
  margin-left: -8rem;
  width: 56rem;
  background: rgba(5, 11, 31, 0.25);
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 800ms ease;

  &.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transition-delay: 800ms;
  }
`

const HomeTitlePopupStyled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 55%;
  margin-left: -8rem;
  width: 56rem;
  background: rgba(5, 11, 31, 0.25);
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 800ms ease;

  &.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transition-delay: 1000ms;
  }

  .content {
    position: absolute;
    top: 55%;
    left: 0;
    width: 100%;
    padding: 0 8rem;
    transform: translateY(-50%);
    margin-top: -10rem;
  }

  ${PlusBtn} {
    transform: rotate(45deg);
    &::before {
      font-size: 2.8rem;
      font-weight: 200;
    }
  }
`

const PortfolioBtn = styled.div`
  position: relative;
  background: ${COLORS.RED};
  border: 2px solid ${COLORS.RED};
  padding: 1.3rem 3rem;
  cursor: pointer;

  .icon {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #fff;
    color: ${COLORS.RED};
    font-size: 2.2rem;

    &::before {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -0.5em;
    }
  }

  .title {
    font-size: 1.72rem;
    color: #fff;
    position: absolute;
    left: 3rem;
    bottom: 3rem;
  }

  &:hover {
    border-color: #fff;
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media screen and (min-width: 1280px) and (pointer: fine) {
    left: -20rem;
    width: 15rem;
    height: 30rem;
    padding: 3rem;
  }
`

export default SectionMain