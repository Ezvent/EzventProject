import React from 'react';
import AddorRemovePopup from '../components/AddorRemovePopup';
import Calendar from '../components/Calendar';
import CreateNewEvent from '../components/CreateNewEvent';

import UsersListPopup from '../components/UsersListPopup';

const User = function ({ args }) {
  return (
    <>
      <h1> Welcome to Admin Page</h1>
      <h4>
        {' '}
        Hello
        {args.email}
      </h4>
      <UsersListPopup />

      <AddorRemovePopup />
      <CreateNewEvent />
      <Calendar email={args.email} />
    </>
  );
};

export default User;
