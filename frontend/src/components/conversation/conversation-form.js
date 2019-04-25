import React, { Fragment } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { updateConversation, createConversation } from "../../helpers/requests";
import * as Yup from "yup";

const conversationSchema = Yup.object().shape({
  name: Yup.string()
    .required("This is a required field")
    .max(250, "Field has to be at maximum 250 characters long")
});

export default props => {
  return (
    <div className="w-75 custom">
      <Formik
        initialValues={{
          id: props.location.state.conversation
            ? props.location.state.conversation.id
            : "",
          name: props.location.state.conversation
            ? props.location.state.conversation.name
            : "",
          participants: props.location.state.conversation
            ? props.location.state.conversation.participants
            : [],
          creator: props.currentUser
        }}
        validationSchema={conversationSchema}
        //  validate={}
        onSubmit={(values, actions) => {
          props.location.state.conversation
            ? updateConversation(values, props.location.state.conversation.id)
                .then(response => {
                  console.log("Successfully edited", JSON.stringify(response));
                  props.history.goBack();
                })
                .catch(error => console.error("Error:", error))
            : createConversation(values)
                .then(response => {
                  console.log("Successfully created", JSON.stringify(response));
                  props.history.goBack();
                })
                .catch(error => console.error("Error:", error));
        }}
        render={({ errors, touched, isSubmitting, values }) => (
          <Form>
            <h2>{props.location.state.formName || "Conversation form"}</h2>
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
              <label>Participants (you can filter them with search bar):</label>
              <br />
              <label>
                <input name="You" type="checkbox" disabled checked /> You
              </label>

              <br />
              {props.searchQuery && props.searchQuery !== "" && (
                <Fragment>
                  <label>
                    Members are currently filtered by these hobbies:
                  </label>
                  <br />
                </Fragment>
              )}
              {props.hobbies.map(hobby => (
                <button
                  type="button"
                  className="btn btn-outline-success"
                  key={hobby.id}
                >
                  {hobby.name}
                </button>
              ))}
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
                                  arrayHelpers.push(participant);
                                } else {
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
