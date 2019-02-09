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
      {props.hasErrorStationNotFound ? (
        <div className="search_bar_error">Asemaa ei löytynyt!</div>
      ) : null}
      {props.stationsAreSet ? null : (
        <div className="search_bar_searching_text">Etsitään junia...</div>
      )}
      <DeleteIcon
        onClick={props.onClickDelete}
        className="search_bar_delete_icon"
      />
    </div>
  </div>
);

export default SearchBar;
