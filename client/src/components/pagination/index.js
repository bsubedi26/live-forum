import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {

  state = {
    show: true,
    itemsPerPage: this.props.itemsPerPage
  }

  setActive(active, e) {
    e.preventDefault();
    const { dispatch, match, name } = this.props;
    const topic = match.params.topicId;
    const type = `UI_SET_${name.toUpperCase()}_ACTIVE`;

    dispatch({ type, payload: { topic, active } });
  }

  handlePrevious = (e) => {
    e.preventDefault();
    const { dispatch, match, name } = this.props;
    const topic = match.params.topicId;
    const type = `UI_SET_${name.toUpperCase()}_PREVIOUS`;

    dispatch({ type, payload: { topic } });
  }

  handleNext = (e) => {
    e.preventDefault();
    const { dispatch, match, name } = this.props;
    const topic = match.params.topicId;
    const type = `UI_SET_${name.toUpperCase()}_NEXT`;

    dispatch({ type, payload: { topic } });
  }


  componentWillReceiveProps(nextProps) {
    // HACK FIX TO SHOW ACTIVE PAGINATED NUMBER WITHOUT LAG ON ROUTE CHANGE
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ show: false });
      setTimeout(() => { this.setState({ show: true }) }, 200);
    }
  }

  renderNavPagination() {
    const { activeThread, data } = this.props;
    const { itemsPerPage } = this.state;

    let navListCmps = [];
    let counter = 1;

    for (let i = 0; i < data.length; i += itemsPerPage) {
      navListCmps.push(
        <li
          className={`page-item pointer ${this.state.show ? (activeThread.active === counter ? 'active' : null) : null}`}
          key={i} onClick={this.setActive.bind(this, counter)}
        >
          <a className="page-link">{counter}</a>
        </li>
      )
      counter++;
    }
    return navListCmps;
  }

  renderPrevious() {
    const { activeThread } = this.props;
    if (activeThread.active === 1) {
      return (
        <li style={{ cursor: 'not-allowed' }} className="page-item disabled"><a className="page-link">{"<<"}</a></li>
      )
    }
    else {
      return (
        <li onClick={this.handlePrevious} className="page-item pointer"><a className="page-link">{"<<"}</a></li>
      )
    }

  }

  renderNext() {
    const { data, activeThread } = this.props;
    const { itemsPerPage } = this.state;
    let lastIndex = Math.ceil(data.length / itemsPerPage);

    if (activeThread.active === lastIndex) {
      return (
        <li style={{ cursor: 'not-allowed' }} className="page-item disabled"><a className="page-link">{">>"}</a></li>
      )
    }
    else {
      return (
        <li onClick={this.handleNext} className="page-item pointer"><a className="page-link">{">>"}</a></li>
      )
    }

  }

  render() {
    console.log(`PROPS for ${this.props.name}: `, this.props);
    return (
      <div className="flex flex-row justify-content-center pa2">
        <nav>
          <ul className="pagination">
            {this.renderPrevious()}
            {this.renderNavPagination()}
            {this.renderNext()}
          </ul>
        </nav>
      </div>
    )
  }
}

Pagination.propTypes = {
  activeThread: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  itemsPerPage: PropTypes.any.isRequired
};


export default Pagination;