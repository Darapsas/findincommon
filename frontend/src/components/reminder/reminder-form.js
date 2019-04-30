import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const reminderSchema = Yup.object().shape({
  /*name: Yup.string().required("This is a required field"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters long."
  ),
  startDate: Yup.date()
    .min(new Date(), "You cannot create an reminder for the past.")
    .required("Start date and time are required"),
  endDate: Yup.date()
    .min(new Date(), "You cannot create an reminder for the past.")
    .required("End date and time are required")*/
})

export default props => {
  return (
    <Formik
      initialValues={{
        id: props.location.state.reminder
          ? props.location.state.reminder.id
          : '',
        name: props.location.state.reminder
          ? props.location.state.reminder.name
          : '',
        timeInSeconds: props.location.state.reminder
          ? props.location.state.reminder.timeInSeconds
          : ''
      }}
      validationSchema={reminderSchema}
      //  validate={}
      onSubmit={(values, actions) => {
        props.location.state.reminder
          ? fetch(
              `http://192.168.99.100:8080/api/reminders/${
                props.location.state.reminder.id
              }`,
              {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
              .then(response => {
                console.log('Successfully edited', JSON.stringify(response))
                props.history.goBack()
              })
              .catch(error => console.error('Error:', error))
          : fetch(`http://192.168.99.100:8080/api/reminders`, {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => {
                console.log('Successfully created', JSON.stringify(response))
                props.history.goBack()
              })
              .catch(error => console.error('Error:', error))
      }}
      render={({ errors, touched, isSubmitting, values }) => (
        <Form>
          <h2>{props.location.state.formName || 'Reminder form'}</h2>
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
              name="timeInSeconds"
              component="textarea"
              placeholder="E.g. Calisthenics is a form of exercise consisting of a variety of gross motor movements—running, standing, grasping, pushing, etc.—often performed rhythmically and with minimal equipment, as bodyweight exercises."
            />
            {touched.timeInSeconds && errors.timeInSeconds && (
              <small className="form-text text-muted alert alert-danger">
                {errors.timeInSeconds}
              </small>
            )}
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {props.location.state.action || 'Submit'}
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
  )
}
