import React from 'react'

const Loading = ({cond, children, message}) =>
      cond ? (
        <p>{message || "Loading..."}</p>
      ) : (
        <div>{children}</div>
      )

export default Loading
