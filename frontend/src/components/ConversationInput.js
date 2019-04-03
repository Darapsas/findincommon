import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const messageSchema = Yup.object().shape({
  /*name: Yup.string().required("This is a required field"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters long."
  ),
  startDate: Yup.date()
    .min(new Date(), "You cannot create an message for the past.")
    .required("Start date and time are required"),
  endDate: Yup.date()
    .min(new Date(), "You cannot create an message for the past.")
    .required("End date and time are required")*/
});

export default props => {
  return (
    <Formik
      initialValues={{
        creatorId: "", //props.participant.id,
        creatorFirstName: "", //props.participant.firstName,
        creatorLastName: "", //props.participant.lastName,
        text: ""
      }}
      validationSchema={messageSchema}
      //  validate={}
      onSubmit={(values, actions) => {
        fetch(`http://192.168.99.100:8080/api/messages`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            console.log("Successfully created", JSON.stringify(response));
            //props.history.goBack();
            values.isSubmitting = false;
          })
          .catch(error => console.error("Error:", error));
      }}
      render={({ errors, touched, isSubmitting, values }) => (
        <Form>
          <div className="form-row">
            <div className="form-group col-sm-10">
              <Field
                className="form-control"
                name="text"
                type="text"
                placeholder="Write your message here"
              />
              {touched.text && errors.text && (
                <small className="form-text text-muted alert alert-danger">
                  {errors.text}
                </small>
              )}
            </div>

            <div className="form-group col-sm-2">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Send
              </button>
            </div>
          </div>
        </Form>
      )}
    />
  );
};
