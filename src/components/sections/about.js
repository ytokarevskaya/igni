import React from "react"
import styled from "styled-components"
import { Link, StaticQuery, graphql } from "gatsby"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import Plx from "react-plx"

import Section from "../section"
import Scroll from "../scroll"
import { useCategoriesData } from "../queries/get-categories-data"
import { applyStyles } from "../scroll-controller"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, SectionScroll, PlusBtn } from "../styled"

import aboutItemMask from "../../images/about-item-mask.svg"
import aboutItemMaskHover from "../../images/about-item-mask-hover.svg"

const SectionAbout = (props) => {
  const { edges } = useCategoriesData()
  const categories = [];
  const categoriesTitles = [];

  edges.map((item) => {
    const category = item.node;
    categories.push(category);
    categoriesTitles.push(category.title);
  });

  const parallaxData_title = [
    {
      start: typeof window === "undefined" ? 0 : window.innerHeight * 0.1,
      end: typeof window === "undefined" ? 0 : window.innerHeight * 1,
      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: "opacity"
        },
        {
          startValue: 20,
          endValue: 0,
          property: "translateY",
          unit: "vh"
        }
      ]
    }
  ]

  const parallaxData_cards = [
    {
      start: typeof window === "undefined" ? 0 : window.innerHeight * 0.3,
      end: typeof window === "undefined" ? 0 : window.innerHeight * 1,
      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: "opacity"
        },
        {
          startValue: 20,
          endValue: -20,
          property: "translateY",
          unit: "vh"
        }
      ]
    },
    {
      start: typeof window === "undefined" ? 0 : window.innerHeight * 1.2,
      end: typeof window === "undefined" ? 0 : window.innerHeight * 1.6,
      properties: [
        {
          startValue: -20,
          endValue: -60,
          property: "translateY",
          unit: "vh"
        },
        {
          startValue: 1,
          endValue: 0.75,
          property: "opacity"
        }
      ]
    }
  ]

  return (
    <Section id={props.id} active={props.active} name="section-about" headerStyle="white" footerStyle="white">
      <FrontLayer>
        <Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true}>
          <h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" pos={["absolute", "15rem", "", "", "20rem"]} className="scrollController-title">Наши услуги</Title></h2>
          <AboutTitle className="scrollController-title">
            <h3><Title fz="5rem" color="#fff" width="30rem" lineBottom>Проектируем, разрабатываем, продвигаем</Title></h3>
            <TextStyled width="42rem" color="#fff" margin="3.5rem 0 0 0">Чтобы осветить темное пространство веба новыми проектами, мы собрали команду профессионалов с обширным опытом работы в сфере дизайна, разработки, маркетинга, рекламы и видео производства.</TextStyled>
          </AboutTitle>
        </Plx>
        <Plx className="parallax-element" parallaxData={parallaxData_cards} animateWhenNotInViewport={true}>
          <AboutItems className="scrollController-cards">
          {categories.map((node, index) => (
              <AboutItem key={node.id} id={index} title={node.title} content={node.description} bg={node.background.file.url} slug={node.slug} />
            ))
          }
          </AboutItems>
        </Plx>
      </FrontLayer>
    </Section>
  )
}

class AboutItem extends React.Component {
  constructor(props) {
    super(props);
  }

  moveBtn(e) {
    const btn = this.redBtn.current;
    const parent = btn.parentElement;
    const scrollFrame = parent.parentElement;
    btn.style.position = "absolute";
    btn.style.left = (e.pageX - scrollFrame.offsetLeft) + "px";
    btn.style.top = (e.pageY - (scrollFrame.offsetTop + parent.offsetTop - (-scrollFrame.dataset.pos))) + "px";
    btn.style.bottom = "auto";
  }

  returnBtn(e) {
    this.redBtn.current.style.left = "inherit";
    this.redBtn.current.style.top = "inherit";
    this.redBtn.current.style.bottom = "inherit";
  }

  render() {
    {/*<AboutItemStyled className="transition-05s item" data-id={this.props.id} onMouseEnter={(e) => this.moveBtn(e)} onMouseMove={(e) => this.moveBtn(e)} onMouseLeave={(e) => this.returnBtn(e)}>*/}
    return (
      <a href={"/portfolio/" + this.props.slug}>
        <AboutItemStyled className={"transition-05s item n" + this.props.id} data-id={this.props.id} bgImg={this.props.bg}>
          <div className="bg transition-05s" />
          <h3><Title color={COLORS.BLACK}>{this.props.title}</Title></h3>
          <div>
            <TextStyled color={COLORS.BLACK} lh="1.15" className="is-ul-red" dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.content? this.props.content.json : "")}} />
          </div>
        </AboutItemStyled>
      </a>
    )
  }
}

const AboutItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: absolute;
  top: 35rem;
  right: 15vw;  

  > * {
    position: relative;
    &:nth-child(even) {
      top: 20rem;
    }
  }
`

const AboutItemStyled = styled.div`
  position: relative;
  color: ${COLORS.BLACK};
  width: 30rem;
  padding: 5rem 4rem;
  margin: 0 5rem 5rem 0;
  // border-radius: 3px;
  cursor: none;
  background-image: url(${aboutItemMask});
  background-size: 100% 100%;

  &:hover {
    background-image: url(${aboutItemMaskHover});
    // box-shadow: 0 4px 15px -5px rgba(0, 0, 0, 0.35);
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    // background-color: #fff;
    // background-size: contain;
    // background-position: top right;
    // background-repeat: no-repeat;
    // background-image: ${props => "url(" + props.bgImg + ")" || "unset"};
    border-radius: 3px;
  }

  ${Title} {
    font-size: 2.6rem;
    margin-bottom: 4rem;
  }

  ${PlusBtn} {
    position: absolute;
    left: 3.5rem;
    bottom: 3.5rem;
  }

  &.n2 {
    ${Title} {
      width: 12rem;
    }
  }
`

const AboutTitle = styled.div`
  position: absolute;
  left: 20rem;
  top: 35rem;
  z-index: 1;
`

export default SectionAbout