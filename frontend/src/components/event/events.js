import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserEvents, deleteEvent } from "../../helpers/requests";
import Loader from "../templates/loader";

let _isMounted;
export default props => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _isMounted = true;
    // async
    //function fetchData() {
    //const response = await
    getUserEvents().then(data => {
      if (_isMounted) {
        setEvents(data);
      }
    });
    //.catch(error => console.error("Error: ", error));
    setLoading(false);
    // }
    //fetchData();

    return () => {
      _isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Start date</th>
          <th scope="col">End date</th>
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {events.length !== 0 &&
          events.map((event, index) => (
            <tr key={event.id}>
              <th scope="col">{index + 1}</th>
              <th className="font-weight-normal" scope="col">
                {event.name}
              </th>
              <th className="font-weight-normal" scope="col">
                {new Date(event.startDate).toUTCString()}
              </th>
              <th className="font-weight-normal" scope="col">
                {new Date(event.endDate).toUTCString()}
              </th>
              <th scope="col">
                <Link
                  to={{
                    pathname: `/event_edit/${event.id}`,
                    state: {
                      action: "Save Changes",
                      formName: "Edit an Event",
                      event: event
                    }
                  }}
                >
                  <button type="button" className="btn btn-primary float-right">
                    Edit
                  </button>
                </Link>
              </th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-danger float-right"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        <tr>
          <td colSpan="4" />
          <td colSpan="2">
            <Link
              to={{
                pathname: "/event_create/",
                state: { action: "Create", formName: "Create new Event" }
              }}
            >
              <button className="btn btn-success float-right" type="button">
                Create new
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
