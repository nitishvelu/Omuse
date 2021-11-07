import { Button } from "@chakra-ui/button";
import React from "react";
import { withProtected } from "../src/hook/route";
import cookie from "js-cookie";


function Logout({ auth }) {
  const { logout } = auth;
  return (
    <div>
      <Button onClick={()=>{logout();cookie.remove("uid");cookie.remove("name");cookie.remove("typeOfUser")}}>Logout</Button>
    </div>
  );
}
export default withProtected(Logout);
