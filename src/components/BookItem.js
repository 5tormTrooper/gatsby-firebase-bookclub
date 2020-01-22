import React from "react"
import styled from "styled-components"
import truncate from "lodash/truncate"
import Img from "gatsby-image"

const BookItemWrapper = styled.section`
  margin-bottom: 4rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 150px 1fr;

  h2 small {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-weight: normal;
  }

  a {
    font-size: 0.85rem;
    background-color: rebeccapurple;
    color: white;
    text-decoration: none;
    padding: 0.5em 0.75em;
    border-radius: 0.25em;
  }
`

const BookItem = ({
  title,
  author,
  summary,
  cover,
  truncateText,
  children,
}) => (
  <BookItemWrapper>
    <Img fixed={cover} />
    <div>
      <h2>
        {title} <small>{author}</small>
      </h2>
      <p>{truncateText ? truncate(summary, { length: 200 }) : summary}</p>
      {children}
    </div>
  </BookItemWrapper>
)

export default BookItem
