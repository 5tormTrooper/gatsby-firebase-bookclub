import styled from "styled-components"
import { lighten } from "polished"

const ErrorMessage = styled.span`
  color: crimson;
  border: 1px solid crimson;
  background-color: ${lighten(0.45, "crimson")};
  display: block;
  padding: 0.5em;
  margin: 1rem 0;
`

export { ErrorMessage }
