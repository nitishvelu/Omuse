import React from "react";
import { withProtected } from "../src/hook/route";

function Logout({ auth }) {
  const { logout } = auth;
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
export default withProtected(Logout);
