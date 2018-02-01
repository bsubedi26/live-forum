import React from 'react';
import { connect } from 'react-redux';
import { services } from 'util/feathers';
import CreateThreadForm from 'components/thread/CreateThreadForm';
import { FadeIn } from 'animate-css-styled-components';

class ThreadCreatePage extends React.Component {
  state = {
    title: '',
    summary: '',
    showSuccess: false
  }

  handleOnChange = (e) => this.setState({ [e.target.id]: e.target.value });

  handleCreateForum = async (e) => {
    e.preventDefault();
    const { dispatch, auth } = this.props;
    const { topicId } = this.props.match.params;
    const { title, summary } = this.state;
    const payload = { title, summary, topic_id: parseInt(topicId, 10), creator_id: auth.id };
    
    await dispatch(services.threads.create(payload));
    this.setState({ showSuccess: true });
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="mx-auto w-75 mt-4">
        <div className="card">
          <div className="card-header">
            <h5>You are creating a new post.</h5>
          </div>

          {this.state.showSuccess ?
            <FadeIn>
              <div style={{fontWeight: 'bold'}} className="alert alert-success m-4 fade show" role="alert">Successfully created thread!</div>
            </FadeIn>
            : null
          }

          <div>
            { auth.accessToken ? 
              <CreateThreadForm onSubmit={this.handleCreateForum} onChange={this.handleOnChange} />
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