import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control/Control";
import TaskList from "./components/TaskList/TaskList";
import { useEffect, useState } from "react";

function App() {
  let [tasks, setTasks] = useState([]);
  let [isDisplayForm, setDisplayForm] = useState(true);
  const [taskEditing, setTaskEditing] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(-1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState({
    by: "name",
    value: 1,
  });

  useEffect(() => {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  }, []);

  function onGenerateData() {
    let tasks = [
      {
        id: generateID(),
        name: "Hoc lap trinh",
        status: true,
      },
      {
        id: generateID(),
        name: "Hoc Tieng Anh",
        status: false,
      },
      {
        id: generateID(),
        name: "Lam viec nha",
        status: false,
      },
    ];

    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // key,value
  }

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function generateID() {
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4()
    );
  }

  function onToggleForm() {
    setDisplayForm(isDisplayForm ? false : true);
    setTaskEditing(null);
  }

  function onCloseForm() {
    setDisplayForm(false);
  }

  function onShowForm() {
    setDisplayForm(true);
  }

  function onSubmit(data) {
    //console.log(data);
    const newTasks = [...tasks];
    if (data.id === "") {
      data.id = generateID();
      newTasks.push(data);
    } else {
      //Editing
      const index = findIndex(data.id);
      newTasks[index] = data;
    }

    console.log(newTasks);

    setTasks(newTasks);
    setTaskEditing("");
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    // console.log(newTasks);
  }

  const elmTaskForm = isDisplayForm ? (
    <TaskForm
      onCloseForm={onCloseForm}
      onSubmit={onSubmit}
      taskEditing={taskEditing}
    />
  ) : (
    ""
  );

  function onUpdateStatus(id) {
    // console.log(id);
    const newTasks = [...tasks];
    const index = findIndex(id);
    console.log(index);
    if (index !== -1) {
      newTasks[index].status = !newTasks[index].status;
    }
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function onDelete(id) {
    const newTasks = [...tasks];
    const index = findIndex(id);
    if (index !== -1) {
      newTasks.splice(index, 1);
    }
    setTasks(newTasks);
    localStorage.setItem("taskds", JSON.stringify(newTasks));
    onCloseForm();
  }

  function onUpdate(id) {
    const newTasks = [...tasks]; //khi lam vic voi array,object thi phai clone ra 1 array or object moi
    const index = findIndex(id); //Tim vi tri task muon update
    const taskEditing = newTasks[index];
    // console.log(taskEditing);
    setTaskEditing(taskEditing); //re render(cap nhat lai)
    onShowForm(); //hien thi form TaskForm
  }

  function findIndex(id) {
    const newTasks = [...tasks];
    let result = -1; //gia tri khoi tao
    newTasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  function onFilter(filterName, filterStatus) {
    filterStatus = +filterStatus; //cách 1

    setName({
      ...name,
      filterName,
    });

    setStatus({
      ...status,
      filterStatus,
    });
    //console.log(filterName + "  -  " + filterStatus);

    if (name) {
      if (filterName) {
        let newTasks = [...tasks];
        tasks = newTasks.filter((task) => {
          return (
            task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
          );
        });
        console.log(tasks);
      }

      let newTasks = [...tasks];
      tasks = newTasks.filter((task) => {
        if (filterStatus === -1) {
          //console.log(task);
          return task;
        } else {
          console.log(task.status === filterStatus);
          return task.status === (filterStatus === 1 ? true : false);
        }
      });
      console.log(tasks);
    }
  }

  function onSearch(keyword) {
    console.log(keyword);
    setKeyword({
      keyword,
    });

    let newTasks = [...tasks];

    tasks = newTasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword) !== -1;
    });
    console.log(tasks);
  }

  function onSort(sort) {
    console.log(sort);
  }

  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div
          className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}
        >
          {/* Form */}
          {/* <TaskForm /> */}
          {elmTaskForm}
        </div>

        <div
          className={
            isDisplayForm
              ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
              : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
          }
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={onToggleForm}
          >
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
          </button>
          <button
            type="button"
            className="btn btn-danger ml-5"
            onClick={onGenerateData}
          >
            <span className="fa fa-plus mr-5"></span>Gernaral Data
          </button>
          {/* Search + Sort */}
          <Control onSearch={onSearch} onSort={onSort} />
          {/* List */}
          <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList
                tasks={tasks}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFilter={onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
