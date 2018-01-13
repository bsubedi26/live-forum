import { update, updateIn } from 'timm';

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

      return {
        ...state,
        threads: updateIn(threads, ['queryResult', 'data'], (data) => {
          return [payload].concat(data);
          // return data.map(item => {
          //   if (item.id === payload.thread_id) {
          //     let newObj = update(item, '_comments', (comments) => comments.concat(payload));
          //     return newObj;
          //   }

          //   return item;
          // })
        })
      }
    }
    default: return state;
  }

}

export default rootReducer;