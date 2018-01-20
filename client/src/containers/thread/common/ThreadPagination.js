import React from 'react';

class ThreadPagination extends React.Component {

  state = {
    show: true,
    itemsPerPage: 5
  }

  setActive(active, e) {
    e.preventDefault();
    const { dispatch, match } = this.props;
    const topic = match.params.topicId;

    dispatch({ type: 'UI_SET_THREAD_ACTIVE', payload: { topic, active } });
  }

  handlePrevious = (e) => {
    e.preventDefault();
    const { dispatch, match } = this.props;
    const topic = match.params.topicId;

    dispatch({ type: 'UI_SET_THREAD_PREVIOUS', payload: { topic } });
  }

 handleNext = (e) => {
    e.preventDefault();
    const { dispatch, match } = this.props;
    const topic = match.params.topicId;
    
    dispatch({ type: 'UI_SET_THREAD_NEXT', payload: { topic } });
  }
  

  componentWillReceiveProps(nextProps) {
    // HACK FIX TO SHOW ACTIVE PAGINATED NUMBER WITHOUT LAG ON ROUTE CHANGE
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ show: false });
      setTimeout(() => { this.setState({ show: true }) }, 200);
    }
  }

  renderNavPagination() {
    const { activeThread, threads } = this.props;
    const { itemsPerPage } = this.state;

    let navListCmps = [];
    let counter = 1;

    for (let i = 0; i < threads.length; i += itemsPerPage) {
      navListCmps.push(
        <li 
          className={`page-item pointer ${ this.state.show ? (activeThread.active === counter ? 'active' : null) : null }`}
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
        <li style={{cursor: 'not-allowed'}} className="page-item disabled"><a className="page-link">{"<<"}</a></li>
      )
    }
    else {
      return (
        <li onClick={this.handlePrevious} className="page-item pointer"><a className="page-link">{"<<"}</a></li>
      )
    }
    
  }

  renderNext() {
    const { threads, activeThread } = this.props;
    const { itemsPerPage } = this.state;
    let lastIndex = Math.ceil(threads.length / itemsPerPage);

    if (activeThread.active === lastIndex) {
      return (
        <li style={{cursor: 'not-allowed'}} className="page-item disabled"><a className="page-link">{">>"}</a></li>
      )
    }
    else {
      return (
        <li onClick={this.handleNext} className="page-item pointer"><a className="page-link">{">>"}</a></li>
      )
    }
    
  }

  render() {
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

export default ThreadPagination;