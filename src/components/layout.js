import React from "react"
import PropTypes from "prop-types"
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
      "cursorStyle": this.props.cursorStyle || ""
    }
  }

  cursorFollow(e) {
    const cursor = this.cursor.current;
    if (e.target.classList.contains("full-project-link")) {
      this.setState({"cursorStyle": "cursor-plus"});
    } else if (e.target.classList.contains("full-video-link")) {
      this.setState({"cursorStyle": "cursor-play icon-play"});
    } else {
      this.setState({"cursorStyle": ""});
    }
    // debugger;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }

  render() {
    return (
      <main onMouseMove={(e) => this.cursorFollow(e)} style={{"overflow": "hidden"}}>
        <Header page={this.props.page} />
        <ContentLayout content={this.props.children} />
        <Footer page={this.props.page} />
        {this.props.noCursor? "" : 
          <CursorBtn className={"cursor-btn translate-xy " + this.state.cursorStyle} ref={this.cursor} />
        }
      </main>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cursorStyle: PropTypes.string,
  noCursor: PropTypes.bool
}

Layout.defaultProps = {
  noCursor: false
}

export default Layout
