const addBtn = document.querySelector("#btn");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNote();
});

function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="notes">
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
      </div>
      <div class="container ${text ? "hidden" : ""}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
  `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const container = note.querySelector(".container");
  const textarea = note.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    container.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    container.innerHTML = marked.parse(value);
    updateLocalStorage();
  });

  textarea.value = text;
  container.innerHTML = marked.parse(text);

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });
  document.body.appendChild(note);
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
