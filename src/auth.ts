import axios, { AxiosResponse } from 'axios'

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

export const getToken = async (
  clientId: string,
  clientSecret: string,
): Promise<TokenResponse> => {
  const data = new URLSearchParams()
  data.append('grant_type', 'client_credentials')
  return await axios({
    url: `${API_URL}/oauth/token`,
    method: 'POST',
    auth: {
      username: clientId,
      password: clientSecret,
    },
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en_US',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    data,
    withCredentials: true,
  }).then((response: AxiosResponse) => response.data as TokenResponse)
}
