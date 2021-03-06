import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { COLORS, Title } from "./styled"
import { checkScroll } from "../pages/index"

import logoLight from "../images/logo-light.svg"
import logoWhite from "../images/logo-white.svg"
import logo from "../images/logo.svg"
import videoSrcMP4 from "../video/fire-1080p.mp4"
import videoSrcWEBM from "../video/fire-1080p.webm"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "headerStyle": "white",
      "menuOpened": false
    }
    this.menuCursor = React.createRef();

    if (typeof window !== "undefined") window.headerObj = this;
  }

  cursorFollow(e) {
    const cursor = this.menuCursor.current;
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  }

  menuToggle(e) {
    this.setState({"menuOpened": !this.state.menuOpened});
  }

  render() {
    let logoSrc = logo;
    if (this.state.headerStyle === "white") {
      logoSrc = logoWhite;
    } else if (this.state.headerStyle === "light") {
      logoSrc = logoLight;
    } 
    return (
      <HeaderStyled className={this.state.headerStyle}>
        <a href="/">
          <Logo>
            <img src={logoSrc} className="transition-05s" alt="IGNI Logo" />
          </Logo>
        </a>
        <MainMenu className={this.state.menuOpened? "opened" : ""}>
          <BgVideo>
            <video autoPlay={true} className="translate-xy" loop={true}>
              <source src={videoSrcWEBM} type='video/webm; codecs="vp8, vorbis"' />
              <source src={videoSrcMP4} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            </video>
          </BgVideo>
          <MenuList>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Главная</Title>
              <a className="menu-link" href="/?active=1">Услуги</a>
              <a className="menu-link" href="/?active=2">Общее портфолио</a>
              <a className="menu-link" href="/?active=3">Аналитика</a>
              <a className="menu-link" href="/?active=4">Контакты</a>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Дизайн</Title>
              <a className="menu-link" href="/portfolio/design/">Портфолио</a>
              <a className="menu-link" href="/portfolio/design/?scrollto=statistics">Статистика</a>
              <a className="menu-link" href="/portfolio/design/?scrollto=contacts">Контакты</a>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Контент</Title>
              <a className="menu-link" href="/portfolio/content/">Портфолио</a>
              <a className="menu-link" href="/portfolio/content/?scrollto=statistics">Статистика</a>
              <a className="menu-link" href="/portfolio/content/?scrollto=contacts">Контакты</a>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Маркетинг</Title>
              <a className="menu-link" href="/portfolio/marketing/">Портфолио</a>
              <div className="menu-link">Статистика</div>
              <div className="menu-link">Контакты</div>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Продакшн</Title>
              <a className="menu-link" href="/portfolio/digital/">Портфолио</a>
              <a className="menu-link" href="/portfolio/digital/?scrollto=statistics">Статистика</a>
              <a className="menu-link" href="/portfolio/digital/?scrollto=contacts">Контакты</a>
            </div>
          </MenuList>
        </MainMenu>
        <MenuBtn onClick={(e) => this.menuToggle(e)} className={(this.state.menuOpened? "opened" : "") + " " + this.props.menuBtnStyle}>
          <div className="burger translate-x">
            <div className="n1 translate-xy transition-05s" />
            <div className="n2 translate-xy transition-05s" />
            <div className="n3 translate-xy transition-05s" />
          </div>
          <div className="title">Меню</div>
        </MenuBtn>
        {this.props.page === "home"?
          <SideMenu id="side-menu" className="mobile-hidden">
            <div className="item" data-id="0" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Главная</span>
            </div> 
            <div className="item" data-id="1" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Услуги</span>
            </div> 
            <div className="item" data-id="2" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Портфолио</span>
            </div>
            <div className="item" data-id="3" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Оценка сайта</span>
            </div> 
            <div className="item" data-id="4" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Контакты</span>
            </div> 
          </SideMenu>
        : ""}
      </HeaderStyled>
    )
  }
}

const MenuList = styled.div`
  display: flex;
  position: absolute;
  left: 20rem;
  right: 20rem;
  top: 55%;
  transform: translateY(-50%);
  justify-content: space-between;

  .column {
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  ${Title} {
    margin-bottom: 1.8rem;
  }

  .menu-link {
    position: relative;
    display: block;
    text-decoration: none;
    padding: 1.5rem 0 1.5rem 2.5rem;
    font-size: 1.6rem;
    font-weight: 500;
    &::before {
      content: '';
      display: block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -1.5px;
      opacity: 0;
      transition: opacity 300ms ease;
    }

    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }
`

