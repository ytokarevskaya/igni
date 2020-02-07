import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Lottie from "react-lottie"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import { onWindowResize, onPageLoad } from "./functions"
import { getURLParameter } from "./utils"
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
    this.setState({"loaded": true});
    document.body.classList.add(this.props.page);
    checkScrollPos();
    setTimeout(() => {
      this.setState({"preloaderShow": false});
    }, 2000);
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

  onWheel() {
    const curPos = document.documentElement.scrollTop || window.pageYOffset;
    const pageHeight = document.body.offsetHeight;
    const footerScrollHelp = document.getElementById("footer-scroll-help");
    const footerOrderBtn = document.getElementById("footer-callback-btn");

    if (curPos >= pageHeight - window.innerHeight * 1.5) {
      if (footerScrollHelp) footerScrollHelp.classList.add("is-hidden");
      if (footerOrderBtn) footerOrderBtn.classList.add("is-hidden");
    } else {
      if (footerScrollHelp) footerScrollHelp.classList.remove("is-hidden");
      if (footerOrderBtn) footerOrderBtn.classList.remove("is-hidden");
    }
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
      <SiteMain onMouseMove={(e) => this.cursorFollow(e)} onWheel={this.onWheel} className={this.state.loaded? "loaded" : ""}>
        <PreloaderCover className={this.state.preloaderShow? "" : "hidden"}>
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

function checkScrollPos() {
  const scrollTo = getURLParameter("scrollto");
  if (scrollTo) {
    const scrollToElement = document.getElementById("scrollTo-" + scrollTo);
    if (scrollToElement) scrollToElement.scrollIntoView({behavior: "smooth", block: "start"});
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
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 200;
  transition: all 800ms ease;
  pointer-events: none;
  opacity: 1;
  visibility: visible;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
`

const SiteMain = styled.main`
  overflow: hidden;

  .load-fadeIn {
    opacity: 0;
    transition: opacity 1000ms ease 3000ms;
  }

  &.loaded {
    .load-fadeIn {
      opacity: 1;
    }
  }
`

export default Layout
