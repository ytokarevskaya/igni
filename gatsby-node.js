/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const results = await graphql(`
    {
      allContentfulProject {
		    edges {
		      node {
			      category {
			        slug
			      }
		      	id
		        slug
		      }
		    }
		  }
    }
  `)
  results.data.allContentfulProject.edges.forEach((edge, index) => {
	    const project = edge.node;
	    let template = "project-design";
	    if (project.category.slug === "digital") {
	    	template = "project-digital";
	    }
	    createPage({
	      path: `/portfolio/${project.category.slug}/${project.slug}/`,
	      component: path.resolve("./src/templates/" + template + ".js"),
	      context: {
	        id: project.id,
	      },
	    })
  })
}