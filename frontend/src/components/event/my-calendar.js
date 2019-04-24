import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = BigCalendar.momentLocalizer(moment);

export default props => {
  let myEventList;
  if (props.events && props.userEvents) {
    myEventList = [...props.events, ...props.userEvents].map(event => ({
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.endDate)
    }));
  } else if (props.events) {
    myEventList = [...props.events].map(event => ({
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.endDate)
    }));
  } else if (props.userEvents) {
    myEventList = [...props.userEvents].map(event => ({
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.endDate)
    }));
  } else {
    myEventList = [];
  }

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={myEventList}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px" }}
      />
    </div>
  );
};
