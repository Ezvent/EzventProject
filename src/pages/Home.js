import React from 'react';
import Calendar from '../components/Calendar';


function User({ args }) {

  return (
    <>
    <h1>Welcome to our Website</h1>
    <Calendar />
    {/* {args.email ? 
    (
      <a href="/logout"><button>logout</button></a>
    ): (
    <a href ="/login"><button>Login with google</button></a>
    )} */}
     </>
  );
}

export default User;

