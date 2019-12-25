import { useStaticQuery, graphql } from "gatsby"

export const useProjectsData = () => {
  const { allContentfulProject } = useStaticQuery(
    graphql`
      query {
        allContentfulProject {
          totalCount
          edges {
            node {
              backgroundColor
              date
              id
              logo {
                file {
                  url
                }
              }
              preview {
                file {
                  url
                }
              }
              projectSubtitle
              projectTitle
              subcategory
              category {
                title
              }
              theme
            }
          }
        }
      }
    `
  )
  return allContentfulProject
}