import React from 'react'
import { Formik, Form, Field } from 'formik'
import { postMessage } from '../../helpers/requests'
import * as Yup from 'yup'

const messageSchema = Yup.object().shape({
  text: Yup.string()
    .required('Empty messages are not allowed')
    .max(2500, 'Messages longer than 2500 characters are not allowed.')
})

export default props => {
  return (
    <Formik
      initialValues={{
        conversation: props.conversation,
        creator: props.currentUser,
        text: ''
      }}
      validationSchema={messageSchema}
      //  validate={}
      onSubmit={(values, { resetForm }) => {
        postMessage({
          conversation: values.conversation.id,
          creator: values.creator,
          text: values.text
        })
          .then(response => {
            resetForm()
            console.log('Successfully created', JSON.stringify(response))
          })
          .catch(error => console.error('Error:', error))
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
  )
}
