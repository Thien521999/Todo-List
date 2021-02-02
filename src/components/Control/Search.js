import React, { useState } from "react";

Search.propTypes = {};

function Search(props) {
  const { onSearch } = props;
  const [keyword, setKeyword] = useState("");

  const initialValues = {
    keyword: "",
  };

  const [values, setValues] = useState(initialValues);

  function onChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({
      [name]: value,
    });
  }

  function onHandleSearch() {
    //console.log(values.keyword);
    onSearch(values.keyword);
  }

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="input-group">
        <input
          type="text"
          name="keyword"
          className="form-control"
          placeholder="Nhập từ khóa..."
          value={values.keyword}
          onChange={onChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={onHandleSearch}
          >
            <span className="fa fa-search mr-5"></span>Tìm
          </button>
        </span>
      </div>
    </div>
  );
}

export default Search;
