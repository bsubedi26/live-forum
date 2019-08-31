import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import FormFields from './fields'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is a required field'), // .email()
  password: Yup.string().required('Password is a required field')
})

const onSubmit = (handleSubmit, handleSuccess) => async (data, Form) => {
  // console.log('data: ', data)
  handleSubmit(data)
    .then(response => {
      // console.log('response: ', response)
      Form.setSubmitting(false)
      handleSuccess(response)
    })
    .catch((err) => {
      Form.setSubmitting(false)
      Form.setFieldError('message', err.message)
    })

  return 'submit complete.'
}

const FormContainer = Component => props => {
  const { initialValues, onSubmitAction, onSuccessAction } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit(onSubmitAction, onSuccessAction)}
      render={FormFields}
      validationSchema={validationSchema}
    />

  )
}

export default FormContainer(FormFields)
