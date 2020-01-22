import React, { useState, useContext } from "react"

import { FirebaseContext } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage } from "../components/common"

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { firebase } = useContext(FirebaseContext)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    if (formValues.password === formValues.confirmPassword) {
      firebase
        .register({
          email: formValues.email,
          password: formValues.password,
          username: formValues.username,
        })
        .catch(err => {
          setLoading(false)
          setErrorMessage(err.message)
        })
    } else {
      setLoading(false)
      setErrorMessage("Password and confirm password must match")
    }
  }

  function handleChange(e) {
    e.persist()
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        required
        value={formValues.email}
        name="email"
        type="email"
        placeholder="email"
      ></Input>
      <Input
        onChange={handleChange}
        value={formValues.username}
        name="username"
        type="text"
        placeholder="username"
      ></Input>
      <Input
        onChange={handleChange}
        required
        value={formValues.password}
        name="password"
        type="password"
        placeholder="password"
        minLength={6}
      ></Input>
      <Input
        onChange={handleChange}
        required
        value={formValues.confirmPassword}
        name="confirmPassword"
        type="password"
        placeholder="confirm password"
        minLength={6}
      ></Input>
      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button disabled={loading} block type="submit">
        {loading ? "loading..." : "Register"}
      </Button>
    </Form>
  )
}

export default RegisterPage
