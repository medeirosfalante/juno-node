import axios from 'axios'
import { ErrorResponse } from '../util/error'

const API_URL: string =
  process.env.NODE_ENV == 'production'
    ? 'https://api.juno.com.br/authorization-server'
    : 'https://sandbox.boletobancario.com/authorization-server'

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: Number
  scope: string
  user_name: string
  jti: string
}

export const getToken = async (clientId: string, clientSecret: string) => {
  const dataParm = new URLSearchParams()
  dataParm.append('grant_type', 'client_credentials')
  try {
    const { data } = await axios({
      url: `${API_URL}/oauth/token`,
      method: 'POST',
      auth: {
        username: clientId,
        password: clientSecret,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: dataParm,
      withCredentials: true,
    })
    return data as TokenResponse
  } catch (err:any) {
    throw err.response?.data
  }
}
