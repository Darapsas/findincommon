import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  name: Yup.string().required("This is a required field"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters long."
  ),
  startDate: Yup.date()
    .min(new Date(), "You cannot create an event for the past.")
    .required("Start date and time are required"),
  endDate: Yup.date()
    .min(new Date(), "You cannot create an event for the past.")
    .required("End date and time are required")
});

export default props => {
  const [reminderTypes, setReminderTypes] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.99.100:8080/api/reminders`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        setReminderTypes(data);
      });
  }, []);

  useEffect(prevProps => {});

  return (
    <Formik
      initialValues={{
        id: props.location.state.event ? props.location.state.event.id : "",
        name: props.location.state.event ? props.location.state.event.name : "",
        description: props.location.state.event
          ? props.location.state.event.description
          : "",
        startDate: props.location.state.event
          ? props.location.state.event.startDate.slice(0, 16)
          : "",
        endDate: props.location.state.event
          ? props.location.state.event.endDate.slice(0, 16)
          : "",
        reminders: props.location.state.event
          ? props.location.state.event.reminders
          : []
      }}
      validationSchema={eventSchema}
      //  validate={}
      onSubmit={(values, actions) => {
        props.location.state.event
          ? fetch(
              `http://192.168.99.100:8080/api/events/${
                props.location.state.event.id
              }`,
              {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
              .then(response => {
                console.log("Successfully edited", JSON.stringify(response));
                props.history.goBack();
              })
              .catch(error => console.error("Error:", error))
          : fetch(`http://192.168.99.100:8080/api/events`, {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(response => {
                console.log("Successfully created", JSON.stringify(response));
                props.history.goBack();
              })
              .catch(error => console.error("Error:", error));
      }}
      render={({ errors, touched, isSubmitting, values }) => (
        <Form>
          <h2>{props.location.state.formName || "Event form"}</h2>
          <div className="form-group">
            <label>Name</label>
            <Field
              className="form-control"
              name="name"
              type="text"
              placeholder="E.g. Flat Earth discussion"
            />
            {touched.name && errors.name && (
              <small className="form-text text-muted alert alert-danger">
                {errors.name}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <Field
              className="form-control"
              rows="3"
              name="description"
              component="textarea"
              placeholder="E.g. Discussion will be about: How are we going to prove the world that Earth is not Round."
            />
            {touched.description && errors.description && (
              <small className="form-text text-muted alert alert-danger">
                {errors.description}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>When does the event start?</label>
            <Field
              className="form-control"
              name="startDate"
              type="datetime-local"
            />
            {touched.startDate && errors.startDate && (
              <small className="form-text text-muted alert alert-danger">
                {errors.startDate}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>When does the event end?</label>
            <Field
              className="form-control"
              name="endDate"
              type="datetime-local"
            />
            {touched.endDate && errors.endDate && (
              <small className="form-text text-muted alert alert-danger">
                {errors.endDate}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Send reminders:</label>
            <FieldArray
              name="reminders"
              render={arrayHelpers =>
                reminderTypes.map((reminder, index) => (
                  <div key={index}>
                    <label>
                      <input
                        name={`reminder-${index}`}
                        type="checkbox"
                        checked={values.reminders
                          .map(r => r.id)
                          .includes(reminder.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            arrayHelpers.push(reminder);
                          } else {
                            arrayHelpers.remove(
                              values.reminders.indexOf(reminder)
                            );
                          }
                        }}
                      />{" "}
                      {reminder.name}
                    </label>
                  </div>
                ))
              }
            />
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {props.location.state.action || "Submit"}
          </button>
          <button
            className="btn btn-danger"
            type="button"
            disabled={isSubmitting}
            onClick={() => props.history.goBack()}
          >
            Cancel
          </button>
        </Form>
      )}
    />
  );
};
