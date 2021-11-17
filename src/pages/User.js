import React from "react";

function User({ args }) {
  return (
    <>
      <h1> Welcome to User Page</h1>
      <h1> Hello {args.email}</h1>
    </>
  );
}
export default User;
