import React from 'react';
import classNames from 'classnames';

const style = {
    label: {
        fontSize: '1.2rem'
    }
}
// Our inner form component which receives our form's state and updater methods as props
const FormFields = (props) => {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, btnBlock, buttonWidth25 } = props;
    const btnClass = classNames('btn btn-outline-primary pointer', { 'btn-block': btnBlock, 'w-25': buttonWidth25 });

    return (
        <form onSubmit={handleSubmit} noValidate>
            {errors.message ? <div className="alert alert-danger" role="alert">{errors.message}</div> : null}
            <div className="form-group">
                <label style={style.label}>Email Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {touched.email && errors.email && <span className="text-danger">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label style={style.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {touched.password && errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className={btnClass} disabled={isSubmitting}>
                {isSubmitting ? <i className="p-1 fa fa-spinner fa-spin"></i> : null}
                Submit
            </button>

        </form>
    )
}

export default FormFields;
