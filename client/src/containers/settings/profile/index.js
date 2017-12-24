import React from 'react'
// import { Link } from 'react-router-dom'

class SettingsProfile extends React.Component {
  render() {
    return (
      <div>
        <div className="card-header">
          Public Profile
        </div>

        <div className="body-content">
            <div className="pt-3 form-group">
                <label style={{ width: '100%', textAlign: 'left' }}>Public Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Public Name"
                    className="form-control"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.email}
                />
            </div>
            <div className="pt-3 form-group">
                <label style={{ width: '100%', textAlign: 'left' }}>Public Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Public Email"
                    className="form-control"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.email}
                />
            </div>

            <button className="mt-3 btn btn-success">Update Profile</button>
        </div>
        
        
      </div>
    )
  }
}

export default SettingsProfile