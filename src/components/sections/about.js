import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Section from "../section"
import ScrollMenu from "../scroll-menu"

import { COLORS, BackLayer, FrontLayer, Title, TextStyled, PulseBtn, SectionScroll } from "../styled"

import fireSrc from "../../images/fire.svg"

class AboutItem extends React.Component {
  constructor(props) {
    super(props);
    this.redBtn = React.createRef();
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
      <AboutItemStyled className="transition-05s item" data-id={this.props.id}>
        <Title color={COLORS.BLACK}>{this.props.title}</Title>
        <div dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.content.json)}} />
        <RedBtn ref={this.redBtn} />
      </AboutItemStyled>
    )
  }
}

const RedBtn = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  background: ${COLORS.RED};
  position: absolute;
  left: 3.5rem;
  bottom: 3.5rem;

  &::before {
    content: '+';
    color: #fff;
    font-size: 1.6rem;
    display: block;
    width: 100%;
    line-height: 2.3rem;
    text-align: center;
  }
`

const SectionAbout = (props) => (
  <Section id={props.id} active={props.active} name="section-about" headerStyle="dark" footerStyle="dark">
    <BackLayer bg="#f6f7f9">
      <img src={fireSrc} alt="" style={{"display": "block", "width": "38%", "margin": "13rem auto"}} />
    </BackLayer>
    <FrontLayer >
      <AboutTitle>
        <Title fz="5rem" color={COLORS.BLACK} width="30rem">Проектируем, разрабатываем, продвигаем – наши <span className="red">услуги</span></Title>
        <TextStyled width="42rem" color={COLORS.BLACK}>Чтобы осветить темное пространство веба новыми проектами, мы собрали команду профессионалов с обширным опытом работы в сфере дизайна, разработки, маркетинга, рекламы и видео производства.</TextStyled>
      </AboutTitle>
      <SectionScroll id="about-scroll" data-pos="0" className="transition-05s section-scroll">
        <StaticQuery
          query={graphql`
            {
              allContentfulAboutItem {
                edges {
                  node {
                    id
                    title
                    description {
                      json
                    }
                  }
                }
              }
            }
          `}
          render={({
            allContentfulAboutItem: {
              edges
            }
          }) => (
            edges.map(({ node }) => (
              <AboutItem key={node.id} id={node.id} title={node.title} content={node.description} />
            ))
          )}
        />
      </SectionScroll>
      <ScrollMenu scrollId="about-scroll" items={["Дизайн", "Аналитика", "Performance-маркетинг", "Контент"]} />
    </FrontLayer>
  </Section>
)

const AboutItemStyled = styled.div`
  position: relative;
  color: ${COLORS.BLACK};
  width: 30rem;
  padding: 3.5rem 3.5rem 7rem 3.5rem;
  border-radius: 25px;
  cursor: none;

  &:hover {
    background: #fff;
    box-shadow: 0 4px 15px -5px rgba(0, 0, 0, 0.35);
  }

  ${Title} {
    font-size: 2.6rem;
    margin-bottom: 4rem;
  }

  ul {
    font-size: 1.5rem;
    list-style: none;
    margin-left: 0;

    li {
      position: relative;
      padding-left: 2rem;
      margin: 2.5rem 0;

      &::before {
        content: '';
        display: block;
        width: 0.7rem;
        height: 0.7rem;
        background: ${COLORS.RED};
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.35rem;
        transform: rotate(45deg);
      }
    }
  }
`

const AboutTitle = styled.div`
  position: absolute;
  left: 24rem;
  top: 10rem;
  z-index: 1;

  ${Title} {
    position: relative;
    padding-bottom: 4rem;

    &::before {
      content: '';
      display: block;
      width: 7rem;
      height: 5px;
      background: ${COLORS.BLACK};
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  ${TextStyled} {
    padding-top: 4rem;
  }
`

export default SectionAbout