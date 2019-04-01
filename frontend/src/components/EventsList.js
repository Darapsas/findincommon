import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Link } from "react-router-dom";

export default props => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.99.100:8080/api/events`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      });
  }, []);

  return (
    <table className="table table-hover">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Start date</th>
        <th scope="col">End date</th>
        <th scope="col" />
        <th scope="col" />
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr>
            <th scope="col">{index + 1}</th>
            <td scope="col">{event.name}</td>
            <td scope="col">{new Date(event.startDate).toUTCString()}</td>
            <td scope="col">{new Date(event.endDate).toUTCString()}</td>
            <td scope="col">
              <Link to={`${props.path}/:id`}>
                <button type="button" className="btn btn-primary float-right">
                  Edit
                </button>
              </Link>
            </td>
            <td scope="col">
              <button type="button" className="btn btn-danger float-right">
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="4" />
          <td colSpan="2">
            <button className="btn btn-success float-right" type="button">
              Create new
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    /*

    <Formik
      initialValues={{
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        reminders: []
        // events: []
      }}
      //validationSchema={eventSchema}
      //  validate={}
      onSubmit={(values, actions) => {
        fetch(`http://192.168.99.100:8080/api/events`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => console.log("Success", JSON.stringify(response)))
          .catch(error => console.error("Error:", error));

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={({ errors, touched, isSubmitting, values }) => (
        <Form>
          <h2>Events</h2>

          <ul>
            <FieldArray
              name="events"
              render={arrayHelpers =>
                events.map((event, index) => (
                  <li key={index} className="list-group-item">
                    <span>{event.name}</span>
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger float-right"
                    >
                      Delete
                    </button>
                  </li>
                ))
              }
            />
          </ul>

          <button
            className="btn btn-success"
            type="button"
            disabled={isSubmitting}
          >
            Create new
          </button>
          <button
            className="btn btn-danger"
            type="button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </Form>
      )}
    />*/
  );
};
