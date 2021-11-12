import axios, { AxiosResponse } from 'axios'

const API_URL: string =
  process.env.NODE_ENV == 'production'
    ? 'https://api.juno.com.br'
    : 'https://sandbox.boletobancario.com/api-integration'

export interface PaymentsResponse {
  transactionId: string
  installments: Number
  payments: PaymentsItem[]
  _links: Link[]
}

export interface Link {
  self: Object
}

export interface PaymentsItem {
  id: string
  chargeId: string
  date: string
  releaseDate: string
  amount: Number
  fee: Number
  type: string
  status: string
  transactionId: string
  failReason: string
}

export interface PaymentsRequest {
  chargeId: string
  billing: PaymentsBilling
  creditCardDetails: PaymentsCreditCardDetails
}

export interface PaymentsBilling {
  email: string
  address: PaymentsAddress
}

export interface PaymentsAddress {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  postCode: string
}
export interface PaymentsCreditCardDetails {
  creditCardId?: string
  creditCardHash: string
}

export const Payments = async (
  data: PaymentsRequest,
  jwt: string,
  priv_token: string,
): Promise<PaymentsResponse> => {
  return await axios({
    url: `${API_URL}/payments`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Resource-Token': priv_token,
      Authorization: `Bearer ${jwt}`,
      'X-API-Version': '2',
    },
    data,
    withCredentials: true,
  })
    .then((response: AxiosResponse) => response.data as PaymentsResponse)
    .catch((e) => {
      console.log(e.response.data)
      return e
    })
}
