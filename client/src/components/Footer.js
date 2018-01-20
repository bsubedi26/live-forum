import React from 'react';

class Footer extends React.Component {
  render() {
    return (

      <div>
        {/* FOOTER */}
        <footer id="main-footer" className="bg-light text-dark">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="py-4">
                  <p className="text-right">Copyright © 2018 <a rel="noopener noreferrer" target="_blank" href="//github.com/bsubedi26">Bibek Subedi</a>
                    {/* <button data-toggle="modal" data-target="#contactModal" className="btn btn-outline-primary mx-2 pointer">Contact Us</button> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* MODAL */}
        <div id="contactModal" className="modal fade text-dark">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="contactModalTitle">
                  Contact Us
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary btn-block pointer">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Footer;