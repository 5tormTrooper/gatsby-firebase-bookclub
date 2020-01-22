import React, { useContext } from "react"
import { graphql } from "gatsby"

import BookItem from "../components/BookItem"
import BookComments from "../components/BookComments"
import FirebaseContext from "../components/Firebase/context"

const BookTemplate = ({ data: { book } }) => {
  const { firebase } = useContext(FirebaseContext)

  return (
    <section>
      <BookItem
        title={book.title}
        author={book.author.name}
        summary={book.summary}
        cover={book.localImage.childImageSharp.fixed}
      ></BookItem>
      {!!firebase && (
        <BookComments firebase={firebase} bookId={book.id}></BookComments>
      )}
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
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
`

export default BookTemplate
