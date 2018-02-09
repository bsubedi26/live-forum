import React from 'react';

const style = {
  container: {
    backgroundColor: '#0f7844'
  }
}

class ThreadHeader extends React.Component {

  renderTopic = topic => {
    return (
      <div style={style.container} className="py-4">
        <div className="container text-white text-center">
          <h3 className="display-4">{topic.display} Thread</h3>
          <div className="p-2">
            <p className="lead">
              Currently viewing {topic.name}.
            </p>
          </div>

        </div>
      </div>
    )
  }
  render() {
    const { topic } = this.props;
    
    return (
      <div>
        { topic && topic.display ? this.renderTopic(topic) : null }
      </div>
    );
  }
};

export default ThreadHeader;
