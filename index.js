const express = require('express')
const cors = require('cors')
const logger = require('./logger')

//ejecutamos la aplicacion
const app = express()

//ejecutando el middleware de cors
app.use(cors())
//ejecutando el body parser
app.use(express.json())
//usando nuestro custom middleware
app.use(logger)




let notes = [
  {
    'id': 1,
    content: 'Me tengo que suscribir a Youtube y Twitch e Instagram ',
    date: new Date(),
    important: true,
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases de FullStack Bootcamp ',
    date: new Date(),
    important: false,
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: new Date(),
    important: true,
  }
];

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my Api Notes</h1>')
})

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

app.get('/api/notes/:id', (req, res) => {

  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if(!note) {
    res.status(404).end()
  } else {
    res.json(note)
  }

})

app.delete('/api/notes/:id', (req, res) => {

  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()

})

app.post('/api/notes', (req, res) => {
  const note = req.body
 
  if(!note || !note.content) {
    return res.status(400).json({
      error: 'content of note is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  
  const newNote = {
    id : maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important === 'undefined' ? false : note.important,
  }

  notes = notes.concat(newNote)  
  res.status(201).json(newNote)

})

app.use((req,res) => {
  res.status(404).json({
    message: 'This is not a valid route, please try again'
  })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
