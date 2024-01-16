/* -- Byimaan -- */

import React from "react";
import './style.scss';

function ContentWrapper({children}) {
  return (
    <div className="contentWrapper">
      {children}
    </div>
  )
}

export default ContentWrapper
