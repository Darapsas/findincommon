import React, { useState, useEffect, Fragment } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  updateGroup,
  updateConversation,
  createGroup,
  createConversation,
  getConversationByName,
  getConversationById
} from "../../helpers/requests";
import * as Yup from "yup";
import Loader from "../templates/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./group.scss";

const groupSchema = Yup.object().shape({
  name: Yup.string().required("This is a required field"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters long."
  )
});

export default props => {
  return (
    <div className="w-75 custom">
      <Formik
        initialValues={{
          id: props.location.state.group ? props.location.state.group.id : "",
          name: props.location.state.group
            ? props.location.state.group.name
            : "",
          description: props.location.state.group
            ? props.location.state.group.description
            : "",
          members: props.location.state.group
            ? props.location.state.group.members
            : [],
          creator: props.currentUser,
          conversationId: props.location.state.group
            ? props.location.state.group.conversationId
            : ""
        }}
        validationSchema={groupSchema}
        //  validate={}
        onSubmit={(values, actions) => {
          props.location.state.group
            ? getConversationById(values.conversationId)
                .then(data => {
                  console.log(JSON.stringify(data.participants));
                  console.log("anything");
                  updateConversation(
                    {
                      id: values.conversationId,
                      participants: values.members,
                      creator: data.creator,
                      name: `Group conversation: ${values.name}`
                    },
                    values.conversationId
                  )
                    .then(response => {
                      updateGroup(values, values.id)
                        .then(response => {
                          console.log(
                            "Successfully edited",
                            JSON.stringify(response)
                          );
                          props.history.goBack();
                        })
                        .catch(error => console.error("Error:", error));
                    })
                    .catch(error => console.error("Error:", error));
                })
                .catch(error => {
                  console.error("Error: ", error);
                })
            : createConversation({
                participants: values.members,
                creator: values.creator,
                name: `Group conversation: ${values.name}`
              })
                .then(response => {
                  console.log("Successfully created", JSON.stringify(response));

                  getConversationByName(`Group conversation: ${values.name}`)
                    .then(data => {
                      values.conversationId = data.id;

                      createGroup(values)
                        .then(response => {
                          console.log(
                            "Successfully created",
                            JSON.stringify(response)
                          );
                          props.history.goBack();
                        })
                        .catch(error => console.error("Error:", error));
                    })
                    .catch(error => {
                      console.error("Error: ", error);
                    });
                })
                .catch(error => console.error("Error:", error));
        }}
        render={({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form>
            <h2>{props.location.state.formName || "Group form"}</h2>
            <div className="form-group">
              <label>Name</label>
              <Field
                className="form-control"
                name="name"
                type="text"
                placeholder="E.g. Fifa group"
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
                placeholder="E.g. Group rules: no vodka (just tequila), lorem ipsum, lorem ipsum."
              />
              {touched.description && errors.description && (
                <small className="form-text text-muted alert alert-danger">
                  {errors.description}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Members (you can filter them with search bar):</label>
              <br />
              <label>
                <input name="You" type="checkbox" disabled checked /> You
              </label>
              <br />
              {props.searchQuery !== "" && (
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
                name="members"
                render={arrayHelpers =>
                  props.members.map(
                    member =>
                      member.id !== props.currentUser.id && (
                        <div key={member.id}>
                          <label>
                            <input
                              name={`member-${member.id}`}
                              type="checkbox"
                              checked={values.members
                                .map(p => p.id)
                                .includes(member.id)}
                              onChange={e => {
                                if (e.target.checked) {
                                  arrayHelpers.push(member);
                                } else {
                                  arrayHelpers.remove(
                                    values.members.findIndex(
                                      x => x.id === member.id
                                    )
                                  );
                                }
                              }}
                            />{" "}
                            {member.name}
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
