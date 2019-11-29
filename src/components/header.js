import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { COLORS } from "./styled"
import { changeSection } from "./section"

import logoWhite from "../images/logo-white.svg"
import logo from "../images/logo.svg"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "headerStyle": "white"
    }

    if (typeof window !== "undefined") window.headerObj = this;
  }

  render() {
    return (
      <HeaderStyled className={this.state.headerStyle}>
        <Logo href="/">
          <img src={logoWhite} className="white transition-05s" alt="IGNI Logo" />
          <img src={logo} className="dark transition-05s" alt="IGNI Logo" />
          <h1>Веб-студия полного цикла</h1>
        </Logo>
        <MenuFrame>
          <OrderBtn>
            <div className="icon icon-pen" />
            <div className="title">Оставить заявку</div>
          </OrderBtn>
          <MenuBtn>
            <div className="n1 translate-xy" />
            <div className="n2 translate-xy" />
            <div className="n3 translate-xy" />
          </MenuBtn>
        </MenuFrame>
        <SideMenu id="side-menu" className="translate-y">
          <div className="item open-slide transition-05s active" data-id="0" onClick={sideMenuClick}><span>Главная</span></div> 
          <div className="item open-slide transition-05s" data-id="1" onClick={sideMenuClick}><span>Услуги</span></div> 
          <div className="item open-slide transition-05s" data-id="2" onClick={sideMenuClick}><span>Портфолио</span></div> 
        </SideMenu>
      </HeaderStyled>
    )
  }
}

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
    width: 3px;
    height: 3px;
    background: #fff;
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
      height: 4rem;
    }

    &:hover {
      span {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  ${HeaderStyled}.dark & {
    .item {
      background: ${COLORS.BLACK};

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
