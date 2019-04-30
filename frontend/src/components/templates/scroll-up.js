import React from 'react'

export default () => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={() => window.scrollTo(0, 0)}
    >
      Back to top
    </button>
  )
}
