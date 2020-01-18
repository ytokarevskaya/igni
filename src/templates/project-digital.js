import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Scroll from "../components/scroll"
import Section from "../components/section"

import { useProjectsData } from "../components/queries/get-projects-data"
import { COLORS, FrontLayer, PortfolioBackBtn } from "../components/styled"

export const query = graphql`
  query($id: String!) {
    contentfulProject(id: { eq: $id }) {
      id
      videoLink
    }
  }
`

const VideoEmbed = styled.div`
	position: relative;
	padding: 56.25% 0 0 0;
`

const DigitalPage = ({ data }) => {
	const project = data.contentfulProject;

	return (
	  <Layout page="project">
	    <SEO title="IGNI | Веб-студия полного цикла" />
	    <Section id={0} active={true} name="section-project" headerStyle="white" footerStyle="white" noCursor>
	    	<FrontLayer bg={COLORS.BLACK}>
	    		<VideoEmbed>
	    			<iframe src={project.videoLink + "?autoplay=1&color=ffffff&title=0&byline=0&portrait=0"} style={{"position": "absolute", "top":0, "left": 0, "width": "100%", "height": "100%"}} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
	    			<script src="https://player.vimeo.com/api/player.js"></script>
	    		</VideoEmbed>
	    		<a href="/portfolio/digital"><PortfolioBackBtn transparent className="icon-arrow-bold translate-y" /></a>
	    	</FrontLayer>
	    </Section>
		</Layout>
	)
}

export default DigitalPage