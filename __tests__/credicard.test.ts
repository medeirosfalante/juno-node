import * as dotenv from 'dotenv'
import * as path from 'path'

import {
  Payments,
  PaymentsRequest,
  PaymentsBilling,
  PaymentsAddress,
  PaymentsCreditCardDetails,
  PaymentsResponse,
} from '../src/credicard'

import {
  ChargesResponse
} from '../src/charges'

import * as charges from '../src/charges'

import * as credicard from '../src/credicard'
import axios, { AxiosResponse } from 'axios'
import { getToken, TokenResponse } from '../src/auth'


beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  dotenv.config({ path: path.resolve(__dirname + '/../.env.testing') })
})

describe('testing credicard file', () => {
  test('create payments', async () => {
    try {

      let changeRef : charges.Charge = {
        references: ["Avista"],
        amount: 10,
        dueDate: "2021-11-30",
        installments: 1,
        paymentTypes:["CREDIT_CARD"],
        paymentAdvance: false,
        description:"CREDIT CARD SAMPLE"
    }

    let addressCharges : charges.ChargesBilling = {
        name: "Exemplo de Nome",
        document: "71294842250",
        email: 'sabrinalauraassis_@ipk.org.br',
        birthDate: "1982-08-05",
    }

    let requestCharges: charges.ChagesRequest = {
        charge: changeRef,
        billing: addressCharges
      }
      const responseToken = await getToken(
        process.env?.CLIENT_ID as string,
        process.env?.CLIENT_SECRET as string,
      ) as TokenResponse
      const responseCharges = await charges.Create(
        requestCharges,
        responseToken.access_token,
        process.env.PRIV_TOKEN as string,
      ) as ChargesResponse
      let address: credicard.PaymentsAddress = {
        street: 'Rua Professor Jacy Monteiro',
        number: '12',
        complement: '',
        neighborhood: 'Jardim Avelino',
        city: 'São Paulo',
        state: 'SP',
        postCode: '03226090',
      }
      let creditCardDetails: PaymentsCreditCardDetails = {
        creditCardHash: '2222222',
      }

      let billing: credicard.PaymentsBilling = {
        email: 'milenanairduarte..milenanairduarte@cielo.com.br',
        address: address,
      }
      let request: credicard.PaymentsRequest = {
        chargeId: responseCharges._embedded.charges[0].id,
        billing: billing,
        creditCardDetails: creditCardDetails,
      }
      const response = await credicard.Payments(
        request,
        responseToken.access_token,
        process.env.PRIV_TOKEN as string,
      ) as PaymentsResponse
      expect(response.transactionId).not.toBe('')
    } catch (err) {
        expect(err).toBeNull()
    }
  })
})
