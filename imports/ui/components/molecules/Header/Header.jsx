import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => (
  <div className="appHeader">
    <Link className="appLogo" to="/">Trello</Link>
  </div>
)

export default Header
