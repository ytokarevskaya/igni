import { useStaticQuery, graphql } from "gatsby"

export const useCategoriesData = () => {
  const { allContentfulAboutItem } = useStaticQuery(
    graphql`
      query {
        allContentfulAboutItem(sort: {fields: slug, order: ASC}) {
          edges {
            node {
              background {
                file {
                  url
                }
              }
              id
              title
              description {
                json
              }
              slug
            }
          }
        }
      }
    `
  )
  return allContentfulAboutItem
}