import React from 'react';
import { push } from 'react-router-redux';

class ScrollerItem extends React.Component {
  static defaultProps  = {
    color: 'green'
  }

  render() {
    const { color, dispatch } = this.props;

    return (
      <div>
        <div style={{ backgroundColor: color }} className="py-4">
          <div className="container text-white text-center">
            <h3 className="display-4">Infinite Scroll Example</h3>
            <div className="p-2">
              <p className="lead">
                Scroll down to see the action.
              </p>
            </div>
            <button onClick={() => dispatch(push('/thread/1'))} className="btn text-dark btn-white pointer">Go To Threads</button>
          </div>
        </div>
      </div>
    );
  }
};

export default ScrollerItem;
