import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SectionMain from "../components/sections/main"
import SectionAbout from "../components/sections/about"
import SectionPortfolio from "../components/sections/portfolio"
import SectionEstimation from "../components/sections/estimation"
import SectionContacts from "../components/sections/contacts"
import ScrollController from "../components/scroll-controller"

import { getURLParameter } from "../components/utils"
import { BackLayer, FrontLayer, BgVideo } from "../components/styled"

import videoSrcMP4 from "../video/fire-1080p.mp4"
import videoSrcWEBM from "../video/fire-1080p.webm"

const activeSection = +getURLParameter("active") || 0;

function checkScroll() {
  const video = document.getElementById("bg-video");
  if (document.documentElement.scrollTop > window.innerHeight * 0.8) {
    video.pause();
    video.parentElement.classList.add("is-blurred");
  } else {
    const video = document.getElementById("bg-video");
    video.play();
    video.parentElement.classList.remove("is-blurred");
  }

  const curPos = document.documentElement.scrollTop;
  if (curPos >= window.sectionObjects[4].top * 0.8) {
    document.getElementById("footer-scroll-help").classList.add("is-hidden");
    document.getElementById("footer-callback-btn").classList.add("is-hidden");
  } else {
    document.getElementById("footer-scroll-help").classList.remove("is-hidden");
    document.getElementById("footer-callback-btn").classList.remove("is-hidden");
  }
  const menu = document.getElementById("side-menu");

  if (menu) {
    let activeIndex = 0;
    for (let i = 0; i < 5; i++) {
      const section = window.sectionObjects[i];
      if (section && curPos >= section.top * 0.9 && curPos < section.bottom) {
        activeIndex = i;
      }
    };
    menu.querySelector(".active").classList.remove("active");
    menu.children[activeIndex].classList.add("active");
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
    <FrontLayer bg="rgba(120, 136, 145, 0.1)" onWheel={checkScroll}>
      <SectionMain id={0} active={activeSection === 0} />
      <SectionAbout id={1} active={activeSection === 1} />
      <SectionPortfolio id={2} active={activeSection === 2} />
      <SectionEstimation id={3} active={activeSection === 3} />
      <SectionContacts id={4} active={activeSection === 4} />
    </FrontLayer>
  </Layout>
)

export default IndexPage

export { checkScroll }