import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ScrollFrame, SectionStyled, BackLayer, FrontLayer, Title, TextStyled, PulseBtn } from "../components/styled"

import videoSrc from "../video/fire-1080p.mp4"

const IndexPage = () => (
  <Layout>
    <SEO title="IGNI | Веб-студия полного цикла" />
    <ScrollFrame>
      <SectionStyled>
        <BackLayer>
          <BgVideo>
            <video autoPlay={true} className="translate-xy" loop={true}>
             <source src={videoSrc} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            </video>
          </BgVideo>
        </BackLayer>
        <FrontLayer bg="linear-gradient(155deg,rgba(255,255,255,0.5) 22%,rgba(0, 0, 0, 0.1) 58%),linear-gradient(to bottom,rgba(42,35,42,0.15),rgba(42,35,42,0.15))">
          <HomeTitle className="translate-x">
            <Title fz="20rem" className="n1" lh="0.5">IGNI</Title>
            <Title fz="2.4rem" color="#fff" width="12rem" ta="right" className="n2">Освещая темное пространство веба</Title>
            <Title color="#fff" width="36rem" className="n3">Комплексные услуги по созданию и продвижению сайтов</Title>
          </HomeTitle>
          <HomeSubtitle>
            <TextStyled width="43rem">
              <p>Главная задача команды igni — обеспечить эффективное взаимодействие клиента и бизнеса в вебе. Чтобы достичь максимальных показателей, мы предлагаем не только маркетинговое сопровождение, но и конкретные действия по улучшению продукта.</p>
            </TextStyled>
            <PortfolioBtn>
              <div className="icon icon-fire" />
              <div className="title">Портфолио</div>
            </PortfolioBtn>
            <PulseBtn>+</PulseBtn>
          </HomeSubtitle>
        </FrontLayer>
      </SectionStyled>
    </ScrollFrame>
  </Layout>
)

export default IndexPage

const PortfolioBtn = styled.div`
  position: relative;
  left: -20rem;
  width: 15rem;
  height: 30rem;
  background: #de5650;
  padding: 3rem;
  cursor: pointer;

  .icon {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #fff;
    color: #de5650;
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
`

const HomeSubtitle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 10rem 0 0 20rem;
  width: 2px;
  height: 15rem;
  background: #fff;

  ${TextStyled} {
    position: absolute;
    left: 5rem;
    top: 0;

    p {
      margin: 0;
    }
  }

  ${PulseBtn} {
    position: absolute;
    bottom: -7rem;
    right: -55rem;
  }
`

const HomeTitle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 50%;
  background: #fff;

  .n1 {
    position: absolute;
    right: 5rem;
    bottom: 28.5rem;
  }

  .n2 {
    position: absolute;
    right: 5rem;
    bottom: 9.3rem;
  }

  .n3 {
    position: absolute;
    left: 5rem;
    bottom: -0.7rem;
  }
`

const BgVideo = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
  }
`