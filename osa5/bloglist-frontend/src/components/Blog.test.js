import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog' //importataan testattava komponentti


describe('<Blog />', () => {

    let container

    const testiblog = {
        
        title: 'miuku bloggaa',
        author: 'Kiisu',
        url: 'www.kissat-on-koiria.com',
        user: {
            username: 'testimiu',
            name: 'miuku',
        },
        likes: 10
    }

    const blogUpdated = jest.fn() 

    beforeEach(() => { 
        container = render(
            <Blog blog={testiblog} updateBlog={blogUpdated}/>
        ).container
    })

    test('Blog renders title', () => { //5.13

        const element = screen.getByText(`${testiblog.title} - ${testiblog.author}`) //haetaan blogin title ja author
        expect(element).toBeDefined() //odotetaan että elementti on määritelty
        
    })

    test('Blog renders url, likes and user, but are not shown by default', async () => { //5.14

        const user = userEvent.setup() //luodaan userEvent
        
        const button = screen.getByText('view') //haetaan view button
        
        await user.click(button) //odotetaan että button on klikattu

        const url = container.querySelector('.url') //haetaan url containerista
        const likes = container.querySelector('.likes') //haetaan likes containerista

        expect(url).toBeDefined() //odotetaan että url ja likes on määritelty
        expect(likes).toBeDefined()

        const hidebutton = screen.getByText('hide') //haetaan hide button
        await user.click(hidebutton) //odotetaan että button on klikattu

        expect(url).not.toBeVisible() //odotetaan että url ja likes eivät ole näkyvissä
        expect(likes).not.toBeVisible()


            
    })
    
    test('Blog likes are updated when like button is clicked', async () => { //5.15
        const user = userEvent.setup() //luodaan userEvent
        const viewbutton = screen.getByText('view') //haetaan view button
        await user.click(viewbutton)
        
        const likebutton = container.querySelector('.likebutton') //haetaan likebutton containerista
        await user.click(likebutton)
        await user.click(likebutton)
        

        expect(blogUpdated.mock.calls).toHaveLength(2) //odotetaan että blogUpdated on kutsuttu kaksi kertaa
        

        
    })

    


})

