import React from 'react';

const Calendar = ({ email }) => {

    return (
        <div>
            <p></p>
            <p></p>
            <iframe
                src={"https://calendar.google.com/calendar/embed?src=" + encodeURI(email)}
                style={{border: "solid 1px #777", width:"500px", height:"300px", frameborder:"0", scrolling:"no"}}>
            </iframe>
        </div>
    )
};

export default Calendar;