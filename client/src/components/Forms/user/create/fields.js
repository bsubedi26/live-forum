import React from 'react'
import styled from 'styled-components'

const ErrorField = styled.p`
  margin: 0.6rem 0 0;
  color: #b42318;
  font-size: 0.92rem;
  text-align: left;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.55rem;
  color: var(--text-strong);
  font-size: 0.92rem;
  font-weight: 600;
  text-align: left;
`

const FormFields = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.message ? <div className='alert alert-danger mb-3' role='alert'>{errors.message}</div> : null}
      <div className='form-group mb-3'>
        <Label>Email Address</Label>
        <input
          type='email'
          name='email'
          placeholder='Email Address'
          className='form-control form-control-lg'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          autoFocus
        />
        {touched.email && errors.email && <ErrorField>{errors.email}</ErrorField>}
      </div>

      <div className='form-group mb-4'>
        <Label>Password</Label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='form-control form-control-lg'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password && <ErrorField>{errors.password}</ErrorField>}
      </div>

      <button type='submit' disabled={isSubmitting} className='btn btn-outline-primary'>
        {isSubmitting ? <i className='p-1 fa fa-spinner fa-spin' /> : null} Submit
      </button>

    </form>
  )
}

export default FormFields
