import React from 'react'
import ScrollUp from '../scroll-up'
import './footer.css'

export default () => (
  <footer className="text-muted fixed-bottom">
    <div className="container flex-v-center">
      <span className="footer-text">
        Find In Common is made and maintained by &copy; Darius Rainys 2019
      </span>
      <span className="float-right">
        <ScrollUp />
      </span>
    </div>
  </footer>
)
