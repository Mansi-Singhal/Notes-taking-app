console.log("Welcome to Magic Note App!");
shownotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function(e) {

  let addtxt = document.getElementById("addtxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.push(addtxt.value);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addtxt.value = "";
  shownotes();
});

function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function(element, index) {
    html += `
      <div class="notecard my-2 mx-2 card" style="width: 18rem; background: #D1D9D9;">
        <div class="card-body">
          <h5 class="card-title" style="color: black;">Note ${index + 1}</h5>
          <p class="card-text"> ${element} </p>
          <button class="btn btn-outline-info" id="${index}" onclick="deleteNote(this.id)">Delete a Note</button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById('notes');
  if (notesobj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    let text = `Nothing to show! Use "Add a Note" section above to add a note.`;
    let result = text.fontcolor("#9E9D89");
    notesElm.innerHTML = result;
  }
}

function deleteNote(index){
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  shownotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){

  let inputval = search.value.toLowerCase();
  // console.log("input working");
  let notecards = document.getElementsByClassName('notecard');
  Array.from(notecards).forEach(function(element){
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardtxt);
    if(cardtxt.includes(inputval)){
      element.style.display = "block";
    }
    else{
      element.style.display = "none";
    }
  });
});
