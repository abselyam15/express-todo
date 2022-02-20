const {Router} = require('express')
const Todo = require('../modules/todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/uncompleted', async (req, res) => {
    const todos = await Todo.find({completed: false}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/completed', async (req, res) => {
    const todos = await Todo.find({completed: true}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    res.render('edit', {
        title: 'Edit todo',
        todoTitle: todo.title,
        _id: todo._id
    })
})

router.post('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.title = req.body.title
    todo.save()

    res.redirect('/')
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create',async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})

router.get('/delete/:id', async (req ,res) => {
    await Todo.deleteOne({_id: req.params.id})

    res.redirect('/')
})

router.get('/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.completed = !todo.completed
    await todo.save()

    res.redirect('/')
})

module.exports = router