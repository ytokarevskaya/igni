import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Lottie from "react-lottie"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import { onWindowResize, onPageLoad } from "./functions"
import { CursorBtn } from "./styled"

import * as preloaderData from "./preloader.json"
import "./layout.css"

class ContentLayout extends React.Component {
  componentWillMount() {
    if (typeof window === "undefined") return;
    onPageLoad();
    window.addEventListener("resize", onWindowResize);
  }

  render() {
    return this.props.content;
  }
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.cursor = React.createRef();
    this.state = {
      "cursorStyle": this.props.cursorStyle || "",
      "loaded": false,
      "preloaderShow": true
    }
  }

  componentDidMount() {
    // debugger;
    console.log(preloaderData);
    this.setState({"loaded": true});
    document.body.classList.add(this.props.page);
  }

  cursorFollow(e) {
    const cursor = this.cursor.current;
    if (e.target.classList.contains("full-project-link")) {
      this.setState({"cursorStyle": "cursor-plus"});
    } else if (e.target.classList.contains("full-video-link")) {
      this.setState({"cursorStyle": "cursor-play icon-play"});
    } else {
      this.setState({"cursorStyle": this.props.cursorStyle || ""});
    }
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }

  render() {
    const preloaderDefaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: preloaderData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      }
    }

    return (
      <SiteMain onMouseMove={(e) => this.cursorFollow(e)} className={this.state.loaded? "loaded" : ""}>
        <PreloaderCover className={this.state.loaded? "is-page-loaded" : ""}>
          <Lottie options={preloaderDefaultOptions} isStopped={false} isPaused={false} height="100vh" width="100vw" />
        </PreloaderCover>
        <Header page={this.props.page} menuBtnStyle={this.props.menuBtnStyle} />
        <ContentLayout content={this.props.children} />
        <Footer page={this.props.page} orderBtnStyle={this.props.orderBtnStyle} />
        {this.props.noCursor? "" : 
          <CursorBtn className={"cursor-btn translate-xy " + this.state.cursorStyle} ref={this.cursor} />
        }
      </SiteMain>
    )
  }
}

Layout.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cursorStyle: PropTypes.string,
  noCursor: PropTypes.bool,
  menuBtnStyle: PropTypes.string,
  orderBtnStyle: PropTypes.string
}

Layout.defaultProps = {
  noCursor: false,
  menuBtnStyle: "",
  orderBtnStyle: ""
}

const PreloaderCover = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 200;
  transition: opacity 800ms ease 2000ms;
  &.is-page-loaded {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`

const SiteMain = styled.main`
  overflow: hidden;

  .load-fadeIn {
    opacity: 0;
    transition: opacity 1000ms ease 2000ms;
  }

  &.loaded {
    .load-fadeIn {
      opacity: 1;
    }
  }
`

export default Layout
