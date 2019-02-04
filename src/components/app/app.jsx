import React from "react";
import Style from "./style.scss";
import PageHeaderContainer from "../page_header/page_header_container.jsx";
import TrainListContainer from "../train_list/train_list_container.jsx";
import SearchBarContainer from "../search_bar/search_bar_container.jsx";

const App = props => (
  <div className="app">
    <PageHeaderContainer />
    <SearchBarContainer />
    <TrainListContainer />
    Heloust heloust
  </div>
);

export default App;
