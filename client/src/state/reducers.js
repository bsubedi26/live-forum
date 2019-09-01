import Services from '../services'
import { addReducer } from 'reactn'

addReducer('user/authenticate', async (state, dispatch, payload) => {
  try {
    const response = await Services.User.authenticate(payload)
    return {
      auth: response
    }
  } catch (error) {
    return {
      error
    }
  }
})
