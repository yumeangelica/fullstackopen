const Blog = require('../models/blog')
const User = require('../models/user')

//testi data
const initialBlogs = [
    {
        _id: 'ljhmerglkhelb986349678346',
        title: 'testimiu bloggaa vol 1',
        author: 'miuku',
        url: 'https://testimiu.com/',
        likes: 69,
        __v: 0
      },
      {
        _id: 'jdhfglhwlegb9w645962356',
        title: 'testimiu bloggaa vol 2',
        author: 'miuku',
        url: 'https://www.testimiu.com',
        likes: 5,
        __v: 0
      },
]


//funktio joka palauttaa tietokannasta poistetun blogi id:n
const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'tester', url: 'www.test.fi', likes: 69 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()

}

//funktio joka palauttaa tietokannan sisällön
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

//funktio joka palauttaa tietokannan käyttäjät
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}