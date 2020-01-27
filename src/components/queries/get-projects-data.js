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
              category {
                slug
                title
              }
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
              slug
              subcategory
              theme
              videoFile {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `
  )
  return allContentfulProject
}