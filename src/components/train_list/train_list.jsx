import React from "react";
import Style from "./style.scss";

const TrainList = props => (
  <div className="train_list">
    <ul>{props.trains}</ul>
  </div>
);

export default TrainList;
