import PropTypes from "prop-types";
import React, { useState } from "react";
import TaskItem from "./TaskItem";

TaskList.propTypes = {
  tasks: PropTypes.array,
  onFilter: PropTypes.func,
};

TaskList.defaultProps = {
  tasks: [],
  onFilter: null,
};

function TaskList(props) {
  const { tasks, onUpdateStatus, onDelete, onUpdate, onFilter } = props;
  //const [filterName, setFilterName] = useState("");
  //const [filterStatus, setFilterStatus] = useState(-1); //Tat ca : -1 , An : 0, kich hoat: 1,

  const initialValues = {
    filterName: "",
    filterStatus: -1,
  };

  const [values, setValues] = useState(initialValues);

  const elemTasks = tasks.map((task, index) => {
    return (
      <TaskItem
        key={task.id}
        index={index}
        task={task}
        onUpdateStatus={onUpdateStatus}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  });

  function onChange(event) {
    const target = event.target;
    let name = target.name;
    let value = target.value;
    onFilter(
      name === "filterName" ? value : values.filterName,
      name === "filterStatus" ? value : values.filterStatus
    );

    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <table className="table table-bordered table-hover mt-15">
      <thead>
        <tr>
          <th className="text-center">STT</th>
          <th className="text-center">Tên</th>
          <th className="text-center">Trạng Thái</th>
          <th className="text-center">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              className="form-control"
              name="filterName"
              value={values.filterName}
              onChange={onChange}
            />
          </td>
          <td>
            <select
              className="form-control"
              name="filterStatus"
              value={values.filterStatus}
              onChange={onChange}
            >
              <option value="-1">Tất Cả</option>
              <option value="0">Ẩn</option>
              <option value="1">Kích Hoạt</option>
            </select>
          </td>
          <td></td>
        </tr>
        {/* TaskItem */}
        {/* <TaskItem /> */}
        {elemTasks}
      </tbody>
    </table>
  );
}

export default TaskList;
