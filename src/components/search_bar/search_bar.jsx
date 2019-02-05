import React from "react";
import Style from "./style.scss";
import DeleteIcon from "../../svg/delete-icon.svg";

const SearchBar = props => (
  <div className="search_bar">
    <label className="search_bar_info">Hae aseman nimellä</label>
    <div className="search_bar_input_container">
      <input type="text" className="search_bar_input" />
      <DeleteIcon className="search_bar_delete_icon" />
    </div>
  </div>
);

export default SearchBar;
