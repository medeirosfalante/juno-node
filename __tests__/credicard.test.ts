import * as dotenv from 'dotenv'
import * as path from 'path'

import {
  Payments,
  PaymentsRequest,
  PaymentsBilling,
  PaymentsAddress,
  PaymentsCreditCardDetails,
} from '../src/credicard'
import axios, { AxiosResponse } from 'axios'
import { getToken } from '../src/auth'

beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  dotenv.config({ path: path.resolve(__dirname + '/../.env.testing') })
})

describe('testing credicard file', () => {
  test('create payments', async () => {
    let address: PaymentsAddress = {
      street: 'Rua Professor Jacy Monteiro',
      number: '12',
      complement: '',
      neighborhood: 'Jardim Avelino',
      city: 'São Paulo',
      state: 'SP',
      postCode: '03226-090',
    }
    let creditCardDetails: PaymentsCreditCardDetails = {
      creditCardHash: '2222222',
    }

    let billing: PaymentsBilling = {
      email: 'milenanairduarte..milenanairduarte@cielo.com.br',
      address: address,
    }
    let request: PaymentsRequest = {
      chargeId: '54545454545454545454545454545',
      billing: billing,
      creditCardDetails: creditCardDetails,
    }
    const responseToken = await getToken(
      process.env?.CLIENT_ID as string,
      process.env?.CLIENT_SECRET as string,
    )
    const response = await Payments(
      request,
      responseToken.access_token,
      process.env.PRIV_TOKEN as string,
    )
    expect(response.transactionId).not.toBe('')
  })
})
