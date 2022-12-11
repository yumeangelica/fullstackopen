//määritellään reitit

const blogsRouter = require('express').Router() //otetaan express käyttöön ja otetaan käyttöön router, luodaan router olio
const Blog = require('../models/blog') //otetaan blogi skeema käyttöön
const User = require('../models/user') 

//kirjautumisen tarkistus 4.19
const jwt = require('jsonwebtoken') //otetaan jwt käyttöön

//kaikkien blogien haku

blogsRouter.get('/', async (request, response) => { //async funktio
  const blogs = await Blog.find({}).populate('user', {})

  // 4.17 // Populaten parametri määrittelee, että user-dokumenttien notes-kentässä olevat note-olioihin viittaavat id:t korvataan niitä vastaavilla dokumenteilla. näytetään vain username ja name
  response.json(blogs.map(blog => blog.toJSON()))
})


//yksittäisen blogin haku
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) { //jos blogi löytyy
    response.json(blog.toJSON())
  } else { //jos blogia ei löydy
    response.status(404).end()
  }
})





//blogin lisäys
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request) //haetaan token
  const user = request.user 

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({ //luodaan uusi blogi
    title: body.title, //title on request bodyn title
    author: body.author,
    url: body.url,
    user: user, //blogiin tallennetaan käyttäjän id
    likes: body.likes ? body.likes : 0, //jos likes on tyhjä, niin asetetaan likes arvoksi 0
  })


  if (blog.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }

  // jos blogi ei sisällä titlea ja urlia, palautetaan status 400
  if (blog.url === undefined && blog.title === undefined) {
    return response.status(400)
  }

  const savedBlog = await blog.save() //tallennetaan blogi tietokantaan

  user.blogs = user.blogs.concat(savedBlog._id) //käyttäjän blogi listaan lisätään blogi id
  await user.save() //tallennetaan käyttäjä tietokantaan


  response.status(201).json(savedBlog.toJSON()) //201 = created
})


// 4.13 & 4.21
// blogin poisto
blogsRouter.delete('/:id', async (request, response) => { //async funktio

  const blog = await Blog.findById(request.params.id) //haetaan blogi id:n perusteella

  if (!blog) {
    return response.status(404).json({ error: 'not found' }) //404 = not found
  }

  const user = request.user

  if (user.id.toString() === blog.user.toString()) {
  
    await Blog //odotetaan että blogi poistetaan
      .findByIdAndDelete(request.params.id) //poistetaan blogi id:n perusteella
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id) //poistetaan käyttäjän blogi listasta jos id ei ole sama kuin userId, kuolleet blogit poistetaan
    await user.save() //tallennetaan käyttäjä tietokantaan
    return response.status(204).send() //204 = no content kun blogi on poistettu
    
  } else {

    return response.status(401).json({ error: 'auth needed'}) //401 = unauthorized jos käyttäjä ei ole kirjautunut sisään
  }

})




//4.14
//blogin muokkaus
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog //odotetaan että blogi päivitetään
    .findByIdAndUpdate(request.params.id,
      blog, { new: true }) //päivitetään blogi id:n perusteella

  response.json(updatedBlog.toJSON()) //palautetaan päivitetty blogi
})




module.exports = blogsRouter //exportataan router