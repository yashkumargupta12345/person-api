const express = require('express')
const router = express.Router()
const Person = require('../models/Person.js')
const validatePerson = require('../middleware/validatePerson')


// GET: List all persons
router.get('/', async (req, res) => {
    const persons = await Person.find()
    res.render('index', { persons })
})


// POST: Show create form
router.get('/new', (req, res) => {
    res.render('form', { old: {}, errors: [] })
})

// POST: Create person (with validation)
router.post('/person', validatePerson, async (req, res) => {
    await Person.create(req.body)
    res.redirect('/')
})

// PUT: Show edit form
router.get('/:id/edit', async (req, res) => {
    const person = await Person.findById(req.params.id)
    res.render('edit', { person })
})


// PUT: Update person (with validation)
router.put('/:id', validatePerson, async (req, res) => {
    await Person.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')
})

// DELETE: Show delete confirmation
router.get('/:id/delete', async (req, res) => {
    const person = await Person.findById(req.params.id)
    res.render('delete', { person })
})

// DELETE: Delete User Actually
router.delete('/:id', async (req, res) => {
    await Person.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router
