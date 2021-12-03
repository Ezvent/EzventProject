import React from 'react';

const GoogleAuth = function (props) {
  const renderAuthButton = () => {
    if (props.isSignin) {
      return (
        <a href="/logout" className="ui red google button">
          <i className="google icon" />
          Sign Out
        </a>
      );
    }
    return (
      <a href="/login" className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </a>
    );
  };

  return (
    <div>{renderAuthButton()}</div>
  );
};

export default GoogleAuth;
