import axios, { AxiosResponse } from 'axios'

import { ErrorResponse } from '../util/error'

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
  dataRequest: PaymentsRequest,
  jwt: string,
  priv_token: string,
) => {
  try {
    const { data } = await axios({
      url: `${API_URL}/payments`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Resource-Token': priv_token,
        Authorization: `Bearer ${jwt}`,
        'X-API-Version': '2',
      },
      data: dataRequest,
      withCredentials: true,
    })
    return data as PaymentsResponse
  } catch (err:any) {
    throw err.response?.data
  }
}
