import { update, updateIn } from 'timm';

/**
 * STATE IS THE WHOLE STORE TREE
*/
const rootReducer = (state, action) => {
  const { type, payload } = action;
  const { threads, router } = state;
  const activeThreadRouteId = parseInt(router.location.pathname.replace('/thread/', ''), 10);
  
  switch (type) {
    
    case 'SOCKET_THREADS_ON_CREATED': {

      // ONLY ADD DATA THAT MATCHES THE TOPIC ID THE USER IS CURRENTLY VIEWING
      if (activeThreadRouteId && activeThreadRouteId === payload.topic_id) {
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

    case 'SOCKET_THREADS_ON_REMOVED': {

      // ONLY REMOVE DATA THAT MATCHES THE TOPIC ID THE USER IS CURRENTLY VIEWING
      if (activeThreadRouteId && activeThreadRouteId === payload.topic_id) {
        return {
          ...state,
          threads: updateIn(threads, ['queryResult', 'data'], (data) => {
            return data.filter(item => item.id !== payload.id);
          })
        }
      }
      else {
        return state;
      }

    }

    case 'SOCKET_COMMENTS_ON_CREATED': {

      return {
        ...state,
        threads: updateIn(threads, ['queryResult', 'data'], (data) => {
          return data.map(item => {
            if (item.id === payload.thread_id) {
              let updatedObj = update(item, '_comments', (comments) => [payload].concat(comments));
              return updatedObj;
            }

            return item;
          })
        })
      }
    }

    case 'SOCKET_COMMENTS_ON_REMOVED': {

      return {
        ...state,
        threads: updateIn(threads, ['queryResult', 'data'], (data) => {
          return data.map(item => {
            if (item.id === payload.thread_id) {
              let updatedObj = update(item, '_comments', (comments) => comments.filter(comment => comment.id !== payload.id));
              return updatedObj;
            }

            return item;
          })
        })
      }

    }

    case 'SOCKET_COMMENTS_ON_PATCHED': {

      return {
        ...state,
        threads: updateIn(threads, ['queryResult', 'data'], (data) => {
          return data.map(item => {
            if (item.id === payload.thread_id) {
              let updatedObj = update(item, '_comments', (comments) => {
                return comments.map(comment => {
                  if (comment.id === payload.id) {
                    return payload;
                  }
                  return comment;
                })
              });
              return updatedObj;
            }

            return item;
          })
        })
      }
    }

    default: return state;
  }

}

export default rootReducer;