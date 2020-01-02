import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import SectionPortfolio from "../../components/sections/portfolio"

import { ScrollFrame } from "../../components/styled"

const PortfolioPage = () => (
  <Layout page="portfolio">
    <SEO title="IGNI | Веб-студия полного цикла" />
    <ScrollFrame>
      <SectionPortfolio id={0} active={true} />
    </ScrollFrame>
  </Layout>
)

export default PortfolioPage