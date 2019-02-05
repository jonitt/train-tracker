import React from "react";
import Style from "./style.scss";
import PageHeaderContainer from "../page_header/page_header_container.jsx";
import TrainsSearch from "../trains_search/trains_search.jsx";

const App = props => (
  <div className="app">
    <PageHeaderContainer />
    <TrainsSearch />
  </div>
);

export default App;
