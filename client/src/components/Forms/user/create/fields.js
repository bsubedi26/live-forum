import React from 'react'

const style = {
  label: {
    fontSize: '1.2rem'
  }
}

const ErrorField = ({ field }) => (
  <div className='my-2 text-left'>
    <p className='fw1 f5 mt0 mb3 text-danger'>
      {field}
      <i className='fa fa-exclamation-triangle pl-2' aria-hidden='true' />
    </p>
  </div>

)

const FormFields = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.message ? <div className='alert alert-danger' role='alert'>{errors.message}</div> : null}
      <div className='form-group'>
        <label style={style.label}>Email Address</label>
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
        {touched.email && errors.email && <ErrorField field={errors.email} />}
      </div>

      <div className='form-group'>
        <label style={style.label}>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='form-control form-control-lg'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {touched.email && errors.email && <ErrorField field={errors.password} />}
      </div>

      <button type='submit' disabled={isSubmitting} className='bw0 br2 pa3 black fw1 tc ttu tracked'>
        {isSubmitting ? <i className='p-1 fa fa-spinner fa-spin' /> : null} Submit
      </button>

    </form>
  )
}

export default FormFields
