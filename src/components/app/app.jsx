import React from "react";
import Style from "./style.scss";
import PageHeaderContainer from "../page_header/page_header_container.jsx";
import TrainsSearchContainer from "../trains_search/trains_search_container.jsx";

const App = props => (
  <div className="app">
    <PageHeaderContainer />
    <TrainsSearchContainer stations={props.stations} />
  </div>
);

export default App;
