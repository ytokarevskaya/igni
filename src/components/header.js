import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { COLORS, CursorBtn, Title } from "./styled"
import { changeSection } from "./section"

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
        <Logo href="/">
          <img src={logoSrc} className="transition-05s" alt="IGNI Logo" />
          <h1>Веб-студия полного цикла</h1>
        </Logo>
        <MainMenu className={this.state.menuOpened? "opened" : ""} onMouseMove={(e) => this.cursorFollow(e)}>
          <BgVideo>
            <video autoPlay={true} className="translate-xy" loop={true}>
              <source src={videoSrcWEBM} type='video/webm; codecs="vp8, vorbis"' />
              <source src={videoSrcMP4} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            </video>
          </BgVideo>
          <MenuList>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Главная</Title>
              <div className="menu-link">Услуги</div>
              <div className="menu-link">Общее портфолио</div>
              <div className="menu-link">Аналитика</div>
              <div className="menu-link">Контакты</div>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Дизайн</Title>
              <div className="menu-link">Порфтолио</div>
              <div className="menu-link">Статистика</div>
              <div className="menu-link">Контакты</div>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Контент</Title>
              <div className="menu-link">Порфтолио</div>
              <div className="menu-link">Статистика</div>
              <div className="menu-link">Контакты</div>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Маркетинг</Title>
              <div className="menu-link">Порфтолио</div>
              <div className="menu-link">Статистика</div>
              <div className="menu-link">Контакты</div>
            </div>
            <div className="column transition-05s">
              <Title color="#fff" fz="5rem" lineBottom lineWidth="3.5rem">Продакшн</Title>
              <div className="menu-link">Порфтолио</div>
              <div className="menu-link">Статистика</div>
              <div className="menu-link">Контакты</div>
            </div>
          </MenuList>
          <CursorBtn ref={this.menuCursor} className={this.state.menuOpened? "visible" : ""} />
        </MainMenu>
        <MenuFrame>
          <OrderBtn>
            <div className="icon icon-pen" />
            <div className="title">Оставить заявку</div>
          </OrderBtn>
          <MenuBtn onClick={(e) => this.menuToggle(e)} className={this.state.menuOpened? "opened" : ""}>
            <div className="n1 translate-xy transition-05s" />
            <div className="n2 translate-xy transition-05s" />
            <div className="n3 translate-xy transition-05s" />
          </MenuBtn>
        </MenuFrame>
        {this.props.page === "home"?
          <SideMenu id="side-menu" className="translate-y">
            <div className="item open-slide active" data-id="0" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Главная</span>
            </div> 
            <div className="item open-slide" data-id="1" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Услуги</span>
            </div> 
            <div className="item open-slide" data-id="2" onClick={sideMenuClick}>
              <div className="line transition-05s" />
              <span>Портфолио</span>
            </div>
            <div className="item open-slide" data-id="3" onClick={sideMenuClick}>
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

  &.opened {
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  }
`

function sideMenuClick(e) {
  const curId = document.querySelector('#side-menu .active').dataset.id;
  const newId = e.currentTarget.dataset.id;
  changeSection(curId, newId);
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
  top: 50%;

  .item {
    position: relative;
    padding: 0 1rem;
    margin: 1rem 0;
    cursor: pointer;

    span {
      position: absolute;
      right: 100%;
      top: 50%;
      margin-right: 1.5rem;
      font-size: 1.6rem;;
      color: #fff;
      opacity: 0;
      visibility: hidden;
      transition: opacity 500ms ease;
      transform: translate(0, -50%);
    }

    &.active, &:hover {
      .line {
        height: 4rem;
      }
    }

    &:hover {
      span {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .line {
    width: 3px;
    height: 3px;
    background: #fff;
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

const OrderBtn = styled.div`
  position: relative;
  height: 10rem;
  background: #de5650;
  cursor: pointer;
  padding: 3rem;

  .icon {
    position: relative;
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
    background: #fff;
    color: #de5650;
    font-size: 1.5rem;
    display: inline-block;
    vertical-align: middle;

    &::before {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -0.5em;
    }
  }

  .title {
    font-size: 1.6rem;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    margin-left: 2rem;
  }
`

const MenuBtn = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  background: #fff;
  cursor: pointer;

  > div {
    width: 2.3rem;
    height: 0.25rem;
    background: rgba(151, 151, 151, 0.6);
    position: absolute;
    left: 50%;
    top: 50%;

    &.n1 {
      margin-top: -0.9rem;
    }

    &.n3 {
      margin-top: 0.85rem;
    }
  }

  &.opened {
    > div {
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

    > div {
      background: #fff;
    }
  }
`

const MenuFrame = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
`

const Logo = styled.a`
  display: block;
  position: absolute;
  left: 7rem;
  top: 3vh;
  z-index: 30;

  img {
    width: 7rem;
    height: auto;
    max-width: unset;
  }

  h1 {
    font-family: 'Bebas';
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 1.13;
    color: #fff;
    text-transform: uppercase;
    width: 12rem;
    margin: 6.5rem 0 0 0;
    opacity: 0;
    visibility: hidden;
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

  ${HeaderStyled}.scetion-main & {
    h1 {
      opacity: 1;
      visibility: visible;
    }
  }
`
export default Header
