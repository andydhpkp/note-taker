const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes')
const { notes } = require('../../db/db.json')
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
})

router.post('/notes', (req, res) => {
    //set id based on the next index of the array
    req.body.id = notes.length.toString()

    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    } else {
        const note = createNewNote(req.body, notes)
        res.json(req.body)
    }
})

router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        deleteNote(req.params.id, notes)
    } else {
        res.send(404)
    }
})

module.exports = router;
