import * as dotenv from 'dotenv'
import * as path from 'path'

import { ChargesResponse } from '../src/charges'

import * as charges from '../src/charges'
import axios, { AxiosResponse } from 'axios'
import { getToken, TokenResponse } from '../src/auth'

beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  dotenv.config({ path: path.resolve(__dirname + '/../.env.testing') })
})

describe('testing charges file', () => {
  test('create payments', async () => {
    try {
      let chargeRef: charges.Charge = {
        references: ['Avista'],
        amount: 10,
        dueDate: '2021-11-30',
        installments: 1,
        paymentTypes: ['CREDIT_CARD'],
        paymentAdvance: false,
        description: 'CREDIT CARD SAMPLE',
      }

      let address: charges.ChargesBilling = {
        name: 'Exemplo de Nome',
        document: '7129484220',
        email: 'sabrinalauraassis_@ipk.org.br',
        birthDate: '1982-08-05',
      }

      let request: charges.ChagesRequest = {
        charge: chargeRef,
        billing: address,
      }
      const responseToken = (await getToken(
        process.env?.CLIENT_ID as string,
        process.env?.CLIENT_SECRET as string,
      )) as TokenResponse
      const response = (await charges.Create(
        request,
        responseToken.access_token,
        process.env.PRIV_TOKEN as string,
      )) as ChargesResponse
      expect(response._embedded.charges[0].id).not.toBe('')
    } catch (err) {
      expect(err).toBeNull()
    }
  })
})
