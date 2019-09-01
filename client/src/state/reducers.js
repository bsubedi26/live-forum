import app from 'util/feathers/app'
import { addReducer } from 'reactn'

addReducer('user/authenticate', async (state, dispatch, payload) => {
  try {
    const response = await app.authenticate(payload)
    // console.log('response: ', response)
    return {
      auth: response
    }
  } catch (error) {
    // console.log('error: ', error)
    return {
      error
    }
  }
})
