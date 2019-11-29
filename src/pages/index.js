import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SectionMain from "../components/sections/main"
import SectionAbout from "../components/sections/about"

import { COLORS, ScrollFrame, SectionStyled, BackLayer, FrontLayer, Title, TextStyled } from "../components/styled"

const IndexPage = () => (
  <Layout>
    <SEO title="IGNI | Веб-студия полного цикла" />
    <ScrollFrame>
      <SectionMain id={0} active={true} />
      <SectionAbout id={1} active={false} />
    </ScrollFrame>
  </Layout>
)

export default IndexPage

