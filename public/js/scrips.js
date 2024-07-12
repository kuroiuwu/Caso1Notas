document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#note-form');
  const notesContainer = document.querySelector('#notes-list');
  const viewAllNotesButton = document.querySelector('#view-all-notes');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = form.title.value;
    const content = form.content.value;
    const tags = form.tags.value.split(',').map(tag => tag.trim());
    
    if (!title || !content) {
      alert('El titulo y el contenido son obligatorios');
      return;
    }
    
    const response = await fetch('/notas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content, tags })
    });
    
    if (response.ok) {
      const newNote = await response.json();
      addNoteToContainer(newNote);
      form.reset();
    } else {
      const error = await response.text();
      alert(`Error: ${error}`);
    }
  });

  viewAllNotesButton.addEventListener('click', () => {
    window.location.href = 'all-notes.html'; 
  });

  async function fetchNotes() {
    const response = await fetch('/notas');
    const notes = await response.json();
    notes.forEach(note => addNoteToContainer(note));
  }

  function addNoteToContainer(note) {
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');
    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="tags">${note.tags.join(', ')}</div>
      <div class="note-actions">
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      </div>
    `;
    notesContainer.appendChild(noteCard);
  }

  fetchNotes();
});




 
  
  