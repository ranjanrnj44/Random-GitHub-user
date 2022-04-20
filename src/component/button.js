import React from "react";

function Button({ isActive, clicked }) {
  return (
    <div>
      <button type="button" onClick={clicked} style={{ width: "100%" }}>
        {isActive ? "Get Another User" : "random user"}
      </button>
    </div>
  );
}

export default Button;
