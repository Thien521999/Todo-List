import React from "react";
import Search from "./Search";
import Sort from "./Sort";
import PropTypes from "prop-types";

Control.propTypes = {
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
};

Control.defaultProps = {
  onSearch: null,
  onSort: null,
};

function Control(props) {
  const { onSearch, onSort } = props;

  return (
    <div className="row mt-15">
      {/* Serach */}
      <Search onSearch={onSearch} />
      {/* Sort */}
      <Sort onSort={onSort} />
    </div>
  );
}

export default Control;
