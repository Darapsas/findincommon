import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  getReminderTypes,
  updateEvent,
  createEvent
} from "../../helpers/requests";
import * as Yup from "yup";
import Loader from "../templates/loader";

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

let _isMounted;
export default props => {
  const [reminderTypes, setReminderTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      const response = await getReminderTypes()
        .then(data => {
          if (_isMounted) {
            setReminderTypes(data);
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
  }, []);

  useEffect(prevProps => {});

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <div className="w-75 custom">
      <Formik
        initialValues={{
          id: props.location.state.event ? props.location.state.event.id : "",
          name: props.location.state.event
            ? props.location.state.event.name
            : "",
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
            : [],
          participants: props.location.state.event
            ? props.location.state.event.participants
            : [],
          creatorId: props.currentUser.id
        }}
        validationSchema={eventSchema}
        //  validate={}
        onSubmit={(values, actions) => {
          props.location.state.event
            ? updateEvent(values, props.location.state.event.id)
                .then(response => {
                  console.log("Successfully edited", JSON.stringify(response));
                  props.history.goBack();
                })
                .catch(error => console.error("Error:", error))
            : createEvent(values)
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
                                values.reminders.findIndex(
                                  x => x.id === reminder.id
                                )
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

            <div className="form-group">
              <label>Participants (you can filter them with search bar):</label>
              <FieldArray
                name="participants"
                render={arrayHelpers =>
                  props.members.map(
                    participant =>
                      participant.id !== props.currentUser.id && (
                        <div key={participant.id}>
                          <label>
                            <input
                              name={`participant-${participant.id}`}
                              type="checkbox"
                              checked={values.participants
                                .map(p => p.id)
                                .includes(participant.id)}
                              onChange={e => {
                                if (e.target.checked) {
                                  console.log("push " + participant);
                                  arrayHelpers.push(participant);
                                } else {
                                  console.log(
                                    "delete " +
                                      values.participants.indexOf(participant)
                                  );
                                  arrayHelpers.remove(
                                    values.participants.findIndex(
                                      x => x.id === participant.id
                                    )
                                  );
                                }
                              }}
                            />{" "}
                            {participant.name}
                          </label>
                        </div>
                      )
                  )
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
    </div>
  );
};
