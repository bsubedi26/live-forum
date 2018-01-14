import { update, updateIn } from 'timm';

/**
 * STATE IS THE WHOLE STORE TREE
*/
const rootReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SOCKET_COMMENTS_ON_CREATE': {
      const { threads } = state;
      
      return {
        ...state,
        threads: updateIn(threads, ['queryResult', 'data'], (data) => {
          return data.map(item => {
            if (item.id === payload.thread_id) {
              let newObj = update(item, '_comments', (comments) => [payload].concat(comments));
              return newObj;
            }

            return item;
          })
        })
      }
    }
    case 'SOCKET_THREADS_ON_CREATE': {
      const { threads } = state;

      // ONLY ADD DATA THAT MATCHES THE TOPIC ID THE USER IS CURRENTLY VIEWING
      if (payload.topic_id === threads.queryResult.data[0].topic_id) {
        return {
          ...state,
          threads: updateIn(threads, ['queryResult', 'data'], (data) => {
            return [payload].concat(data);
          })
        }
      }
      else {
        return state;
      }
      
    }
    default: return state;
  }

}

export default rootReducer;