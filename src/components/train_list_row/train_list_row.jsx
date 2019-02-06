import React from "react";
import Style from "./style.scss";

/*
  @props:
    cellClass: class of first 3 cells
    timeCellClass: class of 4th cell
    timeContent: content of 4th cell
    name: name of train
    departureStation: first staion
    arrivalStation: last station


*/
const TrainListRow = props => (
  <tr className="train_list_row">
    <td className={props.cellClass}>{props.name}</td>
    <td className={props.cellClass}>{props.departureStation}</td>
    <td className={props.cellClass}>{props.arrivalStation}</td>
    <td className={props.timeCellClass}>{props.timeContent}</td>
  </tr>
);

export default TrainListRow;
