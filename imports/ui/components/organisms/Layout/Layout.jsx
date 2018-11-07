import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../molecules/Header'
import './Layout.css'

const Layout = ({ children }) => (
  <div className="appLayout">
    <Header />
    <div className="appLayout__content">{children}</div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
