import React, { useEffect, useState } from "react";

Sort.propTypes = {};

function Sort(props) {
  const { onSort } = props;

  const [sort, setSort] = useState({
    by: "name",
    value: 1,
  });

  async function onHandleClick(sortBy, sortValue) {
    await setSort({
      by: sortBy,
      value: sortValue,
    });

    onSort(sort);

    // console.log(sortBy + " + " + sortValue);
    // console.log(sort);
  }

  // function onHandleClick(sortBy, sortValue) {
  //   console.log(sortBy + " + " + sortValue);
  // }

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li onClick={() => onHandleClick("name", 1)}>
            <a role="button">
              <span className="fa fa-sort-alpha-asc pr-5">
                Tên A-Z{" "}
                {sort.by === "name" && sort.value === 1 ? (
                  <i class="fas fa-check"></i>
                ) : (
                  ""
                )}
              </span>
            </a>
          </li>
          <li onClick={() => onHandleClick("name", -1)}>
            <a role="button">
              <span className="fa fa-sort-alpha-desc pr-5">
                Tên Z-A
                {sort.by === "name" && sort.value === -1 ? (
                  <i class="fas fa-check"></i>
                ) : (
                  ""
                )}
              </span>
            </a>
          </li>
          <li role="separator" className="divider"></li>
          <li onClick={() => onHandleClick("status", 1)}>
            <a role="button">
              Trạng Thái Kích Hoạt
              {sort.by === "status" && sort.value === 1 ? (
                <i class="fas fa-check"></i>
              ) : (
                ""
              )}
            </a>
          </li>
          <li onClick={() => onHandleClick("status", -1)}>
            <a role="button">
              Trạng Thái Ẩn
              {sort.by === "status" && sort.value === -1 ? (
                <i class="fas fa-check"></i>
              ) : (
                ""
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sort;
