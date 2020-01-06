import React from "react"
import styled from "styled-components"
import { Link, StaticQuery, graphql } from "gatsby"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

import Section from "../section"
import Scroll from "../scroll"
import { useCategoriesData } from "../queries/get-categories-data"

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
      <Link to={"/portfolio/" + this.props.slug}>
        <AboutItemStyled className="transition-05s load-ani unload-ani item" data-id={this.props.id} bgImg={this.props.bg} data-loaddelay={1400} data-unloaddelay={400}>
          <div className="bg transition-05s" />
          <Title color={COLORS.BLACK}>{this.props.title}</Title>
          <div>
            <TextStyled color={COLORS.BLACK} lh="1.15" className="is-ul-red" dangerouslySetInnerHTML={{__html: documentToHtmlString(this.props.content? this.props.content.json : "")}} />
          </div>
          <RedBtn ref={this.redBtn} />
        </AboutItemStyled>
      </Link>
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

const SectionAbout = (props) => {
  const { edges } = useCategoriesData()
  const categories = [];
  const categoriesTitles = [];

  edges.map((item) => {
    const category = item.node;
    categories.push(category);
    categoriesTitles.push(category.title);
  });

  return (
    <Section id={props.id} active={props.active} name="section-about" headerStyle="dark" footerStyle="dark">
      <BackLayer bg="#f6f7f9">
        <img src={fireSrc} alt="" style={{"display": "block", "width": "38%", "margin": "13rem auto"}} className="load-ani unload-ani" data-loaddelay={200}  data-unloaddelay={1000} />
      </BackLayer>
      <FrontLayer>
        <AboutTitle className="load-ani unload-ani" data-loaddelay={800}  data-unloaddelay={0}>
          <Title fz="5rem" color={COLORS.BLACK} width="30rem">Проектируем, разрабатываем, продвигаем – наши <span className="red">услуги</span></Title>
          <TextStyled width="42rem" color={COLORS.BLACK}>Чтобы осветить темное пространство веба новыми проектами, мы собрали команду профессионалов с обширным опытом работы в сфере дизайна, разработки, маркетинга, рекламы и видео производства.</TextStyled>
        </AboutTitle>
        <Scroll overflowLimit={2.3} width="auto" pos={["absolute", "40%", "15%", "", ""]} menuItems={categoriesTitles}>
          {categories.map((node) => (
              <AboutItem key={node.id} id={node.id} title={node.title} content={node.description} bg={node.background.file.url} slug={node.slug} />
            ))
          }
          />
        </Scroll>
      </FrontLayer>
    </Section>
  )
}

const AboutItemStyled = styled.div`
  position: relative;
  color: ${COLORS.BLACK};
  width: 30rem;
  padding: 3.5rem 3.5rem 7rem 3.5rem;
  border-radius: 25px;
  cursor: none;

  &:hover {
    background-color: #fff;
    box-shadow: 0 4px 15px -5px rgba(0, 0, 0, 0.35);

    .bg {
      opacity: 1;
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
    background-size: contain;
    background-position: top right;
    background-repeat: no-repeat;
    background-image: ${props => "url(" + props.bgImg + ")" || "unset"};
    opacity: 0;
    border-radius: 25px;
  }

  ${Title} {
    font-size: 2.6rem;
    margin-bottom: 4rem;
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