const BgVideo = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    filter: blur(5px) brightness(0.85);

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0; 
      top: 0;
    }
  }
`

const MainMenu = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  cursor: none;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 800ms ease;
  background: ${COLORS.BG_GREY};
  z-index: 1;

  &.opened {
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  }
`

function sideMenuClick(e) {
  const menu = document.getElementById("side-menu");
  const targetId = e.currentTarget.dataset.id;
  const targetSection = document.querySelector("section[data-id='" + targetId + "']");

  menu.querySelector(".active").classList.remove("active");
  menu.children[targetId].classList.add("active");
  targetSection.scrollIntoView({behavior: "smooth", block: "end"});
  setTimeout(() => { checkScroll(); }, 500);
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const HeaderStyled = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`

const SideMenu = styled.aside`
  position: fixed;
  right: 7rem;
  top: 25rem;

  .item {
    position: relative;
    padding: 0 2.2rem;
    margin: 2.6rem 0;
    cursor: pointer;

    span {
      font-size: 1.6rem;
      color: #fff;
    }

    .line {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0.8px;
      height: 0;
      background: #fff;
      transition: height 500ms ease;
    }

    &.active, &:hover {
      .line {
        height: 4.7rem;
      }
    }
  }

  ${HeaderStyled}.dark & {
    .item {
      .line {
        background: ${COLORS.BLACK};
      }
      
      span {
        color: ${COLORS.BLACK};
      }
    }
  }
`

const MenuBtn = styled.div`
  position: absolute;
  top: 0;
  right: 2.5rem;
  width: 4rem;
  height: 8rem;
  background: #fff;
  cursor: pointer;
  z-index: 1;

  .burger {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    width: 1.8rem;
    height: 1.8rem;

    div {
      width: 1.8rem;
      height: 1px;
      background: rgba(151, 151, 151, 0.6);
      position: absolute;
      left: 50%;
      top: 50%;

      &.n1 {
        margin-top: -0.6rem;
      }

      &.n3 {
        margin-top: 0.6rem;
      }
    }
  }

  .title {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin: 0 0 -2.5rem -1.8rem;
    color: #fff;
    font-weight: 500;
    font-size: 1.3rem;
  }

  &.opened {
    .burger div {
      &.n1 {
        transform: rotate(45deg);
        margin: -0.1rem 0 0 -1.1rem;
      }

      &.n2 {
        opacity: 0;
      }

      &.n3 {
        transform: rotate(-45deg);
        margin: -0.1rem 0 0 -1.1rem;
      }
    }
  }

  ${HeaderStyled}.dark & {
    background: ${COLORS.BLACK};

    .burger div {
      background: #fff;
    }

    .title {
      color: ${COLORS.GREY};
    }
  }

  ${HeaderStyled}.white & {
    .burger div {
      // background: ${COLORS.BLACK};
    }
  }

  &.right-corner {
    width: 10rem;
    height: 10rem;
    right: 0;
    left: auto;

    .burger {
      bottom: auto;
      top: 50%;
    }

    .title {
      display: none;
    }
  }

  @media screen and (min-width: 1280px) and (pointer: fine) {
    width: 5.5rem;
    height: 10.5rem;
    right: auto;
    left: 30%;

    .burger {
      bottom: 2.6rem;
      width: 2.3rem;
      height: 2.3rem;

      div {
        width: 2.3rem;
        &.n1 {
          margin-top: -0.9rem;
        }

        &.n3 {
          margin-top: 0.85rem;
        }
      }
    }

    .title {
      left: 100%;
      bottom: 1.3rem;
      font-size: 1.6rem;
      margin: 0 0 0 3rem;
    }
  }
`

const Logo = styled.div`
  display: block;
  position: absolute;
  left: 2.5rem;
  top: 2.5rem;
  z-index: 30;

  img {
    width: 4rem;
    height: auto;
    max-width: unset;
  }

  ${HeaderStyled}.white & {
    img.white {
      position: relative;
      opacity: 1;
      visibility: visible;
    }

    img.dark {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
  }

  ${HeaderStyled}.dark & {
    img.dark {
      position: relative;
      opacity: 1;
      visibility: visible;
    }

    img.white {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
  }

  @media screen and (min-width: 1280px) and (pointer: fine) {
    left: 7rem;
    top: 3vh;

    img {
      width: 7rem;
    }
  }
`
export default Header
