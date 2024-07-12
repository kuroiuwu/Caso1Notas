const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let notes = [];
let nextId = 1; 

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/notas', (req, res) => {
  res.json(notes);
});

app.get('/notas/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (note) {
    res.json(note);
  } else {
    res.status(404).send('Nota no encontrada');
  }
});

app.post('/notas', (req, res) => {
  const { title, content, tags } = req.body;
  if (!title || !content) {
    return res.status(400).send('El titulo y el contenido son obligatorios');
  }
  const newNote = {
    id: nextId++,
    title,
    content,
    tags: tags || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put('/notas/:id', (req, res) => {
  const { title, content, tags } = req.body;
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (note) {
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    note.updatedAt = new Date();
    res.json(note);
  } else {
    res.status(404).send('Nota no encontrada');
  }
});

app.delete('/notas/:id', (req, res) => {
  notes = notes.filter(n => n.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});
