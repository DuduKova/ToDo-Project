window.onload = function () {
    initializeDomElements();
    setMinMaxForDate();
    window.todosJson = localStorage.getItem('todos');
    window.notes = todosJson ? JSON.parse(todosJson) : [];
    notes.forEach(drawNote);
};

function addToDo(myNextToDo, toDoTimeValue , toDoDateValue) {

    var selectedDate = new Date(toDoDateValue);
    now.setHours(0, 0, 0, 0);

    if (!myNextToDo || !toDoDateValue || selectedDate < now) {
        showError();
        window.hasError = true;
        return;
    }

    if (window.hasError) {
        hideError();
        window.hasError = false;
    }

    var lastTodo = notes[notes.length - 1];
    var nextId = lastTodo ? lastTodo.id + 1 : 0;

    dateFormat(toDoDateValue);

    var note = new Note(nextId, myNextToDo, formatedDate, toDoTimeValue);

    notes.push(note);
    localStorage.setItem('todos', JSON.stringify(notes));
    drawNote(note);
}

function removeToDo(event) {
    var removeItemFromArray = event.target.parentNode.id;
    for (var i = 0; i < notes.length; i++) {
        var obj = notes[i].id;

        if (removeItemFromArray == obj) {
            notes.splice(i, 1);
            localStorage.setItem('todos', JSON.stringify(notes));
            return;
        }
    }
}

function removeAllTodos() {
    localStorage.clear();
    window.notes = [];
    localStorage.setItem('todos', JSON.stringify(notes));
    hideError();
}

function dateFormat(date) {
    var p = date.split(/\D/g);
    window.formatedDate = [p[2], p[1], p[0]].join("/");
}

function setMinMaxForDate() {
    window.now = new Date();

    var month = now.getMonth() + 1;
    var day = now.getDate();
    var year = now.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var minDate = year + '-' + month + '-' + day;
    var maxDate = year + 3 + '-' + month + '-' + day;
    setToDoDateInputMinMax(minDate, maxDate);
}