const State = {
  threads: [
    {
      topic: 2,
      active: 1
    },
    {
      topic: 3,
      active: 1
    },
    {
      topic: 6,
      active: 1
    }
  ]
}

const uiReducer = (state = State, action) => {
  const { type, payload } = action;

  switch (type) {

    case 'UI_SET_THREAD_ACTIVE': {
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
    
    case 'UI_SET_THREAD_PREVIOUS': {
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
    
    case 'UI_SET_THREAD_NEXT': {
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