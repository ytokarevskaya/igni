import React from "react"
import styled from "styled-components"
import Plx from "react-plx"

import Section from "../section"
import CallbackForm from "../forms/callback-form"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, InputFrame } from "../styled"
import { applyStyles } from "../scroll-controller"

import iconAnalyze from "../../images/circles.svg"
import iconCircles from "../../images/analyse.svg"
import iconIdea from "../../images/idea.svg"

const parallaxData_title = [
  {
    start: typeof window === "undefined" ? 0 : window.innerHeight * 2,
    end: typeof window === "undefined" ? 0 : window.innerHeight * 2.8,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      }
    ]
  }
]

const parallaxData_desc = [
  {
    start: typeof window === "undefined" ? 0 : window.innerHeight * 1.9,
    end: typeof window === "undefined" ? 0 : window.innerHeight * 4,
    properties: [
      {
        startValue: 45,
        endValue: -10,
        property: "translateY",
        unit: "vh"
      }
    ]
  }
]

const parallaxData_form = [
  {
    start: typeof window === "undefined" ? 0 : window.innerHeight * 2,
    end: typeof window === "undefined" ? 0 : window.innerHeight * 3.1,
    properties: [
      {
        startValue: 60,
        endValue: 0,
        property: "translateY",
        unit: "vh"
      },
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      }
    ]
  }
]

const isMobile = typeof window !== "undefined" && window.mobile;

const SectionEstimation = (props) => (
	<Section id={props.id} active={props.active} name="section-estimation" headerStyle="white" footerStyle="white">
    <FrontLayer>
      <Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true} disabled={isMobile}>
      	<Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "15rem", "", "", "20rem"]} mMargin="10rem 0 15rem 0" className="scrollController-title">Наше предложение</Title>
        <EstimationTitle>
          <Title fz="5rem" mFz="3.5rem" color="#fff" width="40rem" margin="0 0 3.5rem 0" mMargin="0 0 3.5rem 0" lineBottom>Получите бесплатную оценку вашего сайта от команды igni</Title>
          <TextStyled width="40rem" color="#fff">Перед началом сотрудничества мы бесплатно проведем краткий маркетинговый аудит вашего бизнеса и предложим комплекс мер по увеличению конверсии.</TextStyled>
        </EstimationTitle>
      </Plx>
      <Plx className="parallax-element" parallaxData={parallaxData_form} animateWhenNotInViewport={true} style={{"bottom": 0, "position": "absolute"}} disabled={isMobile}>
        <EstimationCallbackFrame>
        	<Title color="#fff" fz="2.8rem" fw="normal" width="25rem">Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время</Title>
        	<CallbackForm buttonLabel="Готово!" theme="light" noFileInput/>
        </EstimationCallbackFrame>
      </Plx>
      <Plx className="parallax-element" parallaxData={parallaxData_desc} animateWhenNotInViewport={true} disabled={isMobile}>
        <EstimationDetails>
        	<div className="item">
        		<img className="icon" src={iconAnalyze} alt="" />
        		<TextStyled margin="3.5rem 0" color="#fff">Анализ производительности, текущего дизайна и наполнения сайта</TextStyled>
        	</div>
        	<div className="item">
        		<img className="icon" src={iconCircles} alt="" />
        		<TextStyled margin="3.5rem 0" color="#fff">Оценка эффективности текущей рекламной кампании</TextStyled>
        	</div>
        	<div className="item">
        		<img className="icon" src={iconIdea} alt="" />
        		<TextStyled margin="3.5rem 0" color="#fff">Предложение по необходимым изменениям на сайте</TextStyled>
        	</div>
        </EstimationDetails>
      </Plx>
    </FrontLayer>
  </Section>
)

const EstimationCallbackFrame = styled.div`
	position: absolute;
	left: 60rem;
	bottom: 7rem;
  margin-left: 6vw;

  ${Title} {
  	margin: 0 0 10rem 58rem;
  }

  form {
  	width: 90rem;
  	padding: 10rem 10rem 10rem 58rem;

  	${InputFrame} {
  		width: 100%;
  	}

  	button {
  		margin-top: 2.5rem;
  	}
  }
`

const EstimationDetails = styled.div`
	position: relative;
	margin: 15vh 0 0 -2.5rem;
	background: ${COLORS.LIGHT_BLACK};
	padding: 5rem 2.5rem;
	z-index: 1;

  .item {
    width: 70%;
    font-weight: 300;
  }
	
	.item + .item {
		margin: 6rem 0 0 0;
	}

	.icon {
		max-height: 6rem;
		max-width: 6.5rem;
	}

  @media screen and (min-width: 1280px) and (pointer: fine) {
    position: absolute;
    left: 60rem;
    bottom: 6rem;
    margin: 0 0 0 6vw;
    padding: 10rem 8.5rem;
    width: 48rem;
    transform: translateY(100%);
  }
`

const EstimationTitle = styled.div`
  @media screen and (min-width: 1280px) and (pointer: fine) {
  	position: absolute;
    left: 20rem;
    top: 35rem;
    z-index: 1;
  }
`

export default SectionEstimation