import React from 'react'

// import Nav from './Nav'
import Footer from './Footer'

// import Header from './../Header/Header'

const Layout = props => (
  <div>

    {props.children}

    <Footer />
  </div>
)

export default Layout
