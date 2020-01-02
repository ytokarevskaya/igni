import { useStaticQuery, graphql } from "gatsby"

export const useProjectsData = () => {
  const { allContentfulProject } = useStaticQuery(
    graphql`
      query {
        allContentfulProject(sort: {fields: date, order: DESC}) {
          totalCount
          edges {
            node {
              backgroundColor
              backgroundImg {
                file {
                  url
                }
              }
              backgroundMode
              backgroundSize
              date
              description {
                json
              }
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