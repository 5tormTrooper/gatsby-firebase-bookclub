import styled from "styled-components"

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  border: 2px solid #ddd;
  border-radius: 0.25em;

  &:focus,
  &:active {
    border-color: rebeccapurple;
    outline: none;
  }
`
