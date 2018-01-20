import React from 'react';
import FormContainer from 'components/user/form';
import { actions as AuthActions } from 'reducers/auth';

class HeaderSection extends React.Component {

  handleSubmit = (values, setSubmitting) => {
    const { dispatch } = this.props;
    return dispatch(AuthActions.signup(values))
      .then(res => {
        setSubmitting(false);
        return res;
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }

  render () {
    return (
      <div>
        <header id="home-section">
          <div className="dark-overlay">
            <div className="home-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 d-none d-lg-block text-white">
                    <h1 className="display-4">
                        <strong>Live Forum</strong> is an application that demonstrates how a <em>realtime</em> forum works.
                    </h1>
                    <div className="row pt-2">
                      <div className="col">
                        <h2 className="display-5 text-left text-chocolate">Frontend:</h2>
                        <ul className="list-unstyled text-left">
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">React</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Redux</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Bootstrap</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Sass</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">SocketIO</span>
                          </li>
                          
                        </ul>
                      </div>
                      <div className="col">
                        <h2 className="display-5 text-left text-warning">Backend:</h2>
                        <ul className="list-unstyled text-left">
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Node</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Express</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Feathers</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">SQL</span>
                          </li>
                          <li>
                            <i className="fa fa-check m-2" />
                            <span className="h5">Knex</span>
                          </li>

                        </ul>

                      </div>
                    </div>

                  </div>

                  {/* FORM SECTION */}
                  <div className="col-lg-4">
                    <div className="card text-center card-form">
                      <div className="card-body">
                        <h3 className="fw-100">Join Now</h3>
                        <hr />
                        {/* <i className="fa fa-spinner fa-spin" aria-hidden="true" /> */}
                        <FormContainer btnBlock handleSubmit={this.handleSubmit} />
                      </div>
                    </div>
                  </div>
                  {/* END FORM SECTION */}

                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
};

export default HeaderSection;