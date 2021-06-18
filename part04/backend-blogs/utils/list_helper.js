//Ejercicio 4.6
const lodash = require('lodash')

//Ejercicio 4.3

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (!Array.isArray(blogs) || !blogs.length){
        return 0
    }else if (blogs.length === 1){
        return blogs [0].likes
    }else{
        return blogs.reduce((total, blog) => total + blog.likes, 0)
    } 
}

//Ejercicio 4.5
const favoriteBlog = (blogs) => {
    let topLikes = 0
    let bestBlog = {}
    if(Array.isArray(blogs) && blogs !== 0){
        blogs.forEach((blog) => {
            if(blog.likes > topLikes){
                topLikes = blog.likes

                bestBlog = {
                    title: blog.title,
                    author: blog.author,
                    likes: blog.likes,
                }
            }
        })
    }else if(!Array.isArray(blogs) && blogs !== 0){
        bestBlog = blogs
    }else{
        bestBlog = {}
    }
    
    return bestBlog
}

//Ejercicio 4.6
const mostBlogs = (blogs) => {
    const vacio = {}

    if(blogs.length === 0){
        return vacio
    }else if(!Array.isArray(blogs) && blogs !== 0){
        return blogs
    }
    const reOrder = lodash.countBy(blogs, blog => blog.author)
    return lodash.reduce(reOrder, (max, numBlogs, author) => {
        if (numBlogs > max.blogs) {
            max.blogs = numBlogs
            max.author = author
        }
        return max
    }, {'blogs': 0, 'author': ''})
}

//Ejercicio 4.7
const mostLikes = (blogs) => {
    const vacio = {}

    if(blogs.length === 0){
        return vacio
    }else if(!Array.isArray(blogs) && blogs !== 0){
        const blogin = {
            author: blogs.author,
            likes: blogs.likes
        }
        return blogin
    }
    const reOrder = lodash.groupBy(blogs, blog => blog.author)
    const autores = Object.keys(reOrder)
    for (const author of autores) {
      reOrder[author] = totalLikes(reOrder[author])
    }
    return lodash.reduce(reOrder, (max, numLikes, author) => {
      if (numLikes > max.likes) {
        max.likes = numLikes
        max.author = author
      }    
      return max
    }, {'likes': 0, 'author': ''})
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}