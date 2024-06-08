const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Notes App</h1>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);

class NoteCard extends HTMLElement {
  static get observedAttributes() {
    return ['archived'];
  }

  connectedCallback() {
    const { id, title, body, createdAt } = this.dataset;
    const createdDate = new Date(createdAt);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(createdDate);

    this.innerHTML = `
      <div class="note-card" data-id="${id}">
      <div class="note-title">${title}</div>
      <div class="note-body">${body}</div>
      <div class="created-at">${formattedDate}</div>
      <div class="note-actions">
      <button class="delete-btn"><i class="ri-delete-bin-line"></i>Delete</button>
      <button class="archive-btn"><i class="ri-archive-line"></i>Archive</button>
      </div>
    </div>
  `;
    this.querySelector('.delete-btn').addEventListener('click', this.deleteNote.bind(this));
    this.querySelector('.archive-btn').addEventListener('click', this.archiveNote.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'archived') {
      const noteCard = this.querySelector('.note-card');
      if (newValue === 'true') {
        noteCard.classList.add('archived');
      } else {
        noteCard.classList.remove('archived');
      }
    }
  }

  deleteNote() {
    const id = this.dataset.id;
    const noteIndex = notesData.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      notesData.splice(noteIndex, 1);
      this.remove();
    }
  }

  archiveNote() {
    const id = this.dataset.id;
    const noteIndex = notesData.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      notesData[noteIndex].archived = true;
      this.setAttribute('archived', 'true'); 
    }
  }
}
customElements.define('note-card', NoteCard);

const notesContainer = document.querySelector('.notes-container');

function addNoteToContainer(note) {
  const noteCard = document.createElement('note-card');
  noteCard.dataset.id = note.id;
  noteCard.dataset.title = note.title;
  noteCard.dataset.body = note.body;
  noteCard.dataset.createdAt = note.createdAt;
  if (note.archived) {
    noteCard.setAttribute('archived', 'true');
  }
  notesContainer.appendChild(noteCard);
}

notesData.forEach(note => {
  addNoteToContainer(note);
});

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="note-form">
        <h2>Add Note</h2>
        <form id="addNoteForm">
          <input type="text" id="noteTitle" placeholder="Enter title" required><br>
          <textarea id="noteBody" placeholder="Write your notes..." required></textarea><br>
          <button type="submit" disabled><i class="ri-add-line"></i>Add Note</button>
        </form>
      </div>
    `;
    this.querySelector('#addNoteForm').addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const title = this.querySelector('#noteTitle').value;
    const body = this.querySelector('#noteBody').value;
    const newNote = {
      id: `notes-${Math.random().toString(36).substr(2, 10)}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false
    };
    notesData.push(newNote);
    addNoteToContainer(newNote);
    this.dispatchEvent(new CustomEvent('noteAdded', { detail: newNote }));
    event.target.reset();
  }
}
customElements.define('note-form', NoteForm);

document.addEventListener('DOMContentLoaded', function() {
  const titleInput = document.getElementById('noteTitle');
  const bodyInput = document.getElementById('noteBody');
  const addButton = document.querySelector('button[type="submit"]');

  function validateForm() {
    if (titleInput.value.trim() !== '' && bodyInput.value.trim() !== '') {
      addButton.disabled = false;
    } else {
      addButton.disabled = true;
    }
  }

  titleInput.addEventListener('input', validateForm);
  bodyInput.addEventListener('input', validateForm);
});