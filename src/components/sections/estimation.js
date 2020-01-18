import React from "react"
import styled from "styled-components"

import Section from "../section"
import CallbackForm from "../forms/callback-form"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, InputFrame } from "../styled"
import { applyStyles } from "../scroll-controller"

import iconCircles from "../../images/circles.svg"
import iconAnalyze from "../../images/analyse.svg"
import iconIdea from "../../images/idea.svg"

const onLoadStyles = {
  ".scrollController-title": {
    "opacity": "1"
  },
  ".scrollController-details": {
    "transform": "translateY(0)",
    "transitionDelay": "600ms",
    "transitionDuration": "1000ms"
  },
  ".scrollController-form": {
  	"opacity": "1",
  	"transform": "translateX(0)",
  	"transitionDelay": "1500ms"
  }
}

const scrollControllerElements = {
	0 : {
    ".scrollController-details" : {
      "bottom" : "0",
      "transitionDelay": "0ms"
    },
    ".scrollController-form": {
    	"bottom": "12rem",
    	"transitionDelay": "0ms"
    }
  },
  100 : {
    ".scrollController-details" : {
      "bottom" : "calc(100% - 80rem)",
      "transitionDelay": "200ms"
    },
    ".scrollController-form": {
    	"bottom": "20rem",
    	"transitionDelay": "1000ms",
    	"transitionDuration": "1000ms"
    }
  }
}

function onSectionLoad(section) {
  setTimeout(() => {
    applyStyles(section, onLoadStyles);
  }, 1000);
}

function onSectionUnload(section) {
  section.style.transform = "translateY(-100%)";
  section.style.opacity = "0";
  setTimeout(() => {
    section.style.transform = "translateY(0)";
    section.style.opacity = "1";
  }, 5000);
}

const SectionEstimation = (props) => (
	<Section id={props.id} active={props.active} name="section-estimation" headerStyle="white" footerStyle="white" onLoad={onSectionLoad} scrollControllerElements={scrollControllerElements} onUnload={onSectionUnload}>
    <FrontLayer>
    	<h2><EstimationTitleSmall fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "25rem", "", "", "20rem"]} className="scrollController-title">Наше предложение</EstimationTitleSmall></h2>
      <EstimationTitle className="scrollController-title">
        <h3><Title fz="5rem" color="#fff" width="40rem" margin="0 0 3.5rem 0" lineBottom>Получите бесплатную оценку вашего сайта от команды igni</Title></h3>
        <TextStyled width="40rem" color="#fff">Перед началом сотрудничества мы бесплатно проведем краткий маркетинговый аудит вашего бизнеса и предложим комплекс мер по увеличению конверсии.</TextStyled>
      </EstimationTitle>
      <EstimationDetails className="scrollController-details">
      	<div className="item">
      		<img className="icon" src={iconCircles} alt="" />
      		<TextStyled margin="3.5rem 0" color="#fff">Анализ производительности, текущего дизайна и наполнения сайта</TextStyled>
      	</div>
      	<div className="item">
      		<img className="icon" src={iconAnalyze} alt="" />
      		<TextStyled margin="3.5rem 0" color="#fff">Оценка эффективности текущей рекламной кампании</TextStyled>
      	</div>
      	<div className="item">
      		<img className="icon" src={iconIdea} alt="" />
      		<TextStyled margin="3.5rem 0" color="#fff">Предложение по необходимым изменениям на сайте</TextStyled>
      	</div>
      </EstimationDetails>
      <EstimationCallbackFrame className="scrollController-form">
      	<Title color="#fff" fz="2.8rem" fw="300" width="25rem">Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время</Title>
      	<CallbackForm buttonLabel="Готово!" theme="light"/>
      </EstimationCallbackFrame>
    </FrontLayer>
  </Section>
)

const EstimationCallbackFrame = styled.div`
	position: absolute;
	left: 60rem;
	bottom: 12rem;
  margin-left: 6vw;
  opacity: 0;
  transform: translateX(-15%);

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
	position: absolute;
	left: 60rem;
	bottom: 0;
  margin-left: 6vw;
	width: 48rem;
	background: ${COLORS.LIGHT_BLACK};
	padding: 10rem 8.5rem;
	z-index: 1;
	transform: translateY(100%);

	.item + .item {
		margin: 6rem 0 0 0;
	}

	.icon {
		max-height: 6rem;
		max-width: 6.5rem;
	}
`

const EstimationTitleSmall = styled(Title)`
`

const EstimationTitle = styled.div`
	position: absolute;
  left: 20rem;
  top: 45%;
  z-index: 1;
  opacity: 0;
`

export default SectionEstimation