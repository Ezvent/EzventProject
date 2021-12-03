import React from 'react';
import Calendar from '../components/Calendar';

function User({ args }) {
  return (
    <>
      <h1> Welcome to User Page</h1>
      <h1> Hello {args.email}</h1>
      <Calendar email={args.email} />
    </>
  );
}

export default User;
