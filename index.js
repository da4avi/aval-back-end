const express = require('express')

const app = express()

app.use(express.json())

const user = []
const post = []

app.get('/', (req, res) => {
    res.send('teste nossas funcionalidades no /user ou /post c:')
})

//criar usuario
app.post('/user', (req, res) => {
    const { name, email } = req.body

    let id = 0;

    //for each que cria uma array chamada usuários que armazena os id's para que mesmo que deletados continue seguindo a ordem
    for (const users of user) {
        if (users.id > id) {
            id = users.id;
        }
    }

    const newUser = { name, id: id + 1, email }
    user.push(newUser)
    res.status(201).json(newUser)
})

//alterar usuario
app.put('/user/:id', (req, res) => {
    const { id } = req.params
    const {name, email } = req.body
    
    //procurar usuario pelo index 
    const index = user.findIndex(user => user.id === Number(id)) 

    //tratamento de erro
    if (index === -1) {
        return res.status(404).json({error: 'user not found'})
    }

    user[index] = {
        id: Number(id),
        name,
        email
    }

    res.status(200).json(user[index])
})

//deletar usuarios
app.delete('/user/:id', (req, res) => {
    const { id } = req.params
    const index = user.findIndex(user => user.id === Number(id))

    if (index === -1) {
        return res.status(404).json({error: 'user not found'})
    }

    user.splice(index, 1) 

    res.status(204).send();
})

//visualizar usuarios
app.get('/user', (req, res) => {
    res.json(user)
})

//criar post
app.post('/post', (req, res) => {
    const { title, content, autorId } = req.body
    
    let id = 0;

    //for each que cria uma array chamada usuários que armazena os id's para que mesmo que deletados continue seguindo a ordem
    for (const posts of post) {
        if (posts.id > id) {
            id = posts.id;
        }
    }

    const userId = user.find(user => user.id === Number(autorId))

    if (!userId) {
        return res.status(404).json({error: 'user not found'})
    }

    const newPost = { id: id + 1, title, content, autorId: Number(autorId) }
    post.push(newPost)
    res.status(201).json(newPost)
})

//alterar posts
app.put('/post/:id', (req, res) => {
    const { id } = req.params
    const { title, content, autorId } = req.body
    
    //procurar post pelo index 
    const index = post.findIndex(post => post.id === Number(id)) 

    //tratamento de erro
    if (index === -1) {
        return res.status(404).json({error: 'post not found'})
    }

    post[index] = {
        id: Number(id),
        title,
        content,
        autorId: Number(autorId)
    }

    res.status(200).json(post[index])
})

//deletar posts
app.delete('/post/:id', (req, res) => {
    const { id } = req.params
    const index = post.findIndex(post => post.id === Number(id))

    if (index === -1) {
        return res.status(404).json({error: 'post not found'})
    }

    post.splice(index, 1) 

    res.status(204).send();
})

//visualizar posts
app.get('/post', (req, res) => {
    res.json(post)
})

//visualizar posts de determinado usuario
app.get('/post/user/:userId', (req, res) => {
    const userId = Number(req.params.userId)
    const userPosts = post.filter(p => p.autorId === userId)

    //tratamento de erro
    if (userPosts.length === 0) {
        return res.status(404).json({error: 'no posts found for this user'});
    }
    
    res.json(userPosts)
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})

/* TESTES
{
        "name": "davi",
        "email": "finkler.davi41@gmail.com"
    }

{
        "title": "meu primeiro post xd",
        "content": "fala galera hj e meu primeiro post eu to bem nervoso haha",
        "autorId": "1"
    }
*/