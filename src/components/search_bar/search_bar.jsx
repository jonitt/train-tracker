import React from "react";
import Style from "./style.scss";
import DeleteIcon from "../../svg/delete-icon.svg";

const SearchBar = props => (
  <div className="search_bar">
    <label className="search_bar_info">Hae aseman nimellä</label>
    <div className="search_bar_input_container">
      <input
        onSubmit={props.onSubmit}
        type="text"
        className="search_bar_input"
        value={props.searchBarText}
        onChange={props.changeSearchBarValue}
        onKeyPress={props.handleKeyPress}
      />
      <DeleteIcon
        onClick={props.onClickDelete}
        className="search_bar_delete_icon"
      />
    </div>
  </div>
);

export default SearchBar;
