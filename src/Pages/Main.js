import React, { useContext } from "react";
import Nav from "../Components/Nav";
import { UserContext } from "../Providers/UserProvider";

export default function Main() {
  const { user } = useContext(UserContext)
  return (
    <div>
      <p>{user.role}</p>
      <Nav></Nav>
    </div>
  )
}