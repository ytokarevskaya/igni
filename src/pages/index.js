import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SectionMain from "../components/sections/main"
import SectionAbout from "../components/sections/about"
import SectionPortfolio from "../components/sections/portfolio"
import SectionEstimation from "../components/sections/estimation"
import SectionContacts from "../components/sections/contacts"
import ScrollController from "../components/scroll-controller"

import { getURLParameter } from "../components/utils"
import { BackLayer, FrontLayer } from "../components/styled"

import videoSrcMP4 from "../video/fire-1080p.mp4"
import videoSrcWEBM from "../video/fire-1080p.webm"

const activeSection = +getURLParameter("active") || 0;

function scrollController(e) {
  // const video = document.getElementById("bg-video");
  // if (document.documentElement.scrollTop > window.innerHeight * 0.8) {
  //   video.pause();
  //   video.parentElement.classList.add("is-blurred");
  // } else {
  //   const video = document.getElementById("bg-video");
  //   video.play();
  //   video.parentElement.classList.remove("is-blurred");
  // }
  // debugger;
  if (document.documentElement.scrollTop >= document.body.offsetHeight - window.innerHeight * 1.2) {
    document.getElementById("footer-scroll-help").classList.add("is-hidden");
    document.getElementById("footer-callback-btn").classList.add("is-hidden");
  } else {
    document.getElementById("footer-scroll-help").classList.remove("is-hidden");
    document.getElementById("footer-callback-btn").classList.remove("is-hidden");
  }
}

const IndexPage = () => (
  <Layout page="home">
    <SEO title="IGNI | Веб-студия полного цикла" />
    <BackLayer>
      <BgVideo>
        <video id="bg-video" autoPlay={true} className="translate-xy" loop={true}>
          <source src={videoSrcWEBM} type='video/webm; codecs="vp8, vorbis"' />
          <source src={videoSrcMP4} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
        </video>
      </BgVideo>
    </BackLayer>
    <FrontLayer bg="linear-gradient(155deg,rgba(255,255,255,0.5) 22%,rgba(0, 0, 0, 0.1) 58%),linear-gradient(to bottom,rgba(42,35,42,0.15),rgba(42,35,42,0.15))" onWheel={scrollController}>
      <SectionMain id={0} active={activeSection === 0} />
      <SectionAbout id={1} active={activeSection === 1} />
      <SectionPortfolio id={2} active={activeSection === 2} />
      <SectionEstimation id={3} active={activeSection === 3} />
      <SectionContacts id={4} active={activeSection === 4} />
    </FrontLayer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
  </Layout>
)

const BgVideo = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
		background: transparent;
		transition: background 500ms ease;
		pointer-events: none;
	}

  &.is-blurred {
  	filter: blur(5px);
  	&::before {
  		background: rgba(5, 11, 31, 0.25);
  	}
  }

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
  }
`

export default IndexPage