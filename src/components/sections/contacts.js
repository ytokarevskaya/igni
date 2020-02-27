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

const isMobile = typeof window !== "undefined" && window.mobile;

const SectionContacts = (props) => (
	<Section id={props.id} active={props.active} name="section-contacts" headerStyle="white" footerStyle="white">
    <FrontLayer>
    	<Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true} disabled={isMobile}>
	    	<h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "25rem", "", "", "20rem"]} mMargin="0 0 10rem 0">Контакты</Title></h2>
	      <ContactsTitle>
	        <h3><Title fz="5rem" mFz="3.5rem" color="#fff" width="40rem" margin="0 0 3.5rem 0" mMargin="0 0 3.5rem 0" lineBottom>Приступим к работе над вашим проектом?</Title></h3>
	        <TextStyled width="42rem" color="#fff">Заполните бриф: расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для обсуждения дальнейшего сотрудничества.</TextStyled>
	      </ContactsTitle>
	      <ContactsBlocks className="mobile-hidden">
	      	<ContactsBlock className="n1">
	      		<a href="tel:+7 (495) 555 55 55" className="value ff-bebas">+7 (495) 555 55 55</a>
	      		<div className="text">Телефон</div>
	      	</ContactsBlock>
	      	<ContactsBlock className="n2">
	      		<a href="mailto:info@igni.studio" className="value ff-bebas">info@igni.studio</a>
	      		<div className="text">Почта</div>
	      	</ContactsBlock>
	      	<ContactsBlock className="n3">
	      		<a href="" className="text price icon-download">Описание услуг <br/>и прайс-лист</a>
	      	</ContactsBlock>
	      </ContactsBlocks>
      </Plx>
      <Plx className="parallax-element contacts-form-parallax" parallaxData={parallaxData_form} animateWhenNotInViewport={true} disabled={isMobile}>
	      <ContactsForm>
	      	<Copyright>
	      		<p>Реквизиты</p>
	      		<p>ООО «Игни студио»</p>
	      	</Copyright>
	      	<RequestForm theme="light" />
	      </ContactsForm>
	      <ContactsBlocks className="desktop-hidden">
	      	<ContactsBlock className="n1">
	      		<a href="tel:+7 (495) 555 55 55" className="value ff-bebas">+7 (495) 555 55 55</a>
	      		<div className="text">Телефон</div>
	      	</ContactsBlock>
	      	<ContactsBlock className="n2">
	      		<a href="mailto:info@igni.studio" className="value ff-bebas">info@igni.studio</a>
	      		<div className="text">Почта</div>
	      	</ContactsBlock>
	      	<ContactsBlock className="n3">
	      		<a href="" className="text price icon-download">Описание услуг <br/>и прайс-лист</a>
	      	</ContactsBlock>
	      </ContactsBlocks>
      </Plx>
    </FrontLayer>
  </Section>
)

const Copyright = styled.div`
	position: absolute;
	bottom: 9.5rem;
	right: 0;
	font-size: 1.6rem;
	color: #fff;
	text-align: right;

	p {
		display: block;
		margin: 0.7rem 0;
	}

	@media screen and (min-width: 1280px) and (pointer: fine) {
		bottom: 7rem;
		right: 7rem;
		font-size: 1.8rem;
		text-align: left;

		p {
			margin: 3rem 0;
		}
	}
`

const ContactsBlocks = styled.div`
	background: #000;
	position: relative;
  left: -2.5rem;
	margin-top: -18rem;
  width: 100vw;
  padding: 18rem 0 10rem 0;
  z-index: -1;

	@media screen and (min-width: 1280px) and (pointer: fine) {
		position: absolute;
		top: 30%;
		left: 70rem;
		width: 100rem;
		display: flex;
		justify-content: space-between;
		background: transparent;
		margin: 0;
		padding: 0;
		z-index: 0;
	}
`

const ContactsBlock = styled.div`
  padding: 0 2.5rem;
  margin: 4rem 0;

	.value {
		display: block;
		text-decoration: none;
		color: #fff;
		font-size: 3.5rem;
  	font-weight: bold;
  	margin-bottom: 1.6rem;
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

	&.n3 {
		margin-bottom: 0;
	}

	@media screen and (min-width: 1280px) and (pointer: fine) {
		padding: 0 3.5rem;
		margin: 0;
	  border-left: 1px solid #fff;

	  &:first-child {
			border-left: unset;
	  }

	  .value {
			font-size: 5rem;
	  	margin-bottom: 4rem;
		}

		.price {
			&::before {
				transition: background 500ms ease;
			}
			&:hover::before {
				background: ${COLORS.RED};
			}
		}
	}
`

const ContactsForm = styled.div`
	margin-left: -2.5rem;
	width: calc(100% + 2.5rem);

	form {
		margin: 5rem 0;
	}

	.form-bottom {
		justify-content: flex-end;
		flex-wrap: wrap;

		.submit-button {
			order: 1;
			margin-top: 5rem;
		}
	}

	@media screen and (min-width: 1280px) and (pointer: fine) {
		position: absolute;
		bottom: 0;
		left: 70rem;
		right: 0;
		margin: 0;

		form {
			position: relative;
			width: 100rem;
	    padding: 10rem 20rem 15rem 8rem;
		}

		.form-bottom {
			justify-content: flex-start;
		}
		
		.form-inputs {
			${InputFrame} {
				width: 48%;
				&:last-child {
					width: 100%;
				}
			}
		}
	}
`

const ContactsTitle = styled.div`
	@media screen and (min-width: 1280px) and (pointer: fine) {
	  position: absolute;
	  left: 20rem;
	  bottom: 25rem;
	  z-index: 1;
	}
`

export default SectionContacts