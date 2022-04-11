import "./avatar.styles.css"

import React from 'react'

export default function Avatar({photoURL}) {
  return (
    <div className="avatar">
        <img src={photoURL} alt="profile pic" />
    </div>
  )
}
