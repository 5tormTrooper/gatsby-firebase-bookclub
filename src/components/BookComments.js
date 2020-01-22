import React, { useEffect, useState } from "react"
import styled from "styled-components"
import moment from "moment"

import { Input, Button } from "./common"

const CommentForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 16px;
  margin-top: 32px;

  ${Input} {
    margin-bottom: 0;
  }
`

const Comment = styled.div`
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;

  p {
    margin-bottom: 0;
  }

  strong {
    font-size: 0.8rem;
    color: #666;
  }
`

const BookComments = ({ firebase, bookId }) => {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: snapshot => {
        const snapshotComments = []
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setComments(snapshotComments)
      },
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const handleCommentFormSubmit = e => {
    e.preventDefault()
    setCommentText("")
    firebase.postComment({ bookId, text: commentText })
  }

  return (
    <div>
      <CommentForm onSubmit={handleCommentFormSubmit}>
        <Input
          value={commentText}
          onChange={e => {
            e.persist()
            setCommentText(e.target.value)
          }}
          type="text"
          placeholder="Add your two cents"
        ></Input>
        <Button type="submit">Post comment</Button>
      </CommentForm>
      {comments.map(comment => (
        <Comment key={comment.id}>
          <p>
            <strong>{comment.username}</strong> -{" "}
            {moment(comment.dateCreated.toDate()).format("HH:mm Do MMM YYYY")}
            <br />
            {comment.text}
          </p>
        </Comment>
      ))}
    </div>
  )
}

export default BookComments
