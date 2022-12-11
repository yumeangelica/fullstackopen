//saa taulukollisen blogeja, palauttaa jokaisen blogin kohdalla 1
const dummy = (blogs) => {
    return 1
}

//saa taulukollisen blogeja, palauttaa yhteenlasketut tykkäykset, jos tykkäyksiä ei ole, palauttaa 0

const totalLikes = (blogs) => {
    const reducerFunc = (sum, item) => { //summaa yhteen
        return sum + item.likes
    }

    return blogs.length === 0 //jos blogeja ei ole, palauttaa 0
        ? 0
        : blogs.reduce(reducerFunc, 0)
}


const favoriteBlog = (blogs) => {

    let mostlikes = blogs[0].likes
    let mostlikedblog = blogs[0]


    //loop through blogs
    blogs.forEach((blog) => {
        if (blog.likes > mostlikes) {
            mostlikes = blog.likes
            mostlikedblog = blog
        }
    }
    )

    return mostlikedblog

}


const mostBlogs = (blogs) => {
    let mostBloggedAuthor = blogs[0].author
    let mostBlogCount = 0

    //loop through blogs
    blogs.forEach((blog1) => {
        let count = 0
        blogs.forEach((blog2) => {
            if (blog1.author === blog2.author) {
                count++
            }
        })
        if (count > mostBlogCount) {
            mostBlogCount = count
            mostBloggedAuthor = blog1.author
        }
    }
    )

    return {
        author: mostBloggedAuthor,
        blogs: mostBlogCount
    }

}


const mostLikes = (blogs) => { //saa taulukollisen blogeja
    let mostLikedAuthor = blogs[0].author //alustetaan arvoksi ensimmäisen blogin kirjoittaja
    let mostLikedCount = 0 //alustetaan arvoksi 0

    //loop through blogs
    blogs.forEach((blog1) => { //loopataan blogeja
        let likecount = 0 //alustetaan arvoksi 0
        blogs.forEach((blog2) => { //loopataan blogeja
            if (blog1.author === blog2.author) { //jos blogin kirjoittaja on sama kuin blog2:n kirjoittaja
                likecount += blog2.likes //kasvatetaan likecountia blog2:n tykkäysten määrällä
            }
        })
        if (likecount > mostLikedCount) { //jos likecount on suurempi kuin mostLikedCount
            mostLikedCount = likecount //aseta mostLikedCount arvoksi likecount
            mostLikedAuthor = blog1.author //aseta mostLikedAuthor arvoksi blog:n kirjoittaja
        }
    }
    )
    
    return { //palautetaan objekti
        author: mostLikedAuthor, //palauta kirjoittaja variaabelissa author
        likes: mostLikedCount //palauta tykkäykset variabelissa likes
    }

}




module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}


