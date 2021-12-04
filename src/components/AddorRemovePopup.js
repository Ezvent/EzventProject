/* global fetch, alert */

import React, { useState } from 'react';
import {
  Button, Icon, Image, Modal,
} from 'semantic-ui-react';
import userimg from './users.png';

const AddorRemovePopup = function () {
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [isRemove, setIsRemove] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email !== '') {
      const data = {
        email,
        is_admin: isAdmin,
      };
      fetch('/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      }).then((response) => response.json().then((data) => {
        setEmail('');
        setIsAdmin(false);
        if (!data.message) {
          alert('User not added, there is some problem! :-(');
        } else {
          alert('User added successfully! :-)');
        }
      }));
    }
  };

  const removeHandler = () => {
    if (email !== '') {
      const data = {
        email,
      };
      fetch('/removeuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      }).then((response) => response.json().then((data) => {
        setEmail('');
        setIsAdmin(false);
        if (!data.message) {
          alert('User not removed, there is something wrong :-(');
        } else {
          alert('User Removed successfully :-)');
        }
      }));
    }
  };

  const isAdminHandler = (e) => {
    setIsAdmin(e.target.checked);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Add or Remove User</Button>}
    >
      <Modal.Header>Add or Remove User</Modal.Header>
      <Modal.Content image scrolling>
        <Image size="medium" src={userimg} wrapped />

        <Modal.Description>
          <p>admin will add or remove users from application.</p>

          <div className="ui form">
            <h2>Add or remove user</h2>
            <button
              type="button"
              disabled={!isRemove}
              className="ui positive button"
              onClick={() => setIsRemove(false)}
            >
              Add User
              {' '}
            </button>
            <button
              type="button"
              disabled={isRemove}
              className="ui negative button"
              onClick={() => setIsRemove(true)}
            >
              Remove User
              {' '}
            </button>
            {!isRemove && (
              <>
                <div className="inline field">
                  <div style={{ margin: '15px' }}>
                    <input
                      checked={isAdmin}
                      onChange={isAdminHandler}
                      type="checkbox"
                      tabIndex="0"
                    />
                    <label> is Admin?</label>
                  </div>
                </div>
                <div
                  className="fields"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="field">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={emailHandler}
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={submitHandler}
                  className="ui submit button"
                >
                  Add User
                </button>
              </>
            )}

            {isRemove && (
              <>
                <div
                  className="fields"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="field">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={emailHandler}
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeHandler}
                  className="ui negative button"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Close
          {' '}
          <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddorRemovePopup;
