import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const LearnFormik = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <h1>This shit is lit</h1>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
    </div>
    <br />
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
    </div>
    <br />
    <label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join the army
    </label>
    <br />
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <br />
    <button disabled={isSubmitting}>Submit</button>
  </Form>
);

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      plan: plan || "premium"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(9)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "darius@rainys.org") {
        setErrors({ email: "That email is already taken" });
      } else {
        resetForm();
      }
    }, 2000);
    console.log(values);
  }
})(LearnFormik);

export default FormikApp;
