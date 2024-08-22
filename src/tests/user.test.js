const request  = require("supertest")
const app = require('../app')


const BASE_URL = '/api/v1/users'
let TOKEN

//obteniendo hits
beforeAll(async () => {
    const user = {
        email: "angus@gmail.com",
        password: "angus1234"
    }


    const res = await request(app)
       .post(`${BASE_URL}/login`)
       .send(user)
    //    console.log(res.body);
       TOKEN = res.body.token

    //    console.log(TOKEN);
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

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {

    const res = await request(app)
      .get(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(2)

})