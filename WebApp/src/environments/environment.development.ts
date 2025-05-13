import { IEnvironment } from './environment.interface'

export const environment: IEnvironment = {
    baseUrl: 'http://localhost:5165/api',
    ssrUrl: 'http://localhost:4300',
    redirectAuth: false,
    development: true,
}
