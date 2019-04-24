import React from "react";
import { Formik, Form, Field } from "formik";
import { updateProfile } from "../../../helpers/requests";
import * as Yup from "yup";

const profileSchema = Yup.object().shape({
  /*  name: Yup.string().required("This is a required field"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters long."
  ),
  startDate: Yup.date()
    .min(new Date(), "You cannot create an profile for the past.")
    .required("Start date and time are required"),
  endDate: Yup.date()
    .min(new Date(), "You cannot create an profile for the past.")
    .required("End date and time are required")*/
});

export default props => {
  return (
    <div className="w-75 custom">
      <Formik
        initialValues={{
          id: props.currentUser ? props.currentUser.id : "",
          name: props.currentUser ? props.currentUser.name : "",
          email: props.currentUser ? props.currentUser.email : "",
          imageUrl: props.currentUser ? props.currentUser.imageUrl : "",
          description: props.currentUser ? props.currentUser.description : ""
        }}
        //validationSchema={profileSchema}
        //  validate={}
        onSubmit={(values, actions) => {
          updateProfile(props.currentUser.id, {
            name: values.name,
            imageUrl: values.imageUrl,
            description: values.description
          })
            .then(response => {
              props.handleHobbiesListChange();
              props.history.goBack();
            })
            .catch(error => console.error("Error:", error));
        }}
        render={({ errors, touched, isSubmitting, values }) => (
          <Form>
            <h2>Edit your profile</h2>
            <div className="form-group">
              <label>Name</label>
              <Field
                className="form-control"
                name="name"
                type="text"
                placeholder="Firstname Lastname"
              />
              {touched.name && errors.name && (
                <small className="form-text text-muted alert alert-danger">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <Field className="form-control" rows="3" name="email" disabled />
              {touched.description && errors.description && (
                <small className="form-text text-muted alert alert-danger">
                  {errors.description}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Image url</label>
              <Field className="form-control" rows="3" name="imageUrl" />
              {touched.description && errors.description && (
                <small className="form-text text-muted alert alert-danger">
                  {errors.description}
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
                placeholder="Write short description about yourself here."
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
              Save
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
