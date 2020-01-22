import React from "react"
import styled from "styled-components"
import { Parallax } from "react-skrollr"

import Section from "../section"
import CallbackForm from "../forms/callback-form"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, InputFrame } from "../styled"
import { applyStyles } from "../scroll-controller"

import iconCircles from "../../images/circles.svg"
import iconAnalyze from "../../images/analyse.svg"
import iconIdea from "../../images/idea.svg"

const SectionEstimation = (props) => (
	<Section id={props.id} active={props.active} name="section-estimation" headerStyle="white" footerStyle="white">
    <FrontLayer>
      <Parallax data={{
        'data-280p': 'opacity: 0;',
        'data-300p': 'opacity: 1;',
      }}>
      	<h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "25rem", "", "", "20rem"]} className="scrollController-title">Наше предложение</Title></h2>
        <EstimationTitle className="scrollController-title">
          <h3><Title fz="5rem" color="#fff" width="40rem" margin="0 0 3.5rem 0" lineBottom>Получите бесплатную оценку вашего сайта от команды igni</Title></h3>
          <TextStyled width="40rem" color="#fff">Перед началом сотрудничества мы бесплатно проведем краткий маркетинговый аудит вашего бизнеса и предложим комплекс мер по увеличению конверсии.</TextStyled>
        </EstimationTitle>
      </Parallax>
      <Parallax data={{
        'data-240p': 'position: absolute;bottom: -50rem;',
        'data-260p': 'position: absolute;bottom: 0;',
        'data-330p': 'position: absolute;bottom: 10rem;',
      }}>
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
      </Parallax>
      <Parallax data={{
        'data-250p': 'position: absolute; bottom: 0; opacity: 0;transform: translateY(40rem);',
        'data-300p': 'position: absolute; bottom: 0; opacity: 1;transform: translateY(0);',
      }}>
        <EstimationCallbackFrame className="scrollController-form">
        	<Title color="#fff" fz="2.8rem" fw="300" width="25rem">Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время</Title>
        	<CallbackForm buttonLabel="Готово!" theme="light"/>
        </EstimationCallbackFrame>
      </Parallax>
    </FrontLayer>
  </Section>
)

const EstimationCallbackFrame = styled.div`
	position: absolute;
	left: 60rem;
	bottom: 12rem;
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
	position: absolute;
	left: 60rem;
	bottom: 0;
  margin-left: 6vw;
	width: 48rem;
	background: ${COLORS.LIGHT_BLACK};
	padding: 10rem 8.5rem;
	z-index: 1;

	.item + .item {
		margin: 6rem 0 0 0;
	}

	.icon {
		max-height: 6rem;
		max-width: 6.5rem;
	}
`

const EstimationTitle = styled.div`
	position: absolute;
  left: 20rem;
  top: 45vh;
  z-index: 1;
`

export default SectionEstimation