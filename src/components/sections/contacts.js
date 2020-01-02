import React from "react"
import styled from "styled-components"

import Section from "../section"
import Form from "../form"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, InputFrame } from "../styled"

const SectionContacts = (props) => (
	<Section id={props.id} active={props.active} name="section-conatcts" headerStyle="dark" footerStyle="dark">
    <FrontLayer bg="#f6f7f9">
      <ContactsTitle>
        <Title fz="5rem" color={COLORS.BLACK} width="40rem" lineBottom lineBg={COLORS.BLACK}>Приступим к работе над <span className="red">вашим проектом?</span></Title>
        <TextStyled width="42rem" color={COLORS.BLACK}>Заполните бриф — расскажите о вашем бизнесе, задачах и сроках — и мы свяжемся с вами для дальнейшего обсуждения сотрудничества.</TextStyled>
      </ContactsTitle>
      <ContactsBlocks>
      	<ContactsBlock>
      		<a href="tel:+7 (495) 555 55 55" className="value ff-bebas">+7 (495) 555 55 55</a>
      		<div className="text">Телефон</div>
      	</ContactsBlock>
      	<ContactsBlock>
      		<a href="mailto:info@igni.studio" className="value ff-bebas">info@igni.studio</a>
      		<div className="text">Почта</div>
      	</ContactsBlock>
      </ContactsBlocks>
      <ContactsForm>
      	<ContactsLinks>
      		<div className="requisites">Реквизиты</div>
      		<a href="" className="price icon-download">Описание услуг и прайс-лист</a>
      	</ContactsLinks>
      	<Form action="" title="request" checkbox={false}>
      		<div className="form-inputs">
	      		<InputFrame width="26%">
	      			<label>Имя</label>
	      			<input type="text" name="name" autoComplete="off" />
	      		</InputFrame>
	      		<InputFrame width="15%">
	      			<label>Телефон</label>
	      			<input type="text" name="phone" autoComplete="off" />
	      		</InputFrame>
	      		<InputFrame width="26%">
	      			<label>E-mail</label>
	      			<input type="email" name="email" autoComplete="off" />
	      		</InputFrame>
	      		<InputFrame width="26%">
	      			<label>Компания</label>
	      			<input type="text" name="company" autoComplete="off" />
	      		</InputFrame>
	      		<InputFrame width="100%">
	      			<textarea placeholder="Задача"></textarea>
	      		</InputFrame>
      		</div>
      		<div className="form-bottom">
      			<button className="submit-button transition-03s" type="submit">Отправить бриф</button>
      		</div>
      	</Form>
      </ContactsForm>
    </FrontLayer>
  </Section>
)

const ContactsLinks = styled.div`
	position: absolute;
	top: -7rem;
	left: 0;
	display: flex;
	font-size: 1.8rem;
	color: ${COLORS.BLACK};

	> * {
		display: block;
		margin: 0 3rem 0 0;
	}

	.price {
		position: relative;
		padding-left: 3rem;
		&::before {
			color: ${COLORS.RED};
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
`

const ContactsBlocks = styled.div`
	position: absolute;
	top: 30%;
	right: 5%;
	display: flex;
`

const ContactsBlock = styled.div`
  padding: 0 8.5rem;
  border-left: 1px solid ${COLORS.GREY};

  &:first-child {
		border-left: unset;
  }

	.value {
		display: block;
		text-decoration: none;
		color: ${COLORS.BLACK};
		font-size: 5rem;
  	font-weight: bold;
  	margin-bottom: 4rem;

	}
	.text {
		font-size: 1.6rem;
		color: ${COLORS.GREY};
	}
`

const ContactsForm = styled.div`
	position: absolute;
	bottom: 0;
	left: 24rem;
	right: 0;
`

const ContactsTitle = styled.div`
  position: absolute;
  left: 24rem;
  top: 10rem;
  z-index: 1;

  ${Title} {
  	margin-bottom: 3rem;
  }
`

export default SectionContacts