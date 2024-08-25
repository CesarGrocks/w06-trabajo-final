const request = require("supertest")
const app = require('../app')

let TOKEN
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'  //esta es la ruta

const product = {
    title: 'Tv',
    description: 'easy access to your favorite apps',
    price: '250 usd'
}

beforeAll(async () => {

  const hits = {
    lastName: "Young",
    email: "angus@gmail.com",
  }

  const res = await request(app)
           .post(BASE_URL_LOGIN)
           .send(hits)

TOKEN = res.body.token 
//console.log(TOKEN)

})

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.title === product.title", async () => {
 
     
 

} )