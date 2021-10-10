const fs = require('fs')
const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../lib/notes')
const { notes } = require('../db/db.json')

jest.mock('fs')
test('creates a note object', () => {
    const note = createNewNote({ title: 'Test title', id: '11', text: 'This is a quick note' }, notes);
  
    expect(note.title).toBe('Test title');
    expect(note.id).toBe('11');
    expect(note.text).toBe('This is a quick note')
});
  
test('filters by query', () => {
    const startingNotes = [
        {
            id: "0",
            title: "Example notes",
            text: "Here is some text for the notes"
        },
        {
            id: "1",
            title: "Second",
            text: "Here is some text for the notes"
        }
    ];
  
    const updatedNotes = filterByQuery({ title: 'Second' }, startingNotes);
  
    expect(updatedNotes.length).toEqual(1);
});
  
test('finds by id', () => {
    const startingNotes = [
        {
            id: "0",
            title: "Example notes",
            text: "Here is some text for the notes"
        },
        {
            id: "1",
            title: "Second",
            text: "Here is some text for the notes"
        }
    ];
  
    const result = findById('0', startingNotes);
  
    expect(result.title).toBe('Example notes');
});

test('validates note', () => {
    const validNote = {
        id: "0",
        title: "Example notes",
        text: "Here is some text for the notes"
    }

    const invalidNote = {
        id: "1",
        title: 123,
        text: "This test should fail"
    }

    const validResult = validateNote(validNote)
    const invalidResult = validateNote(invalidNote)

    expect(validResult).toBe(true)
    expect(invalidResult).toBe(false)
})  

test('deletes note', () => {
    const startingNotes = [
        {
            id: "0",
            title: "Example notes",
            text: "Here is some text for the notes"
        },
        {
            id: "1",
            title: "Second",
            text: "Here is some text for the notes"
        },
        {
            id: "2",
            title: "Third",
            text: "Some more text for examples"
        },
        {
            id: "3",
            title: "Fourth",
            text: "The final amount of text"
        }
    ];
    deleteNote('2', startingNotes)
    expect(startingNotes.length).toBe(3)

})