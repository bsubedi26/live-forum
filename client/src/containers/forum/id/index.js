import React from 'react'
import { connect } from 'react-redux'
import { Title, LineText } from '../common'
import { services } from 'util/feathers'

class ForumDetailById extends React.Component {
  state = {
    comment: '',
    comments: []
  }
  componentDidMount() {
    const { dispatch } = this.props
    const { id } = this.props.match.params
    
    dispatch(services.comment.find({ query: { forum_id: id } }))
    .then(({ value }) => {
      this.setState({ comments: value.data })
    })
    .catch(err => console.log(err))
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  createComment = (e) => {
    e.preventDefault()
    const { dispatch, post, auth } = this.props
    const { comment } = this.state
    const payload = { comment, forum_id: post.id, creator_id: auth.id, creator_email: auth.email }

    dispatch(services.comment.create(payload))
  }

  renderCommentForm() {
    const { auth } = this.props

    if (auth.id) {
      return (
        <div className="mt-3 card">
          <form onSubmit={this.createComment} noValidate>
            <textarea id="comment" onChange={this.handleOnChange} className="form-control" rows="2" placeholder="Comment..."></textarea>
            <div className="card-footer text-muted">
              <button className="btn btn-outline-info">Submit</button>
            </div>
          </form>
        </div>
      )
    }
    else {
      return (
        <div className="p-3 text-danger">
          <h5>You <em>must</em> be signed in before posting a comment.</h5>
        </div>
      )
    }
  }


  render() {
    const { post } = this.props
    let postDate = new Date(post.updated_at).toDateString()

    return (
      <div className="mx-auto w-75 mt-4">
        <div className="card">
          <div className="card-header">
            <Title>{ post.title }</Title>
          </div>

          <div className="text-center">
            <p className="mt-2">
              {post.summary}
            </p>
            <LineText>ID: {post.creator_id} - <i className="fa fa-github m-1"></i> {post.creator_email}</LineText>
            <LineText>
              <span className="mr-2">{postDate}</span>
              <span className="m-2">{post.favorites} favorites</span>
              <span className="m-2">{post.opinions} opinions</span>
          </LineText>
          </div>

        </div>

        { this.renderCommentForm() }

        <hr />

        {this.state.comments && this.state.comments.map((item, i) => {
          return (
            <div key={i} className="card">
              <div className="card-header">
                <Title>{item.creator_email}</Title>
              </div>

              <div className="text-center">
                <p className="mt-2">
                  {item.comment}
                </p>
                <LineText>ID: {item.creator_id} - <i className="fa fa-github m-1"></i> {item.creator_email}</LineText>
                <LineText>
                  <span className="mr-2">7 months ago</span>
                  {/* <span className="m-2">{item.favorites} favorites</span> */}
                  {/* <span className="m-2">{post.opinions} opinions</span> */}
              </LineText>
              </div>

            </div>
          )
        })}
        
        

      </div>
    )
  }
}

const findById = (data, props) => {
  const { id } = props.match.params
  return data.find(item => item.id === parseInt(id, 10))
}

const mapState = (state, props) => ({
  post: findById(state.forum.queryResult.data, props),
  auth: state.auth
})

export default connect(mapState)(ForumDetailById)