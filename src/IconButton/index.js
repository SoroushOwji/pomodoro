import React from "react";

import './icon-button.scss';

export default function IconButton({ children, ...props }) {
  return(
    <button {...props} className="button">
      {children}
    </button>
  )
}
