
const request  = require("supertest")
const app = require('../app')

// let TOKEN
let categoryId //declaramos la variable de categoryId

const BASE_URL = '/api/v1/categories'
const BASE_URL_LOGIN = '/api/v1/users/login'; //permanece constante



//obteniendo hits  (token antes de las pruebas)
beforeAll(async () => {
    const user = {
        email: "angus@gmail.com",
        password: "angus1234"
    }

    const res = await request(app)
       .post(BASE_URL_LOGIN) //y mantenemos constante
       .send(user)

       TOKEN = res.body.token; //obtenemos el token
    // console.log(TOKEN) para comproba
})
const category = {
    name: "headphones"
}

//POST Create🔒
test("POST -> BASE_URL, should return statusCode 201, res.body.name === category.name", async () => {
//console.log(TOKEN);
  const res = await request(app)
         .post(BASE_URL)
         .send(category)
         .set('Authorization', `Bearer ${TOKEN}`)

         categoryId = res.body.id  //variable categoryId declarada arriba para poder identificar

         expect(res.statusCode).toBe(201)
         expect(res.body).toBeDefined()
         expect(res.body.name).toBe(category.name)

})

//GET GetAll
test("GET --> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {

 const res = await request(app)
       .get(BASE_URL)
       //console.log(res.body)
         
       expect(res.statusCode).toBe(200)
       expect(res.body).toBeDefined()
       expect(res.body).toHaveLength(1)
      
})

//DELTE Delete🔒
test("DELETE --> BASE_URL/categoryId, should return statusCode 204, and res.body.name === category.name",  async () => {
    //console.log(categoryId);
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

        expect(res.statusCode).toBe(204)
      
})