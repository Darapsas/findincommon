export const API_BASE_URL = 'http://192.168.99.100.nip.io:8080'
//export const API_BASE_URL = 'http://localhost:8080'
export const ACCESS_TOKEN = 'accessToken'

//export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const OAUTH2_REDIRECT_URI = 'http://192.168.99.100:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  '/oauth2/authorize/facebook?redirect_uri=' +
  OAUTH2_REDIRECT_URI
