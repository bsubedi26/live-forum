import app from '../util/feathers'

const ThreadService = app.service('threads')

export const find = (payload) => ThreadService.find(payload)
export const findByTopicId = (topicId) =>
  ThreadService.find({ query: { topic_id: topicId, $sort: { updated_at: '-1' } } })
