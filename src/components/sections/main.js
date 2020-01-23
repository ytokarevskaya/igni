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
  // applyStyles(section, unloadStyles);
}

const onSectionLoad = (section) => {
  // applyStyles(section, loadStyles);
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
      <FrontLayer>
        <Plx className="parallax-element" parallaxData={parallaxData} animateWhenNotInViewport={true}>
          <Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "25rem", "", "", "20rem"]} className="scrollController-title">Освещая темное пространство веба</Title>
          <h1><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="12rem" pos={["absolute", "55vh", "", "", "20rem"]} margin="-12rem 0 0 0" className="scrollController-title">Веб-студия полного цикла</Title></h1>
          <Title fz="45rem" mFz="10rem" color="#fff" mColor="#fff" className="scrollController-title" lh="0.5" pos={["absolute", "55vh", "", "", "18rem"]}>IGNI</Title>
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

  openPopup() {
    this.setState({"active": true});
  }

  closePopup() {
    this.setState({"active": false});
  }

  render() {
    return(
      <React.Fragment>
        <HomeTitle className={"scrollController-title" + (this.state.active? " hidden" : "")}>
          <h2><Title fz="5rem" width="40rem" color="#fff" margin="0 0 5rem 0">Комплексные <br/>услуги по созданию <br/>и продвижению <br/>сайтов</Title></h2>
          <PlusBtn size="3.7rem" onClick={(e) => this.openPopup(e)} />
        </HomeTitle>
        <HomeTitlePopupStyled className={"transition-05s translate-x" + (this.state.active? " active" : "")}>
          <div className="content">
            <Title fz="5rem" color="#fff" margin="0 0 3.5rem 0" lineBottom>Комплексные услуги по созданию и продвижению сайтов</Title>
            <TextStyled>
              <p>Главная задача команды igni — обеспечить эффективное взаимодействие клиента и бизнеса в вебе. Чтобы достичь максимальных показателей, мы предлагаем не только маркетинговое сопровождение, но и конкретные действия по улучшению продукта.</p>
            </TextStyled>
            <div className="content-bottom">
              <PlusBtn size="3.7rem" onClick={(e) => this.closePopup(e)} />
              <a href="/portfolio/"><RedButton>Портфолио</RedButton></a>
            </div>
          </div>
        </HomeTitlePopupStyled>
      </React.Fragment>
    )
  }
}

const HomeTitlePopupStyled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25vw;
  background: rgba(5, 11, 31, 0.25);
  padding: 0 8rem;
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  &.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  .content-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 6rem;
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

const HomeTitle = styled.div`
  position: absolute;
  top: 55%;
  left: 55%;
  margin-top: -4.5rem;

  &.hidden {
    opacity: 0!important;
  }
`

export default SectionMain