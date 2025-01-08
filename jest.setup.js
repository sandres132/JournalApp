import { TextDecoder, TextEncoder } from 'util';
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require('dotenv').config({
    path: '.env.test'
})

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({...process.env})
}))