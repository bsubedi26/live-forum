const State = {
  threads: []
}

const uiReducer = (state = State, action) => {
  const { type, payload } = action;

  switch (type) {

    case 'UI_UPDATE_THREADS_TOPICS': {
      const { data } = payload;

      if (Array.isArray(data)) {
        return {
          ...state,
          threads: data.map(topic => {
            let obj = {};
            obj.topic = topic.id;
            obj.active = 1;
            return obj;
          })
        }
      }
      else {
        let obj = {};
        obj.topic = payload.id;
        obj.active = 1;
        return {
          ...state,
          threads: state.threads.concat(obj)
        }
      }
      
    }

    case 'UI_SET_THREADS_ACTIVE': {
      const { active, topic } = payload;

      return {
        ...state,
        threads: state.threads.map(item => {
          if (item.topic === parseInt(topic, 10)) {
            let newObj = {...item};
            newObj.active = active;
            return newObj;
          }

          return item;
        })
      }
    }
    
    case 'UI_SET_THREADS_PREVIOUS': {
      const { topic } = payload;

      return {
        ...state,
        threads: state.threads.map(item => {
          if (item.topic === parseInt(topic, 10)) {
            let newObj = {...item};
            newObj.active = item.active - 1;
            return newObj;
          }

          return item;
        })
      }
    }
    
    case 'UI_SET_THREADS_NEXT': {
      const { topic } = payload;
      
      return {
        ...state,
        threads: state.threads.map(item => {
          if (item.topic === parseInt(topic, 10)) {
            let newObj = {...item};
            newObj.active = item.active + 1;
            return newObj;
          }

          return item;
        })
      }
    }

    default: return state;
  }

}

export default uiReducer;