import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import { onWindowResize, onPageLoad } from "./functions"
import { CursorBtn } from "./styled"
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
      "loaded": false
    }
  }

  componentDidMount() {
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
    // debugger;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }

  render() {
    return (
      <SiteMain onMouseMove={(e) => this.cursorFollow(e)} className={this.state.loaded? "loaded" : ""}>
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
