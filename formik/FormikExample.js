import { useFormik } from "formik";
import * as Yup from "yup";

function FormikExample() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: (values) => {
      console.log("Submitted values:", values);
      alert(`Welcome ${values.name}!`);
    },
  });

  return (
    <div>
      <h1>Formik Example</h1>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.name && formik.errors.name && (
            <p>{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.email && formik.errors.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormikExample;