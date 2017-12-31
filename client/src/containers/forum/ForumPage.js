import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { services } from 'util/feathers'
import { Title, LineText } from './common'


class ForumPage extends React.Component {
  state = {
    posts: []
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
      // console.log('.then forum find ', action)
      this.setState({
        posts: action.payload.data
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

            <div className="list-group list-group-flush">
              {
                this.state.posts.map(item => {
                  let postDate = new Date(item.updated_at).toDateString()

                  return (
                    <div key={item.id} className="list-group-item">
                      <Link to={`/forum/${topicId}/individual/${item.id}`}><Title className="text-left mb-3">{item.title}</Title></Link>
                      <LineText className="text-left">ID: {item.creator_id} - <i className="fa fa-github m-1"></i> {item._user.data[0].email}</LineText>
                      <LineText className="text-left">
                        
                        <span className="mr-2">{postDate}</span>
                        <span className="mr-2">-</span>
                        <span className="mr-2">{item._comments.total} comments</span>
                      </LineText>
                    </div>
                  )    
                })
              }
            </div>

          </div>
        </div>

        <Link to={this.props.location.pathname + '/create'} className="col-2">
            <button className="btn btn-outline-info pointer">New Discussion</button>
        </Link>
        
      </div>
    )
  }
}

export default connect(null)(ForumPage)