import React from "react";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../Providers/UserProvider";

export default function Main() {
  const { role } = useContext(UserContext)

  return (
    <div>
      <p>{role }</p>
      <h1>Main</h1>
    </div>
  )
}