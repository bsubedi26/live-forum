import React from 'react'
import { connect } from 'react-redux'
import { services } from 'util/feathers'

class ForumCreatePage extends React.Component {
  state = {
    title: '',
    summary: ''
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleCreateForum = (e) => {
    e.preventDefault()
    const { dispatch, auth } = this.props
    const { topic } = this.props.match.params
    const { title, summary } = this.state
    const payload = { title, summary, topic, creator_email: auth.email, creator_id: auth.id }

    
    dispatch(services.forum.create(payload))
    console.log('created!')
  }

  renderUnAuth() {
    return (
      <div className="p-2">
        <span>You <em>must</em> be signed in before creating a post.</span>
      </div>
    )
  }
  renderForm() {
    return (
      <div>
        <form onSubmit={this.handleCreateForum} noValidate>
          <input id="title" onChange={this.handleOnChange} className="form-control my-2" placeholder="Forum Title" />
          <textarea id="summary" onChange={this.handleOnChange} className="form-control my-2" rows="3" placeholder="Forum Summary"></textarea>
          <button className="btn btn-outline-info my-2">Submit</button>
        </form>
      </div>
    )
  }
  render() {
    const { topic } = this.props.match.params
    const { auth } = this.props

    return (
      <div className="mx-auto w-75 mt-4">
        <div className="card">
          <div className="card-header">
            
            <h5>You are creating a new post on <em>{topic}</em> forum.</h5>
          </div>

          <div>
            { auth.accessToken ? this.renderForm() : this.renderUnAuth() }
          </div>

        </div>
      </div>
    )
  }
}

const mapState = state => ({
  auth: state.auth
})
export default connect(mapState)(ForumCreatePage)