const express = require('express')
const PORT = process.env.PORT || 3002
const app = express()

const { notes } = require('./db/db.json')

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
    res.json(result)
})

app.listen(PORT, () => {
    console.log(`API server on port ${PORT}!`)
})