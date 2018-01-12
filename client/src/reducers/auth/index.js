import initialState from './state';
import feathers from 'util/feathers';
const user = feathers.service('user');
const oauth = feathers.service('oauth');

const types = {
  AUTHENTICATE: 'AUTH/AUTHENTICATE',
  AUTH_RESET: 'AUTH/RESET',

  SIGNUP: 'AUTH/SIGNUP',
  VERIFY_JWT: 'AUTH/VERIFY_JWT',
  CURRENT_USER: 'AUTH/CURRENT_USER',
  OAUTH_GET: 'AUTH/OAUTH_GET',
  USER_GET: 'AUTH/USER_GET',
  LOGOUT: 'AUTH/LOGOUT'
}

export const actions = {
  signup(payload) {
    return dispatch => {
      return dispatch({ type: types.SIGNUP, payload: user.create(payload) });
    }        
  },
  authenticate(payload) {
    return (dispatch, getState) => {

      return dispatch({ type: types.AUTHENTICATE, payload: feathers.authenticate(payload) })
      .then(response => {
        dispatch({ type: types.VERIFY_JWT, payload: feathers.passport.verifyJWT(response.value.accessToken)});
        return Promise.resolve(response);
      })
      .then(response => {
        const { id } = getState().auth;
        dispatch({ type: types.USER_GET, payload: user.get(id) });
        return Promise.resolve(response);   
      })
      .catch(error => {
        return Promise.reject(error);
      })
    }        
  },
  verifyJwtOAuth() {
    const accessToken = window.localStorage.getItem('feathers-jwt');

    return dispatch => {
      // feathers.passport.getJWT().then()
      return dispatch({ type: types.VERIFY_JWT, payload: feathers.passport.verifyJWT(accessToken)})
      .then(response => {
        const { userId } = response.value;
        dispatch({ type: types.OAUTH_GET, payload: oauth.get(userId) });
        // oauth.get(userId)
        // .then(res => console.log('OAUTH ', res))
        // .catch(res => console.log('OAUTH ERR ', res))
        return Promise.resolve(response);      
      })
      .catch(error => {
        console.log('ERROR ', error);
        return Promise.reject(error);
      })
    }
    
  },
  logout() {
    return dispatch => {
      dispatch({ type: types.AUTH_RESET });
      window.localStorage.removeItem('persist:primary');
      // window.localStorage.clear()
      return dispatch({ type: types.LOGOUT, payload: feathers.logout() });
    }
  }
}


export default function reducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `${types.AUTHENTICATE}_PENDING`: {
      return {
        ...state,
        isPending: true
      }
    }

    case `${types.AUTHENTICATE}_REJECTED`: {
      return {
        ...state,
        isPending: false,
        isError: payload
      }
    }

    case `${types.AUTHENTICATE}_FULFILLED`: {
      const { accessToken } = payload;
      return {
        ...state,
        isPending: false,
        isError: null,
        accessToken
      }
    }

    case `${types.VERIFY_JWT}_FULFILLED`: {
      return {
        ...state,
        isError: null,
        decodedToken: payload,
        id: payload.userId
      }
    }

    case `${types.OAUTH_GET}_FULFILLED`: {
      let { id, githubId, github } = payload;
      github = (typeof github === 'string') ? JSON.parse(github) : github;

      return {
        ...state,
        isError: null,
        oAuth: {
          ...state.oAuth,
          id,
          githubId,
          github
        }
      }
    }
    
    case `${types.USER_GET}_FULFILLED`: {
      return {
        ...state,
        email: payload.email
      }
    }
    
    case types.CURRENT_USER: {
      return {
        ...state,
        email: payload
      }
    }

    case types.AUTH_RESET: {
      return {
        ...initialState
      }
    }

    default: return state
  }
}
