'use strict';

window.onload = () => {

// controls
let addBtn = document.getElementById('add');
let removeBtn = document.getElementById('remove');

// get notes (initial state)
let notes = [...document.querySelector('.notes_wrapper').children];
let noteTemplate = document.getElementById('note_template').content;
let activeNote = document.querySelector('.note.active');
let currentIndex = notes.indexOf(activeNote);

// get note field
let noteBody = document.querySelector('.note_body_full');


//remove and activate functions
function changeOpenNoteText() {
  noteBody.innerText = activeNote.querySelector('p').innerText;
}

function changeOpenNotePreview() {
  activeNote.querySelector('p').innerText = noteBody.innerText.trim();
}

function activateNote(num) {
  activeNote.classList.remove("active");
  notes[num].classList.add("active");
  activeNote = notes[num];
  currentIndex = notes.indexOf(activeNote);
  changeOpenNoteText();
}

function removeActiveNote() {
  addBtn.style.pointerEvents = "auto";
  activeNote.remove();

  notes = [...document.querySelector('.notes_wrapper').children]; 

  //check which note to make active now
  if (notes.length === 0) { 
    noteBody.innerText = '';
    return;
  } else if (currentIndex === notes.length){
    activateNote(currentIndex - 1);
  } else {
    activateNote(currentIndex);
  }

  changeOpenNoteText();
}

function removeNote() {
  activeNote.style.height = "0px";
  activeNote.style.padding  = "0px 25px 0px 15px";
  activeNote.style.marginTop  = "0px";
  addBtn.style.pointerEvents = "none"; //if add cliked too fast after remove
  setTimeout(removeActiveNote, 600);
}

function makeNotesClickable() {
  for (let note of notes) {
    note.onclick = () => {
      currentIndex = notes.indexOf(note);
      activateNote(currentIndex);
    }
  }
}

//add functions
function setDate(element) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  //add 0 to 1-9 month
  if (month < 10) {
    month = "0" + month;
  }

  let year = date.getFullYear();
  element.querySelector('time').dateTime = year + "-" + month + "-" + day;
  element.querySelector('time').innerText = day + '.' + month + '.' + year;
}

function createNewNote() {
  let element = document.createElement('li');
  let clone = noteTemplate.querySelector('li');
  element = clone.cloneNode(true);
  setDate(element);
  return element;
}

function addNote() {
  document.querySelector('.notes_wrapper').prepend(createNewNote());
  notes = [...document.querySelector('.notes_wrapper').children];
  activateNote(0);
  makeNotesClickable();
}

//execute
changeOpenNoteText();
makeNotesClickable();

removeBtn.addEventListener('click', removeNote);
addBtn.addEventListener('click', addNote);
noteBody.addEventListener('input', changeOpenNotePreview);
};