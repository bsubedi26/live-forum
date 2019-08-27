import * as _User from './User'
import * as _Thread from './Thread'
import * as _Topic from './Topic'
import * as _Comment from './Comment'

import BaseCrud from './_Base'

export const User = BaseCrud(_User)
export const Thread = BaseCrud(_Thread)
export const Topic = BaseCrud(_Topic)
export const Comment = BaseCrud(_Comment)

const Services = {
  User,
  Thread,
  Topic,
  Comment
}

export default Services
