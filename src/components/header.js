import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "styled-components"

import { FirebaseContext } from "./Firebase"

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  color: white;

  p {
    margin-bottom: 0;
  }

  a {
    color: white;
  }
`

const Divider = styled.span`
  margin: 0 0.5rem;
  width: 2px;
  height: 15px;
  display: block;
  background-color: #ddd;
`

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext)

  function handleLogout() {
    firebase.logout().then(() => navigate("/login"))
  }
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          justifyContent: `space-between`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <UserInfo>
          {!!user && !!user.email && (
            <div>
              <p>Hi there, {user.username || user.email}</p>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {(!user || !user.email) && (
            <>
              <Link to="/login">Log In</Link>
              <Divider></Divider>
              <Link to="/register">Register</Link>
            </>
          )}
        </UserInfo>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
