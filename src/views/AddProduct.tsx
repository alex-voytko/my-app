import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers, Form, Field } from "formik";
import * as yup from "yup";
import { IMyProductStates } from "../models";
import { createProduct } from "../api";
import { useAppDispatch } from "../redux/store";
import classNames from "classnames";
import { nanoid } from "nanoid";

const initialValues: IMyProductStates = {
  title: "",
  author: "",
  year: "",
  thumbnail: "",
  stock: 0,
  price: 0,
  category: "",
  rating: 0,
  description: "",
  id: "",
};

export default function AddProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .required("Required")
      .min(2, "Title should contain 2 and more symbols")
      .max(80, "Title should not contain more than 80 symbols"),
    author: yup
      .string()
      .required("Required")
      .min(2, "Author should contain 2 and more symbols")
      .max(80, "Author should not contain more than 80 symbols"),
    year: yup
      .string()
      .required("Required")
      .matches(/^\d{4}$/, "Year should contain 4 digits"),
    thumbnail: yup
      .string()
      .matches(
        /^(https?:\/\/).+$/,
        'Link should starts from "http://" or "https://"'
      ),
    stock: yup
      .number()
      .required("Required")
      .positive("The Amount should be positive")
      .typeError("Stock should be the number"),
    price: yup
      .number()
      .required("Required")
      .positive("The Amount should be positive")
      .typeError("Price should be the number"),
    rating: yup
      .number()
      .typeError("Rating should be the number")
      .positive("The Amount should be positive"),
    category: yup
      .string()
      .required("Required")
      .min(2, "Category should contain 2 and more symbols")
      .max(80, "Category should not contain more than 80 symbols"),
    description: yup
      .string()
      .required("Required")
      .min(80, "Description should contain 80 and more symbols")
      .max(1000, "Description should not contain more than 1000 symbols"),
  });

  const handleSubmitData = (
    values: IMyProductStates,
    { setSubmitting, resetForm }: FormikHelpers<IMyProductStates>
  ) => {
    setSubmitting(true);
    values.id = nanoid(5);
    if (!values.thumbnail) {
      values.thumbnail = "https://random.imagecdn.app/800/400";
    }
    dispatch(createProduct(values));
    setSubmitting(false);
    resetForm();
    navigate("/");
  };

  return (
    <div className="page-wrapper">
      <h2>Add product</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="add-product">
            <label
              className={classNames({ errored: errors.title && touched.title })}
            >
              <p>Title</p>
              {errors.title && touched.title && (
                <p className="error-text">{errors.title}</p>
              )}
              <Field
                name="title"
                type="text"
                placeholder="My awesome product"
              />
            </label>
            <label
              className={classNames({
                errored: errors.author && touched.author,
              })}
            >
              <p>Author</p>
              {errors.author && touched.author && (
                <p className="error-text">{errors.author}</p>
              )}
              <Field name="author" type="text" placeholder="John Mack" />
            </label>
            <label
              className={classNames({
                errored: errors.year && touched.year,
              })}
            >
              <p>Year</p>
              {errors.year && touched.year && (
                <p className="error-text">{errors.year}</p>
              )}
              <Field name="year" type="text" placeholder="2021" />
            </label>
            <label
              className={classNames({
                errored: errors.category && touched.category,
              })}
            >
              <p>Category</p>
              {errors.category && touched.category && (
                <p className="error-text">{errors.category}</p>
              )}
              <Field name="category" type="text" placeholder="smartphones" />
            </label>
            <label
              className={classNames("img-link", {
                errored: errors.thumbnail && touched.thumbnail,
              })}
            >
              <p>Image link</p>
              {errors.thumbnail && touched.thumbnail && (
                <p className="error-text">{errors.thumbnail}</p>
              )}
              <div>
                <Field name="thumbnail" type="text" placeholder="https://..." />
                <label className="checkbox-label">
                  <p className="checkbox-text">or use random image</p>
                  <Field type="checkbox" name="checkbox" />
                </label>
              </div>
            </label>
            <label
              className={classNames({
                errored: errors.description && touched.description,
              })}
            >
              <p>Description</p>
              {errors.description && touched.description && (
                <p className="error-text">{errors.description}</p>
              )}
              <Field
                as="textarea"
                name="description"
                rows={5}
                placeholder="Product details..."
              />
            </label>
            <div className="one-row">
              <label
                className={classNames({
                  errored: errors.stock && touched.stock,
                })}
              >
                <p>Stock: </p>
                {errors.stock && touched.stock && (
                  <p className="error-text">{errors.stock}</p>
                )}
                <Field name="stock" type="number" placeholder="100" />
              </label>
              <label
                className={classNames({
                  errored: errors.price && touched.price,
                })}
              >
                <p>Price: ($)</p>
                {errors.price && touched.price && (
                  <p className="error-text">{errors.price}</p>
                )}
                <Field name="price" type="number" placeholder="100" />
              </label>
              <label
                className={classNames({
                  errored: errors.rating && touched.rating,
                })}
              >
                <p>Rating: </p>
                {errors.rating && touched.rating && (
                  <p className="error-text">{errors.rating}</p>
                )}
                <Field name="rating" type="number" placeholder="5.0" />
              </label>
            </div>
            <div className="btn-container">
              <button type="submit">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
