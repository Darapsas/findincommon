import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const hobbySchema = Yup.object().shape({
  /*name: Yup.string().required("This is a required field"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters long."
  ),
  startDate: Yup.date()
    .min(new Date(), "You cannot create an hobby for the past.")
    .required("Start date and time are required"),
  endDate: Yup.date()
    .min(new Date(), "You cannot create an hobby for the past.")
    .required("End date and time are required")*/
});

export default props => {
  return (
    <Formik
      initialValues={{
        id: props.location.state.hobby ? props.location.state.hobby.id : "",
        name: props.location.state.hobby ? props.location.state.hobby.name : "",
        description: props.location.state.hobby
          ? props.location.state.hobby.description
          : ""
      }}
      validationSchema={hobbySchema}
      //  validate={}
      onSubmit={(values, actions) => {
        props.location.state.hobby
          ? fetch(
              `http://192.168.99.100:8080/api/hobbies/${
                props.location.state.hobby.id
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
          : fetch(`http://192.168.99.100:8080/api/hobbies`, {
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
          <h2>{props.location.state.formName || "Hobby form"}</h2>
          <div className="form-group">
            <label>Name</label>
            <Field
              className="form-control"
              name="name"
              type="text"
              placeholder="E.g. Calisthenics"
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
              placeholder="E.g. Calisthenics is a form of exercise consisting of a variety of gross motor movements—running, standing, grasping, pushing, etc.—often performed rhythmically and with minimal equipment, as bodyweight exercises."
            />
            {touched.description && errors.description && (
              <small className="form-text text-muted alert alert-danger">
                {errors.description}
              </small>
            )}
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
