import { withFormik } from 'formik';
import validate from './validate';
import FormFields from './fields';

// Wrap our form with the using withFormik HoC
const FormContainer = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  validate: validate,
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors /* setValues, setStatus, and other goodies */ }) => {
    console.log('LOGIN!')
    setSubmitting(true);
    
    props.handleSubmit(values)
    .then(data => {
        // setSubmitting(false);
    })
    .catch(err => {
      setSubmitting(false);
      // Maybe even transform your API's errors into the same shape as Formik's!
      // setErrors(transformMyApiErrors(errors));
    })
  },
})

export default FormContainer(FormFields)

