import React from "react"
import styled from "styled-components"
import Plx from "react-plx"

import Section from "../section"

import { COLORS, FrontLayer, Title, TextStyled, PlusBtn, RedButton } from "../styled"

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

  const isMobile = typeof window !== "undefined" && window.mobile;

  return(
  	<Section id={props.id} active={props.active} name="section-main" headerStyle="white" footerStyle="white">
      <FrontLayer className="load-fadeIn">
        <Plx className="parallax-element div_100" parallaxData={parallaxData} animateWhenNotInViewport={true} disabled={isMobile}>
          <Title fz="2rem" mFz="1.4rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" mWidth="13rem" pos={["absolute", "20rem", "", "", "20rem"]} mPos={["absolute", "7rem", "", "", "0"]}>
            Освещая темное пространство веба
          </Title>
          <Title fz="2rem" mFz="1.4rem" mColor="#fff" color="#fff" lh="1.2" width="12rem" mWidth="10rem" pos={["absolute", "50%", "", "", "20rem"]} mPos={["absolute", "", "", "23rem", "0"]} margin="-12rem 0 0 0">
            <h1>Веб-студия полного цикла</h1>
          </Title>
          <Title fz="45rem" mFz="18rem" color="#fff" mColor="#fff" lh="0.8" pos={["absolute", "50%", "", "", "18rem"]} mPos={["absolute", "", "", "8.5rem", "-1rem"]}>
            IGNI
          </Title>
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
          <h2><Title fz="5rem" mFz="2rem" width="40rem" color="#fff" margin="0 0 3.5rem 0" mMargin="0 0 3.5rem 0" lineBottom lineWidth="0">Комплексные <br/>услуги по созданию <br/>и продвижению <br/>сайтов</Title></h2>
          <div className="hidden-content">
            <TextStyled width="40rem" mFz="1.2rem">
              <p>Главная задача команды igni — обеспечить эффективное взаимодействие клиента и бизнеса в вебе. Чтобы достичь максимальных показателей, мы предлагаем не только маркетинговое сопровождение, но и конкретные действия по улучшению продукта.</p>
            </TextStyled>
            <a href="/portfolio/"><RedButton>Портфолио</RedButton></a>
          </div>
          <PlusBtn size="3.7rem" mSize="2.6rem" className="transition-05s" onClick={(e) => this.togglePopup(e)} />
        </HomeTitle>
        <HomeTitlePopupBg className={this.state.active? " active" : ""} />
      </React.Fragment>
    )
  }
}

const HomeTitle = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  z-index: 31;
  transition: all 1000ms ease;

  ${Title} {
    &::before {
      transition: width 500ms ease;
    }
  }

  ${RedButton} {
    margin: 1rem 0 2rem 0;
    font-size: 1.4rem;
  }

  .hidden-content {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: all 1500ms ease;
  }

  &.active {
    // transform: translateY(-50%);
    top: calc(55% - 30rem);

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

  @media screen and (min-width: 1280px) and (pointer: fine) {
    top: 55%;
    left: 55%;
    margin-top: -4.5rem;
    z-index: 6;

    ${RedButton} {
      font-size: 1.6rem;
      margin: 3rem 0 4rem 0;
    }
  }
`

const HomeTitlePopupBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: -2.5rem 0 0 -2.5rem;
  width: 100vw;
  height: 100vh;
  background: rgba(5, 11, 31, 0.25);
  z-index: 30;
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

  @media screen and (min-width: 1280px) and (pointer: fine) {
    left: 55%;
    margin: 0 0 0 -8rem;
    width: 56rem;
    height: auto;
    z-index: 5;
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