import React from "react";

function User({ args }) {
  return (
    <>
      <h1> Hello {args.email}</h1>
      <body>
        <main id="user-homepage-main-holder">
          <div class="grid-container">
            <div class="grid-event-requests-list-holder">
              Pending
              <ol>
                <li>Event 1</li>
                <li>Event 2</li>
                <li>Event 3</li>
              </ol>
            </div>

            <div class="grid-accept-reject-list-holder">
              <ol>
                <li>
                  <button class="accept-button">
                    <a href="/acceptevent">Accept</a>
                  </button>
                  <button class="reject-button">
                    <a href="/rejectevent">Reject</a>
                  </button>
                </li>
                <li>
                  <button class="accept-button">
                    <a href="/acceptevent">Accept</a>
                  </button>
                  <button class="reject-button">
                    <a href="/rejectevent">Reject</a>
                  </button>
                </li>
                <li>
                  <button class="accept-button">
                    <a href="/acceptevent">Accept</a>
                  </button>
                  <button class="reject-button">
                    <a href="/rejectevent">Reject</a>
                  </button>
                </li>
              </ol>
            </div>

            <div class="grid-swappable-element-holder">Calendar</div>
          </div>
          <div class="general-button-holder">
            <button class="default-button">
              <a href="/changepassword">Change Password</a>
            </button>
          </div>
        </main>
      </body>
    </>
  );
}

export default User;
