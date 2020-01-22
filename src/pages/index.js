import React from "react"
import { Link, graphql } from "gatsby"

// import Image from "../components/image"
// import SEO from "../components/seo"
import BookItem from "../components/BookItem"

const IndexPage = props => {
  return (
    <section>
      {props.data.allBook.edges.map(({ node }) => (
        <BookItem
          key={node.id}
          title={node.title}
          author={node.author.name}
          summary={node.summary}
          cover={node.localImage.childImageSharp.fixed}
          truncateText={true}
        >
          <Link to={`/book/${node.id}`}>Join conversation</Link>
        </BookItem>
      ))}
    </section>
  )
}

export const query = graphql`
  {
    allBook {
      edges {
        node {
          id
          summary
          title
          localImage {
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          author {
            name
            id
          }
        }
      }
    }
  }
`

export default IndexPage
