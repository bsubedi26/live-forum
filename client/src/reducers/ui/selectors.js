export const findActiveThread = (state, props) => {
  const topic = props.match.params.topicId;
  const result = state.ui.threads.find(item => item.topic === parseInt(topic, 10));
  return result;
}