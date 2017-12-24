import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Profile from './profile'
import Account from './account'
import Emails from './emails'
import Billing from './billing'

class Settings extends React.Component {

  render() {
    return (
      <div className="row mx-auto w-75 mt-4">
        {/* <div className="col-4 card" style={{"margin": "20px", "width": "20rem"}}> */}
        <div className="card">
          <div className="card-header">
            Personal Settings
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to='/settings/profile'>Profile</Link>
            </li>
            <li className="list-group-item">
              <Link to='/settings/account'>Account</Link>
            </li>
            <li className="list-group-item">
              <Link to='/settings/emails'>Emails</Link>
            </li>
            <li className="list-group-item">
              <Link to='/settings/billing'>Billing</Link>
            </li>
            <li className="list-group-item">
              <Link to='/settings'>Notifications</Link>
            </li>
          </ul>

        </div>

        <div className="col-8">
          <Route exact
            path={`${this.props.match.url}/profile`}
            component={Profile}
          />
          <Route exact
            path={`${this.props.match.url}/account`}
            component={Account}
          />
          <Route exact
            path={`${this.props.match.url}/emails`}
            component={Emails}
          />
          <Route exact
            path={`${this.props.match.url}/billing`}
            component={Billing}
          />
        </div>

      </div>
    )
  }
}

export default Settings