function initializeDomElements() {
    window.toDoList = document.getElementById("toDoList");
    window.addButton = document.getElementById("btnAdd");
    window.toDoDate = document.getElementById("toDoDate");
    window.noteTextArea = document.getElementsByClassName('text');
}

function onAddButtonClicked() {
    var myNextToDo = document.getElementById("myNextThing").value;
    var toDoDateValue = document.getElementById("toDoDate").value;
    var toDoTimeValue = document.getElementById("toDoTime").value;

    addToDo(myNextToDo, toDoTimeValue, toDoDateValue);
}

function showError() {
    addButton.classList.remove("btn-success");
    addButton.classList.add("btn-danger");
    toDoDate.classList.add("is-invalid");
}

function hideError() {
    addButton.classList.remove("btn-danger");
    toDoDate.classList.remove("is-invalid");
    addButton.classList.add("btn-success");
}

function drawNote(note) {
    var newToDo = document.createElement("li");
    var toDoRemoveIcon = document.createElement("BUTTON");
    var newToDoCard = document.createElement("div");
    var newToDoText = document.createElement("textarea");
    var newToDoDate = document.createElement("div");
    var newToDoTime = document.createElement("div");

    newToDo.setAttribute("id", note.id);
    newToDo.classList.add("list-group-item", "list-group-item-info", "col-xs-6", "col-md-4", "col-lg-3");
    toDoRemoveIcon.classList.add("fa", "fa-trash", "fa-1x", "fa-pull-right", "btn-warning");
    toDoRemoveIcon.addEventListener('click', onRemoveNoteClicked);
    newToDoCard.classList.add("card");
    newToDoText.classList.add("text", "trans-p-bg-note");
    newToDoText.innerHTML = note.toDoValue;
    newToDoDate.innerHTML = note.dateValue;
    newToDoTime.innerHTML = note.timeValue;
    toDoList.appendChild(newToDo);
    newToDo.appendChild(toDoRemoveIcon);
    newToDo.appendChild(newToDoCard);
    newToDoCard.appendChild(newToDoText);
    newToDoCard.appendChild(newToDoDate);
    newToDoCard.appendChild(newToDoTime);
    document.getElementById("myNextThing").value = "";
    document.getElementById("toDoDate").value = "";
    document.getElementById("toDoTime").value = "";
    for(var i=note.id; i<note.id + 1; i++) {
        noteTextArea[i].readOnly = true;
    }
}


function onRemoveNoteClicked(event) {
    removeToDo(event);

    event.target.parentNode.classList.add("fadeout");
    setTimeout(function () {
        event.target.parentNode.remove();
    }, 400);
}

function onRemoveAllNotesClicked() {
    var question = confirm("Are you sure you want to delete all notes?");
    if (question) {
        removeAllTodos();

        var notesToRemove = document.getElementsByClassName('list-group-item');
        while (notesToRemove[0]) {
            notesToRemove[0].remove();
        }
    }
}

function setToDoDateInputMinMax(minDate, maxDate) {
    toDoDate.setAttribute('min', minDate);
    toDoDate.setAttribute('max', maxDate);
}



