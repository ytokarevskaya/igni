import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import logoWhite from "../images/logo-white.svg"

const Header = ({ siteTitle }) => (
  <HeaderStyled>
    <Logo>
      <img src={logoWhite} alt="IGNI Logo" />
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
  </HeaderStyled>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

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

const Logo = styled.div`
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
  }
`

const HeaderStyled = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`

export default Header
