import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import SectionPortfolio from "../../components/sections/portfolio"

import { BackLayer, FrontLayer, BgVideo } from "../../components/styled"

import videoSrcMP4 from "../../video/fire-1080p.mp4"
import videoSrcWEBM from "../../video/fire-1080p.webm"

const PortfolioPage = () => (
  <Layout page="portfolio">
    <SEO title="IGNI | Веб-студия полного цикла" />
    <BackLayer>
      <BgVideo>
        <video id="bg-video" autoPlay={true} className="translate-xy" loop={true}>
          <source src={videoSrcWEBM} type='video/webm; codecs="vp8, vorbis"' />
          <source src={videoSrcMP4} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
        </video>
      </BgVideo>
    </BackLayer>
    <FrontLayer bg="rgba(120, 136, 145, 0.1)">
      <SectionPortfolio id={0} active={true} />
    </FrontLayer>
  </Layout>
)

export default PortfolioPage