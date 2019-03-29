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

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        reminders: []
      }}
      validationSchema={eventSchema}
      //  validate={}
      onSubmit={(values, actions) => {
        fetch(`http://192.168.99.100:8080/api/events`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(response => console.log("Success", JSON.stringify(response)))
          .catch(error => console.error("Error:", error));

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={({ errors, touched, isSubmitting, values }) => (
        <Form>
          <h2>{props.formName}</h2>
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
                reminderTypes.map(reminder => (
                  <div key={reminder.id}>
                    <label>
                      <input
                        name="reminders"
                        type="checkbox"
                        value={reminder.id}
                        checked={values.reminders.includes(reminder.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            arrayHelpers.push(reminder.id);
                          } else {
                            arrayHelpers.remove(
                              values.reminders.indexOf(reminder.id)
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
            {props.action}
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
    />
  );
};
