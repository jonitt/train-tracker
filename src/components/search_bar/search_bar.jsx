import React from "react";
import Style from "./style.scss";

const SearchBar = props => (
  <div className="search_bar">
    <label className="search_bar_info">Hae aseman nimellä</label>
    <input type="text" className="search_bar_input" />
  </div>
);

export default SearchBar;
