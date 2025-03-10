window.onload = function () {
    var task = localStorage.getItem("tasks");
    if (task) {
        view();
    }
};
var form = document.getElementById("form1");
form.onsubmit = function (_) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    if (localStorage.getItem("tasks") == null) {
        var tasks = [];
    }
    else {
        var task = localStorage.getItem("tasks");
        tasks = JSON.parse(task);
    }
    var i = tasks.length;
    var data = new FormData(form);
    tasks[i] = {
        id: i,
        title: data.get('title'),
        states: data.get('states'),
        startDate: data.get('startDate'),
        endDate: data.get('endDate')
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    view();
};
function view() {
    var task = localStorage.getItem("tasks");
    var tasks = JSON.parse(task);
    var tasksList = document.getElementById("view");
    tasksList.innerHTML = "";
    tasks.forEach(function (t) {
        var listItem = document.createElement("li");
        var editbtn = document.createElement("button");
        var deletebtn = document.createElement("button");
        if (editbtn != null && deletebtn != null) {
            // ✅ Add class
            editbtn.classList.add('btn', 'btn-warning', 'float-end');
            deletebtn.classList.add("btn", 'btn-danger', "float-end");
            editbtn.innerHTML = "edit";
            deletebtn.innerHTML = "delete";
            editbtn.setAttribute('onclick', 'editTask(' + t.id + ')');
            deletebtn.setAttribute('onclick', 'removeTask(' + t.id + ')');
        }
        listItem.textContent = "".concat(t.title, " - ").concat(t.states, " - ").concat(t.startDate, " - ").concat(t.endDate);
        listItem.appendChild(editbtn);
        listItem.appendChild(deletebtn);
        tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(listItem);
    });
}
function editTask(taskid) {
    var task = localStorage.getItem("tasks");
    var tasks = JSON.parse(task);
    var edit = prompt("Title:");
    console.log(tasks[taskid].title);
    if (edit != null || edit != "") {
        tasks[taskid].title = edit;
        var taskNew = tasks;
        console.log(edit);
        localStorage.setItem("tasks", JSON.stringify(taskNew));
        view();
    }
}
function removeTask(taskid) {
    var task = localStorage.getItem("tasks");
    var tasks = JSON.parse(task);
    if (confirm("Delete the task!")) {
        var taskNew = tasks.filter(function (e, i) { return i !== taskid; });
        localStorage.setItem("tasks", JSON.stringify(taskNew));
        view();
    }
}
