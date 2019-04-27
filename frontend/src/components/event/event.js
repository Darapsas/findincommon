import React, { useState, useEffect, useRef } from "react";
import { getUserEvents, getUserCreatedEvents } from "../../helpers/requests";
import EventList from "./event-list";
import Loader from "../templates/loader";
import MyCalendar from "./my-calendar";

// interval hook was borrowed from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

let _isMounted;
export default props => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [itemDeleted, setItemDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 5000);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserEvents(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
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
  }, [itemDeleted, count]);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserCreatedEvents(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
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
  }, [itemDeleted, count]);

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
      <br />
      <MyCalendar userEvents={userEvents} events={events} />
      <br />
      <br />
      <h2>Your created events:</h2>
      <EventList events={userEvents} handleDelete={handleDelete} owned={true} />
      <br />
      <br />
      <h2>Other events:</h2>
      {events.length !== 0 && <EventList events={events} owned={false} />}
    </div>
  );
};
