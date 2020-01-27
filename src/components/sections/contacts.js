import React from "react"
import styled from "styled-components"
import Plx from "react-plx"

import Section from "../section"
import RequestForm from "../forms/request-form"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, InputFrame } from "../styled"
import { applyStyles } from "../scroll-controller"

const parallaxData_title = [
  {
    start: typeof window === "undefined" ? 0 : window.innerHeight * 3,
    end: typeof window === "undefined" ? 0 : window.innerHeight * 3.8,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      }
    ]
  }
]

const parallaxData_form = [
  {
    start: typeof window === "undefined" ? 0 : window.innerHeight * 3,
    end: typeof window === "undefined" ? 0 : window.innerHeight * 4,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      },
      {
        startValue: 40,
        endValue: 0,
        property: "translateY",
        unit: "vh"
      }
    ]
  }
]

const SectionContacts = (props) => (
	<Section id={props.id} active={props.active} name="section-contacts" headerStyle="white" footerStyle="white">
    <FrontLayer>
    	<Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true}>
	    	<h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "25rem", "", "", "20rem"]} className="scrollController-title">Контакты</Title></h2>
	      <ContactsTitle>
	        <h3><Title fz="5rem" color="#fff" width="40rem" margin="0 0 3.5rem 0" lineBottom>Приступим к работе над вашим проектом?</Title></h3>
	        <TextStyled width="42rem" color="#fff">Заполните бриф: расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для обсуждения дальнейшего сотрудничества.</TextStyled>
	      </ContactsTitle>
	      <ContactsBlocks>
	      	<ContactsBlock className="n1 scrollController-block">
	      		<a href="tel:+7 (495) 555 55 55" className="value ff-bebas">+7 (495) 555 55 55</a>
	      		<div className="text">Телефон</div>
	      	</ContactsBlock>
	      	<ContactsBlock className="n2 scrollController-block">
	      		<a href="mailto:info@igni.studio" className="value ff-bebas">info@igni.studio</a>
	      		<div className="text">Почта</div>
	      	</ContactsBlock>
	      	<ContactsBlock className="n3 scrollController-block">
	      		<a href="" className="text price icon-download">Описание услуг <br/>и прайс-лист</a>
	      	</ContactsBlock>
	      </ContactsBlocks>
      </Plx>
      <Plx className="parallax-element" parallaxData={parallaxData_form} animateWhenNotInViewport={true} style={{"position": "absolute", "bottom": 0, "width": "100%"}}>
	      <ContactsForm>
	      	<Copyright>
	      		<p>Реквизиты</p>
	      		<p>ООО «Игни студио»</p>
	      	</Copyright>
	      	<RequestForm theme="light" />
	      </ContactsForm>
      </Plx>
    </FrontLayer>
  </Section>
)

const Copyright = styled.div`
	position: absolute;
	bottom: 7rem;
	right: 7rem;
	font-size: 1.8rem;
	color: #fff;

	p {
		display: block;
		margin: 3rem 0;
	}
`

const ContactsBlocks = styled.div`
	position: absolute;
	top: 30%;
	left: 70rem;
	width: 100rem;
	display: flex;
	justify-content: space-between;
`

const ContactsBlock = styled.div`
  padding: 0 3.5rem;
  border-left: 1px solid #fff;

  &:first-child {
		border-left: unset;
  }

	.value {
		display: block;
		text-decoration: none;
		color: #fff;
		font-size: 5rem;
  	font-weight: bold;
  	margin-bottom: 4rem;

	}

	.text {
		font-size: 1.6rem;
		color: #fff;
		&.price {
			display: block;
			position: relative;
			padding-top: 6rem;
			line-height: 1.5;
			&::before {
				color: #fff;
				position: absolute;
				left: 0;
				top: 0;
				background: ${COLORS.WHITE_20};
				border-radius: 50%;
				width: 3.8rem;
				height: 3.8rem;
				line-height: 3.8rem;
				text-align: center;
			}
		}
	}

	.price {
		&::before {
			transition: background 500ms ease;
		}
		&:hover::before {
			background: ${COLORS.RED};
		}
	}
`

const ContactsForm = styled.div`
	position: absolute;
	bottom: 0;
	left: 70rem;
	right: 0;

	form {
		position: relative;
		width: 100rem;
    padding: 10rem 20rem 15rem 8rem;
	}
	
	.form-inputs {
		${InputFrame} {
			width: 48%;
			&:last-child {
				width: 100%;
			}
		}
	}

	.form-bottom {
		justify-content: flex-start;
	}
`

const ContactsTitle = styled.div`
  position: absolute;
  left: 20rem;
  bottom: 25rem;
  z-index: 1;
`

export default SectionContacts