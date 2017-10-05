import React from 'react'

const Error = ({error, children}) =>
      error ? (
        <p className="error-msg">Error: {error}</p>
      ) : (
        <div>{children}</div>
      )

export default Error
