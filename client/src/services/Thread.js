import app from '../util/feathers'

export const SERVICE_NAME = 'threads'
export const Service = app.service(SERVICE_NAME)

export const findByTopicId = (topicId) =>
  Service.find({ query: { topic_id: topicId, $sort: { updated_at: '-1' } } })
