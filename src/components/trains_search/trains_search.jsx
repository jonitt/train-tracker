import React from "react";
import Style from "./style.scss";
import TrainListContainer from "../train_list/train_list_container.jsx";
import SearchBarContainer from "../search_bar/search_bar_container.jsx";

const TrainsSearch = props => (
  <div className="trains_search">
    <SearchBarContainer
      stations={props.stations}
      onSubmit={props.onSubmitSearch}
      stationsAreSet={props.stationsAreSet}
    />
    <TrainListContainer
      chosenStationCode={props.chosenStationCode}
      stations={props.stations}
      trains={props.foundTrains}
      stationsSet={props.stationsSet}
    />
  </div>
);

export default TrainsSearch;
