import React from 'react';
import { connect } from 'react-redux';
import { services } from 'util/feathers';
import CreateForm from './CreateForm';

class ThreadCreatePage extends React.Component {
  state = {
    title: '',
    summary: ''
  }

  handleOnChange = (e) => this.setState({ [e.target.id]: e.target.value });

  handleCreateForum = (e) => {
    e.preventDefault();
    const { dispatch, auth } = this.props;
    const { topicId } = this.props.match.params;
    const { title, summary } = this.state;
    const payload = { title, summary, topic_id: topicId, creator_id: auth.id };
    
    dispatch(services.threads.create(payload));
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="mx-auto w-75 mt-4">
        <div className="card">
          <div className="card-header">
            <h5>You are creating a new post.</h5>
          </div>

          <div>
            { auth.accessToken ? 
              <CreateForm handleCreateForum={this.handleCreateForum} handleOnChange={this.handleOnChange} />
              : 
              <div className="p-2">
                <span>You <em>must</em> be signed in before creating a post.</span>
              </div>
            }
          </div>

        </div>
      </div>
    )
  }
}


const mapState = (state, props) => ({
  auth: state.auth
})

export default connect(mapState)(ThreadCreatePage);