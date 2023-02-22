describe('Bloglist ', function () {

    beforeEach(function () {

        cy.request('POST', 'http://localhost:3003/api/testing/reset') //resetoi testitietokannan

        const user = { //uusi käyttäjä objekti
            name: 'ruusuli',
            username: 'ruusuli',
            password: 'salasana'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user) //luodaan käyttäjä

        cy.visit('http://localhost:3000') //menee sovellukseen
    })

    it('front page can be opened', function () { //5.17
        cy.contains('Log in to application') //tarkistaa että ollaan oikealla sivulla
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    it('failed login because wrong credentials', function () { //5.18
        cy.get('#username').type('testimiu') //kirjoittaa väärän käyttäjänimen
        cy.get('#password').type('vaarasalasana') //kirjoittaa väärän salasanan
        cy.get('#loginsubmit').click() //yritetään logataan sisään
        
        // shoud check if wrong credentials message is shown
        cy.contains('wrong credentials')

        
    })

    it('loggin in with correct credentials', function () { //5.18
        cy.login({ username: 'ruusuli', password: 'salasana' }) //kirjautuu sisään

        cy.contains('ruusuli logged in') //tarkistaa että käyttäjä on kirjautunut sisään
    })

    it('a blog can be created', function () { //5.19
        cy.login({ username: 'ruusuli', password: 'salasana' }) //kirjautuu sisään

        cy.contains('new blog').click() //uuden blogin nappia painetaan

        cy.get('#blogtitle').type('ruusulin testiblogi') //kirjoitetaan blogille otsikko
        cy.get('#blogauthor').type('ruusuli') //kirjoitetaan blogille kirjoittaja
        cy.get('#blogurl').type('testiurl') //kirjoitetaan blogille url
        cy.get('#blogsubmit').click() //blogi luodaan

        cy.get('#allblogs').contains('ruusulin testiblogi') //tarkistetaan että blogi on luotu
    })

    it('a blog can be liked', function () { //5.20
        cy.login({ username: 'ruusuli', password: 'salasana' }) //kirjautuu sisään

        cy.contains('new blog').click() //uuden blogin nappia painetaan

        cy.get('#blogtitle').type('ruusulin testiblogi2') //kirjoitetaan blogille otsikko
        cy.get('#blogauthor').type('ruusuli') //kirjoitetaan blogille kirjoittaja
        cy.get('#blogurl').type('testiurl') //kirjoitetaan blogille url
        cy.get('#blogsubmit').click() //blogi luodaan
 
        cy.get('#allblogs').contains('ruusulin testiblogi2') //tarkistetaan että blogi on luotu

        cy.contains('view').click() //näytetään blogi
        cy.contains('like').click() //tykkäystä painetaan
        cy.contains('likes: 1') //tarkistetaan että tykkäys on lisätty
    })

    it('a blog can be deleted', function () { //5.21
      
        cy.login({ username: 'ruusuli', password: 'salasana' }) //kirjautuu sisään
        cy.contains('new blog').click() //uuden blogin nappia painetaan

        cy.get('#blogtitle').type('ruusulin testiblogi3') //kirjoitetaan blogille otsikko
        cy.get('#blogauthor').type('ruusuli') //kirjoitetaan blogille kirjoittaja
        cy.get('#blogurl').type('testiurl') //kirjoitetaan blogille url
        cy.get('#blogsubmit').click() //blogi luodaan

        cy.get('#allblogs').contains('ruusulin testiblogi3') //tarkistetaan että blogi on luotu

        cy.contains('view').click() //näytetään blogi
        cy.contains('remove').click() //poistetaan blogi
        
    
        cy.get('#allblogs').contains('ruusulin testiblogi3').should('not.exist') //tarkistetaan että blogi on poistettu
        

    })


    it('only the user who created the blog can see remove button', function () { //5.21 - 5.22
        cy.login({ username: 'ruusuli', password: 'salasana' }) //kirjautuu sisään

        cy.contains('new blog').click() //uuden blogin nappia painetaan

        cy.get('#blogtitle').type('ruusulin testiblogi5') //kirjoitetaan blogille otsikko
        cy.get('#blogauthor').type('ruusuli') //kirjoitetaan blogille kirjoittaja
        cy.get('#blogurl').type('testiurl') //kirjoitetaan blogille url
        cy.get('#blogsubmit').click() //blogi luodaan

        cy.get('#allblogs').contains('ruusulin testiblogi5') //tarkistetaan että blogi on luotu

        cy.contains('logout').click() //kirjaudutaan ulos

        const user2 = { //luodaan toisen käyttäjän tiedot objektina
            name: 'ruusuli2',
            username: 'ruusuli2',
            password: 'salasana2',
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user2) //luodaan toinen käyttäjä

        cy.login({ username: 'ruusuli2', password: 'salasana2' }) //logataan sisään toisella käyttäjällä

        cy.contains('view').click() //näytetään blogi
        cy.contains('remove').should('not.exist') //tarkistetaan että poista nappia ei ole
    })


    it.only('Blogs are ordered by likes', function () { //5.23
        cy.login({ username: 'ruusuli', password: 'salasana' })
        cy.createNewBlog({ title: 'Moi', author: 'koira', url: 'koira.com', likes: 20 })
        cy.createNewBlog({ title: 'Tere', author: 'kissa', url: 'kissa.com', likes: 30 })
        cy.createNewBlog({ title: 'Kiitos', author: 'pupu', url: 'pupu.com', likes: 10 })
 
        cy.get('.blog').eq(0).contains('view').click()
        cy.get('.blog').eq(0).contains('likes: 30')

        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('likes: 20')

        cy.get('.blog').eq(2).contains('view').click()
        cy.get('.blog').eq(2).contains('likes: 10')

      


    })





})