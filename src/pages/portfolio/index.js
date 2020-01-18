import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import SectionPortfolio from "../../components/sections/portfolio"

const PortfolioPage = () => (
  <Layout page="portfolio">
    <SEO title="IGNI | Веб-студия полного цикла" />
      <SectionPortfolio id={0} active={true} />
  </Layout>
)

export default PortfolioPage