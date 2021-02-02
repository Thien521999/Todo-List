import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
TaskForm.propTypes = {
  onCloseForm: PropTypes.func,
  onSubmit: PropTypes.func,
  taskEditing: PropTypes.object,
};

TaskForm.defaultProps = {
  onCloseForm: null,
  onSubmit: null,
  taskEditing: null,
};

function TaskForm(props) {
  const { onCloseForm, onSubmit, taskEditing } = props;
  const initialValues = {
    id: "",
    name: "",
    status: true,
  };

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (taskEditing) {
      //neu props taskEditing này ton tai(dúng)
      setValues({
        id: taskEditing.id,
        name: taskEditing.name,
        status: taskEditing.status,
      });
      //console.log(taskEditing.id);
    }
  }, [taskEditing]);

  function onExitForm() {
    onCloseForm(); //tu component cha truyen qua(props)
  }

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    setValues({
      ...values,
      [name]: value,
    });
  }

  function onHandleSubmit(event) {
    event.preventDefault();

    //console.log(values);
    onSubmit(values);
    //Dong form && clear du lieu in input
    onClear();
    onExitForm();
  }

  function onClear() {
    setValues({
      name: "",
      status: false,
    });
  }

  const { id } = useState(1);
  //console.log(taskEditing.id);
  //console.log(id);

  //phan biet giua "them" va "sửa" dua vào id

  return (
    <div className="panel panel-warning">
      <div className="panel-heading">
        <h3 className="panel-title">
          {id !== "" ? "Cập nhật công việc" : "Thêm công việc"}

          <span className="text-right">
            <i className="fas fa-times" onClick={onExitForm}></i>
          </span>
        </h3>
      </div>
      <div className="panel-body">
        <form onSubmit={onHandleSubmit}>
          <div className="form-group">
            <label>Tên :</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <label>Trạng Thái :</label>
          <select
            className="form-control"
            required="required"
            name="status"
            values={values.status}
            onChange={handleChange}
          >
            <option value={true}>Kích Hoạt</option>
            <option value={false}>Ẩn</option>
          </select>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              Thêm
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={onClear}>
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
