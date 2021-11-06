import { Button } from "@chakra-ui/button";
import React from "react";
import { withProtected } from "../src/hook/route";

function Logout({ auth }) {
  const { logout } = auth;
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
export default withProtected(Logout);
