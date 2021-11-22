import axios, { AxiosResponse } from 'axios'

import { ErrorResponse } from '../util/error'

const API_URL: string =
  process.env.NODE_ENV == 'production'
    ? 'https://api.juno.com.br'
    : 'https://sandbox.boletobancario.com/api-integration'

export interface ChargesResponse {
  _embedded: EmbeddedCharges
}

export interface EmbeddedCharges {
  charges: EmbeddedItemCharges[]
}

export interface EmbeddedItemCharges {
  id: string
  code: Number
  reference: string
  dueDate: string
  checkoutUrl: string
  amount: Number
}

export interface Link {
  self: Object
}

export interface ChargesItem {
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

export interface ChagesRequest {
  charge: Charge
  billing: ChargesBilling
}

export interface Charge {
  description: string
  references: string[]
  amount: Number
  dueDate: string
  installments: Number
  maxOverdueDays?: Number
  fine?: string
  interest?: string
  discountAmount?: string
  discountDays?: Number
  paymentTypes: string[]
  paymentAdvance?: boolean
}

export interface ChargesBilling {
  name: string
  document: string
  email: string
  birthDate: string
}

export const Create = async (
  dataRequest: ChagesRequest,
  jwt: string,
  priv_token: string,
) => {
  console.log(dataRequest)
  try {
    const { data } = await axios({
      url: `${API_URL}/charges`,
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
    return data as ChargesResponse
  } catch (err:any) {
    throw err.response?.data
  }
}
