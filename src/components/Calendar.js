/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';

const Calendar = function () {
  return (
    <div>
      <p />
      <p />
      <iframe
        title="Calendar"
        src={`https://calendar.google.com/calendar/embed?src=${encodeURI('qb4oq3kl7h98fvkvudmq98mpqg@group.calendar.google.com')}`}
        style={{
          border: 'solid 1px #777', width: '500px', height: '300px', frameborder: '0', scrolling: 'no',
        }}
      />
    </div>
  );
};

export default Calendar;
