import React, { useState, useEffect } from "react";
import { getUserEvents, getUserCreatedEvents } from "../../helpers/requests";
import EventsList from "./event-list";
import Loader from "../templates/loader";

let _isMounted;
export default props => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [itemDeleted, setItemDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserEvents(props.currentUser.id)
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
    return () => {
      _isMounted = false;
    };
  }, [itemDeleted]);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserCreatedEvents(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            console.log(data);
            setUserEvents(data);
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      setLoading(false);
    }
    fetchData();
    // FIX double rerender, if there will be time
    setItemDeleted(false);
    return () => {
      _isMounted = false;
    };
  }, [itemDeleted]);

  const handleDelete = () => {
    setItemDeleted(true);
  };

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <div className="custom w-75">
      <br />
      <h2>Your created events:</h2>
      <EventsList
        events={userEvents}
        handleDelete={handleDelete}
        owned={true}
      />
      <br />
      <br />
      <h2>Other events:</h2>
      {events.length !== 0 && <EventsList events={events} owned={false} />}
    </div>
  );
};
