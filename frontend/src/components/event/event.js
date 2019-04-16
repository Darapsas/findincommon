import React, { Fragment, useState, useEffect } from "react";
import { getUserEvents, deleteEvent, getEvents } from "../../helpers/requests";
import EventsList from "./events-list";
import Loader from "../templates/loader";

let _isMounted;
export default props => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      const response = await getUserEvents(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            console.log(data);
            setEvents(data);
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      setLoading(false);
    }
    fetchData();
    console.log(props.currentUser);
    return () => {
      _isMounted = false;
    };
  }, [events.length]);

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <Fragment>
      <h2>Your created events:</h2>
      <EventsList events={props.currentUser.events} owned={true} />
      <br />
      <br />
      <h2>Other events:</h2>
      {events.length !== 0 && <EventsList events={events} owned={false} />}
    </Fragment>
  );
};
