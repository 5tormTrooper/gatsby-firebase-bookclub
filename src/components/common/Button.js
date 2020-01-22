import styled from "styled-components"
import { lighten } from "polished"

export const Button = styled.button`
  font-size: 0.85rem;
  background-color: rebeccapurple;
  color: white;
  text-decoration: none;
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
  cursor: pointer;
  ${props => (props.block ? "display: block; width: 100%;" : "")}

  &:hover, &:focus {
    background-color: indigo;
    outline: none;
  }

  &:disabled {
    background-color: ${lighten(0.2, "rebeccapurple")};
  }
`
