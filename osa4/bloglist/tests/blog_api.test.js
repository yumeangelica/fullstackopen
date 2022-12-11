const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper') // import helper funktiot
const app = require('../app') // import express app
const api = supertest(app) // superagent olio joka voi tehdä http pyyntöjä

const Blog = require('../models/blog') // import Blog model
const User = require('../models/user')


//Tietokanta tyhjennetään aluksi, ja sen jälkeen kantaan lisätään kaksi taulukkoon initialBlogs talletettua blogia

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   const passwordHash = await bcrypt.hash('password', 10)
//   const user = new User({
//     username: 'testimiu',
//     name: 'miuku',
//     blogs: [],
//     passwordHash
//   })

//   await user.save()
// })

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   await Blog.insertMany(helper.initialBlogs)
// })


//luodaan testikäyttäjä
beforeEach(async () => {
  await User.deleteMany({}) //tyhjennetään tietokanta käyttäjistä

  const passwordHash = await bcrypt.hash('salasana', 10) //salataan salasana

  const user = new User({ //luodaan uusi käyttäjä olio
    username: 'testimiu',
    name: 'miuku',
    blogs: [],
    passwordHash
  })

  await user.save() //tallennetaan käyttäjä tietokantaan
})

beforeEach(async () => {
  await Blog.deleteMany({}) //tyhjennetään tietokanta blogista

  const users = await User.find({}) //haetaan tietokannasta käyttäjät

  const user = users[0] //haetaan ensimmäinen käyttäjä

  const id = users[0]._id //haetaan ensimmäisen käyttäjän id

  const blogObject = helper.initialBlogs
    .map(blog => new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: id.toString(),
      likes: blog.likes ? blog.likes : 0
    }))

  const promiseArray = blogObject.map(blog => {
    blog.save()
    user.blogs = user.blogs.concat(blog._id)
  })

  await Promise.all(promiseArray)

  await user.save()
})


// GET --------------------------------------------

// 4.8 describe block for GET request
describe('Testing GET request(s):', () => {

  // 4.9 check that id is defined
  test('Is ID field defined as id not _id', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body[0].id).toBeDefined() // tarkistaa, että id on määritelty
  })


  test('Blogs are returned as JSON', async () => { // test block for JSON response
    await api
      .get('/api/blogs') // GET request to /api/blogs
      .expect(200) // varmistaa, että pyyntöön vastataan statuskoodilla 200
      .expect('Content-Type', /application\/json/) // varmistaa että data palautetaan oikeassa muodossa, eli että Content-Type:n arvo on application/json
  }, 8000)


  //testataan, että palautetaan oikea määrä blogeja
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length) // varmistaa, että palautetaan oikea määrä blogeja (2)
  })


  //testataan, että palautetaan oikea tieto titlessä
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    // console.log('titles', titles)
    expect(titles).toContain(
      'testimiu bloggaa vol 1'
    )
  })
  

})

// POST --------------------------------------------

//4.10
// describe block for POST request
describe('Testing POST request:', () => {

  let headers

  beforeEach(async () => {
    const user = { //luodaan käyttäjäolio
      username: 'testimiu', 
      password: 'salasana'
    }

    const loginUser = await api //kirjautuminen
      .post('/api/login')
      .send(user)

    headers = { // saadaan token
      'Authorization': `bearer ${loginUser.body.token}`
    }

  })
  
  test('postin new', async () => { // posting with testimiu
    
    const testBlog = {
      title: "testTitle",
      author: "testaaja",
      url: "www.test.fi",
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201) //created
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'testTitle'
    )
  })

  test('posting without token', async () => { // posting without testimiu
    const testBlog = {
      title: "testiMaumau",
      author: "testaaja",
      url: "www.test.fi",
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(401) // unauthorized because no token
    
  })

  //4.11
  // // testataan, että jos ei ole tykkäyksiä, niin tykkäykset on 0
  test('Check if a blog post without likes has 0 likes', async () => {

    const testBlog = {
      title: "NollaTesteri",
      author: "NollaTestaaja",
      url: "www.nolla.fi"
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const expectedBlog = response.body.find(blog => blog.title === 'NollaTesteri')
    expect(expectedBlog.likes).toBe(0)
    
  })

  //4.12
  test('Check if blog has no title and url, then it is not added', async () => {

    const testBlog = {
      author: "VajaaTestaaja",
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400) //400 Bad Request
      .set(headers)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  })

})

// PUT --------------------------------------------


//4.14
//testing updating a blog
describe('Testing PUT request with restful api', () => {
  test('a blog can be updated', async () => {

    const blogsAtStart = await helper.blogsInDb() //haetaan kaikki blogit tietokannasta
    const blogToUpdate = blogsAtStart[0] //valitaan eka blogi päivitettäväksi

    const updatedBlog = {
      ...blogToUpdate,
      likes: 987
    }

    await api //päivitetään blogi
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200) //200 = ok
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb() //haetaan kaikki blogit tietokannasta

    expect(blogsAtEnd[0].likes).toBe(987) //varmistetaan, että liket ovat päivittyneet

  })

})

// DELETE --------------------------------------------

describe('Testing DELETE request(s)', () => {

  let headers
  let id

  beforeEach(async () => { //luodaan testimiu käyttäjä
    const user = {
      username: 'testimiu',
      password: 'salasana'
    }

    const loginUser = await api
      .post('/api/login') //kirjaudutaan sisään testimiu käyttäjällä
      .send(user)

    headers = {
      'Authorization': `bearer ${loginUser.body.token}` //otetaan kirjautumisen token talteen
    }

  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb() //haetaan kaikki blogit tietokannasta
    const blogToDelete = blogsAtStart[0] //valitaan eka blogi poistettavaksi
  
    await api //poistetaan blogi
      .delete(`/api/blogs/${blogToDelete.id}`) //poistetaan blogi
      .expect(204) //204 = No Content
      .set(headers)
    
    const blogsAtEnd = await helper.blogsInDb() //haetaan kaikki blogit tietokannasta

    expect(blogsAtEnd).toHaveLength( //varmistetaan, että tietokannassa on yksi blogi vähemmän kuin ennen poistoa
      helper.initialBlogs.length - 1
    )
    
})

})




afterAll(() => { // sulkee yhteyden tietokantaan
  mongoose.connection.close()
})
