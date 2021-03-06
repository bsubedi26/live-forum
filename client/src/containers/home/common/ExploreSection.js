import React from 'react'
import { Link } from 'react-router-dom'

class ExploreSection extends React.Component {
  render () {
    return (
      <div>
        {/* EXPLORE SECTION */}
        <div id='explore-section' className='py-5'>
          <div className='container text-white text-center'>
            <h3 className='display-4'>Explore</h3>
            <div className='p-2'>
              <p className='lead'>
                Live Forum is an application that demonstrates how a realtime forum works. It uses feathersJS as a service/model layer to persist to sql database and retrieves realtime notification using socketIO.
              </p>
            </div>
            <Link to='/thread/1' className='btn btn-outline-light pointer'>Find Out More</Link>
          </div>
        </div>

        {/* EXPLORE & CONNECT */}
        {/* <div id="explore-connect-section" className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img alt="mobile phone" src={require("assets/images/phone.jpeg")} className="img-fluid rounded-circle" />
              </div>
              <div className="col-md-6 text-dark pt-2">
                <h4 className="display-5 text-center text-md-left">Explore &amp; Connect</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                </p>
                <div className="row">
                  <div className="col-2 text-center">
                    <i className="fa fa-check bg-dark text-white mt-2" />
                  </div>
                  <div className="col-10">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 text-center">
                    <i className="fa fa-check bg-dark text-white mt-2" />
                  </div>
                  <div className="col-10">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* END EXPLORE & CONNECT */}

      </div>
    )
  }
};

export default ExploreSection
