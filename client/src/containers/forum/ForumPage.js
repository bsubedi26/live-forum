import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { services } from 'util/feathers'
import { ForumList } from './common'


class ForumPage extends React.Component {
  state = {
    forums: []
  }
  componentDidMount() {
    const { topicId } = this.props.match.params
    this.dispatchFind(topicId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { topicId } = nextProps.match.params
      this.dispatchFind(topicId)
    }
  }

  dispatchFind(topicId) {
    const { dispatch } = this.props

    dispatch(services.forum.find({ query: { topic_id: topicId } }))
    .then(({ action }) => {
      console.log(action.payload);
      this.setState({
        forums: action.payload.data
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    const { topicId } = this.props.match.params

    return (
      <div className="row mx-auto w-75 mt-4">

        <div className="col-10">
          <div className="card">
            <div className="card-header">
              Discussions
            </div>

            <ForumList forums={this.state.forums} topicId={topicId} />
          </div>
        </div>

        <Link to={`${this.props.location.pathname}/create`} className="col-2">
            <button className="btn btn-outline-info pointer">New Discussion</button>
        </Link>
        
      </div>
    )
  }
}

export default connect(null)(ForumPage)