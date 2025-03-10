interface Task {
    id: number;
    title: string;
    states: string;
    startDate: string;
    endDate: string;
}

window.onload = () => {
    var task = localStorage.getItem("tasks")

    if (task) {
        view()
    }
}

var form: any = document.getElementById("form1");
form.onsubmit = (_) => {
    event?.preventDefault();
    if(localStorage.getItem("tasks") == null){
        var tasks: Task[] = []
    }
    else{
        var task: any = localStorage.getItem("tasks")
        tasks = JSON.parse(task);
    }
    var i = tasks.length;

    var data: any = new FormData(form)
    tasks[i] = {
        id: i,
        title: data.get('title'),
        states: data.get('states'),
        startDate: data.get('startDate'),
        endDate: data.get('endDate')
    }
    localStorage.setItem("tasks", JSON.stringify(tasks))
    view()
}

function view() {
    var task: any = localStorage.getItem("tasks")
    var tasks: any = JSON.parse(task);
    var tasksList: any = document.getElementById("view")
    tasksList.innerHTML = "";

    tasks.forEach(t => {
        const listItem = document.createElement("tr");
        const editbtn = document.createElement("button")
        const deletebtn  = document.createElement("button")
        if (editbtn != null && deletebtn != null) {
            // ✅ Add class
            
            editbtn.classList.add('btn','btn-warning','float-end', "ms-3");
            deletebtn.classList.add("btn",'btn-danger', "float-end" );
            
            editbtn.innerHTML = "edit";
            deletebtn.innerHTML = "delete"

            editbtn.setAttribute('onclick', 'editTask(' + t.id + ')')
            deletebtn.setAttribute('onclick', 'removeTask(' + t.id + ')')
        }
       

        listItem.innerHTML = `<td>${t.title}</td> <td> ${t.states}</td> <td> ${t.startDate} </td> <td> ${t.endDate}<td>`;
        listItem.appendChild(editbtn)
        listItem.appendChild(deletebtn)
        tasksList?.appendChild(listItem);
    });




}
function editTask (taskid){
        
    var task: any = localStorage.getItem("tasks")
    var tasks: any = JSON.parse(task);
    let edit = prompt("Title:" );
    console.log(tasks[taskid].title)
    if (edit != null || edit != "") {
        tasks[taskid].title = edit ;
        var taskNew = tasks;
        console.log(edit)
        localStorage.setItem("tasks", JSON.stringify(taskNew))
        view()
    }
}

function removeTask(taskid){
    var task: any = localStorage.getItem("tasks")
    var tasks: any = JSON.parse(task);
    if (confirm("Delete the task!")) {
        var taskNew = tasks.filter((e, i) => i !== taskid);
        localStorage.setItem("tasks", JSON.stringify(taskNew))
        view()
    }
}