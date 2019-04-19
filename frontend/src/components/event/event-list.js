import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../helpers/requests";

export default props => (
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
      {props.events.length !== 0 &&
        props.events.map((event, index) => (
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

            {props.owned ? (
              <Fragment>
                <th scope="col">
                  <Link
                    to={{
                      pathname: `/user/events/${event.id}/edit/`,
                      state: {
                        action: "Save Changes",
                        formName: "Edit an Event",
                        event: event
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                    >
                      Edit
                    </button>
                  </Link>
                </th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-danger float-right"
                    onClick={() => {
                      deleteEvent(event.id).then(response =>
                        props.handleDelete()
                      );
                    }}
                  >
                    Delete
                  </button>
                </th>
              </Fragment>
            ) : (
              <Fragment>
                <th scope="col" colSpan="2">
                  <Link
                    to={{
                      pathname: `/user/events/${event.id}/info`,
                      state: {
                        event: event
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                    >
                      Show
                    </button>
                  </Link>
                </th>
              </Fragment>
            )}
          </tr>
        ))}

      {props.owned && (
        <tr>
          <td colSpan="4" />
          <td colSpan="2">
            <Link
              to={{
                pathname: "/user/events/event/create",
                state: { action: "Create", formName: "Create new Event" }
              }}
            >
              <button className="btn btn-success float-right" type="button">
                Create new
              </button>
            </Link>
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
