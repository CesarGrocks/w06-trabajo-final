require('../models')
const request  = require("supertest")
const app = require('../app')

let TOKEN
let categoryId

const BASE_URL = '/api/v1/categories'

const category = {
    name: "Television"
}

//obteniendo hits  (token antes de las pruebas)
beforeAll(async () => {
    const BASE_URL2 = '/api/v1/users'
    const user = {
        email: "angus@gmail.com",
        password: "angus1234"
    }

    const res = await request(app)
       .post(`${BASE_URL2}/login`)
       .send(user)

       TOKEN = res.body.token;

})

//POST Create🔒
test("POST -> BASE_URL, should return statusCode 201, and res.body.name === category.name", async () => {

  const res = await request(app)
         .post(BASE_URL)
         .send(category)
         .set('Authorization', `Bearer ${TOKEN}`)


         expect(res.statusCode).toBe(201)
         expect(res.body).toBeDefined()
         expect(res.body.name).toBeDefined()
         expect(res.body.name).toBe(category.name)

})

//GET GetAll
test("GET --> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {

 const res = await request(app)
       .get(BASE_URL)
    

       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
       expect(res.body).toHaveLength(1)
})

//DELTE Delete🔒
test("DELETE --> BASE_URL, should return status 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

        expect(res.statusCode).toBe(204)
      
})