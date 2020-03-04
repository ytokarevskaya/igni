import React from "react"
import styled from "styled-components"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import Plx from "react-plx"
import Slider from "react-slick"

import Section from "../section"
import { useCategoriesData } from "../queries/get-categories-data"

import { COLORS, FrontLayer, Title, TextStyled, PlusBtn } from "../styled"

import aboutItemMask from "../../images/about-item-mask.svg"
import aboutItemMaskHover from "../../images/about-item-mask-hover.svg"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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

  const isMobile = typeof window !== "undefined" && window.mobile;

  const sliderSettings = {
    className: "slider variable-width",
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Section id={props.id} active={props.active} name="section-about" headerStyle="white" footerStyle="white">
      <FrontLayer>
        <Plx className="parallax-element" parallaxData={parallaxData_title} animateWhenNotInViewport={true} disabled={isMobile}>
          <h2><Title fz="2rem" mFz="1.8rem" mColor="#fff" color="#fff" lh="1.2" width="15rem" mPos={["relative", "", "", "", ""]} pos={["absolute", "15rem", "", "", "20rem"]}>Наши услуги</Title></h2>
          <AboutTitle>
            <h3><Title fz="5rem" mFz="3rem" color="#fff" width="30rem" mWidth="18rem" lineBottom>Проектируем, разрабатываем, продвигаем</Title></h3>
            <TextStyled width="42rem" color="#fff" margin="3.5rem 0 0 0" mMargin="3.5rem 0 0 0">Чтобы осветить темное пространство веба новыми проектами, мы собрали команду профессионалов с обширным опытом работы в сфере дизайна, разработки, маркетинга, рекламы и видео производства.</TextStyled>
          </AboutTitle>
        </Plx>
        <Plx className="parallax-element" parallaxData={parallaxData_cards} animateWhenNotInViewport={true} disabled={isMobile}>
          <AboutItems className="mobile-hidden">
            {categories.map((node, index) => (
                <AboutItem key={node.id} id={index} title={node.title} content={node.description} bg={node.background.file.url} slug={node.slug} />
              ))
            }
          </AboutItems>
        </Plx>
        <AboutItems className="desktop-hidden">
          <Slider {...sliderSettings}>
            {categories.map((node, index) => (
                <AboutItem key={node.id} id={index} title={node.title} content={node.description} bg={node.background.file.url} slug={node.slug} />
              ))
            }
          </Slider>
        </AboutItems>
      </FrontLayer>
    </Section>
  )
}

class AboutItem extends React.Component {
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
  padding: 5rem 0 10rem 0;
  position: relative;

  .slick-arrow {
    position: absolute;
    top: auto;
    right: 0;
    left: auto;
    bottom: -8rem;
    width: 3.3rem;
    height: 3.3rem;
    background: ${COLORS.WHITE_10};
    border: 1px solid #fff;
    border-radius: 50%;

    &::before {
      font-family: 'icons';
      font-style: normal;
      font-weight: normal;
      line-height: 1;
      font-size: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -0.5em;
    }

    &.slick-next {
      &::before {
        content:'N';
      }
    }

    &.slick-prev {
      right: 5rem;
      &::before {
        content:'O';
      }
    }
  }

  .slick-dots {
    bottom: -7rem;
    width: auto;

    li {
      width: auto;
      
      button {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 1px;
        background: #fff;
        opacity: 0.3;
        padding: 0;
        transition: all 400ms ease;
        &::before {
          display: none;
        }
      }

      &.slick-active {
        button {
          opacity: 1;
          width: 80px;
        }
      }
    }
  }

  @media screen and (min-width: 1280px) and (pointer: fine) {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    top: 35rem;
    right: 15vw;
    padding: 0;

    > * {
      position: relative;
      &:nth-child(even) {
        top: 20rem;
      }
    }
  }
`

const AboutItemStyled = styled.div`
  position: relative;
  width: 100%;
  height: 41.2rem;
  padding: 5rem 4rem;
  cursor: none;
  background-image: url(${aboutItemMask});
  background-size: 100% 100%;

  ${Title}, ${TextStyled} {
    color: #fff;
    transition: color 500ms ease;
  }

  .is-ul-red ul li::before {
    background: #fff;
    transition: background 500ms ease;
  }

  &:hover {
    background-image: url(${aboutItemMaskHover});
    
    ${Title}, ${TextStyled} {
      color: ${COLORS.BLACK};
    }

    .is-ul-red ul li::before {
      background: ${COLORS.RED};
    }
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

  @media screen and (min-width: 1280px) and (pointer: fine) {
    width: 30rem;
    height: auto;
    margin: 0 5rem 5rem 0;
  }
`

const AboutTitle = styled.div`
  margin: 13rem 0 6rem 0;

  @media screen and (min-width: 1280px) and (pointer: fine) {
    position: absolute;
    left: 20rem;
    top: 35rem;
    z-index: 1;
    margin: 0;
  }
`

export default SectionAbout