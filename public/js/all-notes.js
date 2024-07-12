document.addEventListener('DOMContentLoaded', () => {
    const allNotesContainer = document.querySelector('#all-notes-list');
  
    async function fetchAllNotes() {
      const response = await fetch('/notas');
      const notes = await response.json();
      notes.forEach(note => addNoteToList(note));
    }
  
    function addNoteToList(note) {
      const noteCard = document.createElement('div');
      noteCard.classList.add('note-card');
      noteCard.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="tags">${note.tags.join(', ')}</div>
      `;
      allNotesContainer.appendChild(noteCard);
    }
  
    fetchAllNotes();
  });
  