import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm' //importataan testattava komponentti

describe('<NewBlogForm />', () => {

    let container

    const testiblog = {
        title: 'miuku bloggaa',
        author: 'miuku',
        url: 'miuku.com'
    }

    const createBlog = jest.fn() //luodaan mockhandler funktio nimetään se createBlog

    beforeEach(() => {
        container = render(
            <NewBlogForm addBlog={createBlog} />
        ).container
    })

    test('Create blog form', async () => { //5.16
        
        const user = userEvent.setup() //luodaan userEvent

        const title = container.querySelector('.titleInput') //haetaan title input
        const author = container.querySelector('.authorInput') //haetaan author input
        const url =  container.querySelector('.urlInput') //haetaan url input

        const savebutton = screen.getByText('save') //haetaan save button

        await user.type(title, testiblog.title) //odotetaan että title on kirjoitettu
        await user.type(author, testiblog.author) //odotetaan että author on kirjoitettu
        await user.type(url, testiblog.url) //odotetaan että url on kirjoitettu

        await user.click(savebutton) //odotetaan että button on klikattu

        expect(createBlog.mock.calls).toHaveLength(1) //odotetaan että createBlog on kutsuttu kerran
        expect(createBlog.mock.calls[0][0].title).toBe(testiblog.title) //odotetaan että createBlog on kutsuttu oikeilla parametreilla
        expect(createBlog.mock.calls[0][0].author).toBe(testiblog.author)
        expect(createBlog.mock.calls[0][0].url).toBe(testiblog.url)

    
    })

})