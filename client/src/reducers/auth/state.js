const state = {
  isError: null,
  isPending: false,
  
  accessToken: null,
  email: null,
  id: null,
  oAuth: {},
  decodedToken: {
    aud: null,
    exp: null,
    iat: null,
    iss: null,
    jti: null,
    sub: null,
    userId: null
  }
}

export default state
