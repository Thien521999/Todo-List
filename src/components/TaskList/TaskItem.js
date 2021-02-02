import React from "react";
import PropTypes from "prop-types";

TaskItem.propTypes = {
  onUpdateStatus: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate:PropTypes.func,

};

TaskItem.defaultProps = {
  onUpdateStatus: null,
  onDelete: null,
  onUpdate:null,
};

function TaskItem(props) {
  const { task, index, onUpdateStatus, onDelete, onUpdate } = props;

  function onHandleStatus() {
    //console.log(task.id);
    onUpdateStatus(task.id);
  }

  function onHandleDelete() {
    onDelete(task.id);
  }

  function onHandleUpdate() {
    onUpdate(task.id)
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{task.name}</td>
      <td className="text-center">
        <span
          className={
            task.status === true
              ? "label label-danger label-status"
              : "label label-success label-status"
          }
          onClick={onHandleStatus}
        >
          {task.status === true ? "Kích Hoạt" : "Ẩn"}
        </span>
      </td>
      <td className="text-center">
        <button type="button" className="btn btn-warning" onClick={onHandleUpdate}>
          <span className="fa fa-pencil mr-5"></span>Sửa
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={onHandleDelete}>
          <span className="fa fa-trash mr-5" ></span>Xóa
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
