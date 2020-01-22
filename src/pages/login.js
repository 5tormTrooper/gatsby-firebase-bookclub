import React, { useState, useContext } from "react"
import { navigate } from "gatsby"

import FirebaseContext from "../components/Firebase/context"
import { Form, Input, Button, ErrorMessage } from "../components/common"

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { firebase } = useContext(FirebaseContext)

  const handleChange = e => {
    e.persist()
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault()
    firebase
      .login({ email: formValues.email, password: formValues.password })
      .then(() => navigate("/"))
      .catch(err => {
        setLoading(false)
        setErrorMessage(err.message)
      })
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          name="email"
          placeholder="email"
          type="email"
          tabIndex="1"
          required
        />
        <Input
          onChange={handleChange}
          name="password"
          placeholder="password"
          type="password"
          tabIndex="2"
          required
        />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button disabled={loading} type="submit" tabIndex="3" block>
          {loading ? "loading..." : "Log in"}
        </Button>
      </Form>
    </section>
  )
}

export default LoginPage
