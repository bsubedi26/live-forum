import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { services } from 'util/feathers';
import qs from 'query-string';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import './blog.css';

class Blog extends React.Component {
  state = {
    itemsPerPage: 5,
    active: 1
  }

  setStateAsync(payload) {
    return Promise.resolve(this.setState(payload));
  }

  getQuery = () => {
    const { itemsPerPage, active } = this.state;
    const $skip = active === 1 ? null : (active * itemsPerPage) - itemsPerPage;
    const query = { $limit: itemsPerPage, $skip };

    return query;
  }

  delay = (timer) => {
    return new Promise(resolve => setTimeout(resolve, timer));
  }

  async dispatchFind() {
    const { dispatch } = this.props;
    const query = this.getQuery();
    this.props.dispatch(showLoading('nav-top'));
    await this.delay(300);
    await dispatch(services.blog.find({ query }));
    this.props.dispatch(hideLoading('nav-top'));
  }

  parseLocationUrl = search => {
    const query = qs.parse(search);
    const active = parseInt(query.page, 10);
    return active;
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const { search } = nextProps.location;
      const active = this.parseLocationUrl(search);

      await this.setStateAsync({ active });
      this.dispatchFind();
    }
  }
  async componentDidMount() {
    const { search } = this.props.location;
    const active = this.parseLocationUrl(search);
    
    await this.setStateAsync({ active });
    this.dispatchFind();
  }

  handleBtnClick = active => {
    this.setState({ active });
    this.goRoute(`/blog?page=${active}`);
  }

  goRoute = (path) => {
    this.props.dispatch(push(path));
  }

  getButton = counter => {
    const { active } = this.state;

    return (
      <li className={`page-item pointer mx-1 ${active === counter ? 'pagination-active' : ''}`} key={counter} onClick={this.handleBtnClick.bind(this, counter)}>
        <a className="page-link">{counter}</a>
      </li>
    )
  }

  renderPaginationButtons = () => {
    const { blogs } = this.props;
    const { itemsPerPage } = this.state;

    // const pages = Math.ceil(blogs.total / itemsPerPage);
    var buttons = [];
    var counter = 1;

    for (var i = 0; i < blogs.total; i += itemsPerPage) {
      buttons.push(this.getButton(counter))
      counter++;
    }
    return buttons;
  }

  render() {
    return (
      <div>
        <h5>Blogs Pagination Example</h5>
        <div className="flex flex-row justify-content-center pa2">
          <nav>
            <ul className="pagination">
              {this.renderPaginationButtons()}
            </ul>
          </nav>
        </div>

        <ul>
          {this.props.blogs.data.map(blog => {
            return (
              <li className="list-unstyled text-left" key={blog.id} >
                <h4>{blog.id} - {blog.title}</h4>
                <hr />
                <h5 className="w-50">{blog.body}</h5>
              </li>
            )
          })}
        </ul>
            
      </div>
    )
  }
}

const mapState = state => ({
  blogs: state.blog.queryResult
})

export default connect(mapState)(Blog);
