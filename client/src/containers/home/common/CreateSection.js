import React from 'react';
import { Link } from 'react-router-dom'
class CreateSection extends React.Component {
  render() {
    return (
      <div>
        <div id="create-section" className="py-4">
          <div className="container text-white text-center">
            <h1 className="display-4">Create</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
            </p>
            <Link to='/thread/2' className='btn btn-outline-light pointer'>Find Out More</Link>
          </div>
        </div>
        <div id="create-passion-section" className="py-4">
          <div className="container text-white">
            <div className="row">
              <div className="col-md-6">
                <h4 className="display-5 text-center text-md-left">Create & View Live</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                </p>
                <div className="row">
                  <div className="col-2 text-center">
                    <i className="fa fa-check mt-2" />
                  </div>
                  <div className="col-10">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 text-center">
                    <i className="fa fa-check mt-2" />
                  </div>
                  <div className="col-10">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <img alt="tablet" src={require("assets/images/tablet.jpeg")} className="img-fluid rounded-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateSection;