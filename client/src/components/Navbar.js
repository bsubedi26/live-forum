import React from 'react';
import { withRouter } from 'react-router-dom';
import { actions as AuthActions } from 'reducers/auth';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push, getLocation } from 'react-router-redux';
import Avatar from './Avatar';

const NavLink = styled.li`
  background-color: ${ prop =>  prop.activeTab ? 'beige' : '' };
`

class NavbarCmp extends React.Component {

  state = {
    isOpen: false,
    activeTab: this.props.location.pathname,
    guestLinks: [
      { id: 1, name: "home", path: "/home", display: "Home" },
      { id: 2, name: "react", path: "/thread/2", display: "React" },
      { id: 3, name: "redux", path: "/thread/3", display: "Redux" },
      { id: 6, name: "nodejs", path: "/thread/6", display: "NodeJS" }
    ]
  };

  // componentWillMount() {
  //   const { dispatch } = this.props
  //   dispatch(services.topics.find())
  //     .then(({ action }) => {
  //       console.log(action.payload.data);
  //       this.setState({ guestLinks: action.payload.data })
  //     })
  //     .catch(err => console.log(err))
  // }
  
  goRoute(path) {
    this.props.dispatch(push(path));
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  handleLogout = async (e) => {
    const { dispatch } = this.props;
    
    e.preventDefault();
    await dispatch(AuthActions.logout());
    dispatch(push('/home'));
  }
  
  renderAuthenticated = () => {
    const { auth } = this.props;

    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown pointer">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {/* <span>{ auth.email }</span> */}
            <Avatar avatar={auth.avatar} />
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a onClick={this.handleLogout} className="dropdown-item">Sign out</a>
          </div>
        </li>
      </ul>
    )
  }
  
  renderUnAuthenticated() {
    return (
      <div>
        <a onClick={this.goRoute.bind(this, '/login')} className="btn btn-outline-primary pointer mx-1 nav-user"><span>Login</span></a>
        <a onClick={this.goRoute.bind(this, '/signup')} className="btn btn-outline-info pointer mx-1 nav-user"><span>Signup</span></a>
      </div>
    )
  }


  render() {
    const { auth, routerLocation } = this.props;

    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <a onClick={this.goRoute.bind(this, '/home')} className="navbar-brand pointer">LiveForum</a>
        {/* HAMBURGER MENU TOGGLER FOR MOBILE */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            { this.state.guestLinks.map((link) => 
              (
                <NavLink activeTab={routerLocation.pathname.includes(link.path)} onClick={this.goRoute.bind(this, link.path)} className="nav-item pointer mx-2" key={link.name}>
                  <a className="nav-link">{link.display}</a>
                </NavLink>    
              )
            )}
      
          </ul>

          <form className="form-inline mr-5">
            { auth.email ? this.renderAuthenticated() : this.renderUnAuthenticated() }
          </form>
        </div>
      </nav>
    );
  }
}

const mapState = state => ({
  auth: state.auth,
  routerLocation: getLocation(state)
})

export default withRouter(connect(mapState)(NavbarCmp));
