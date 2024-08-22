const request  = require("supertest")
const app = require('../app')

const BASE_URL = '/api/v1/users'

//obteniendo hits
beforeAll(async () => {
    const user = {
        email: "angus@gmail.com",
        password: "angus1234"
    }

    const res = await request(app)
       .post(`${BASE_URL}/`)
       .send(user)

       TOKEN = res.body.TOKEN
})

const user = {
    firstName: "Pepe",
    lastName: "Grillo",
    email: "pepe@gmail.com",
    password: "pepe1234",
    phone: "+529936555"
}

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {

   const columns = ['firstName', 'lastName', 'email', 'password', 'phone']  //resolver esto con foreach
   const res = await request(app)
     .post(BASE_URL)
     .send(user)
//se puede aplicar un for each 
     expect(res.statusCode).toBe(201)
     expect(res.body).toBeDefined()
    //  columns.foreach((column) => {        
        
    //  }) 
     expect(res.body.firstName).toBeDefined()
     expect(res.body.firstName).toBe(user.firstName)
})