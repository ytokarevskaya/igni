import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SectionMain from "../components/sections/main"
import SectionAbout from "../components/sections/about"
import SectionPortfolio from "../components/sections/portfolio"
import SectionContacts from "../components/sections/contacts"

import { ScrollFrame } from "../components/styled"
import { getURLParameter } from "../components/utils"

const activeSection = +getURLParameter("active") || 0;

const IndexPage = () => (
  <Layout page="home">
    <SEO title="IGNI | Веб-студия полного цикла" />
    <ScrollFrame>
      <SectionMain id={0} active={activeSection === 0} />
      <SectionAbout id={1} active={activeSection === 1} />
      <SectionPortfolio id={2} active={activeSection === 2} />
      <SectionContacts id={3} active={activeSection === 3} />
    </ScrollFrame>
  </Layout>
)

export default IndexPage