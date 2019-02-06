import React from "react";
import Style from "./style.scss";
import TrainListPaginatinoContainer from "../train_list_pagination/train_list_pagination_container.jsx";
import TrainListRowContainer from "../train_list_row/train_list_row_container.jsx";

const TrainList = props => (
  <div className="train_list">
    <TrainListPaginatinoContainer />
    <table className="train_list_trains">
      <colgroup>
        <col className="train_list_col_train" />
        <col className="train_list_col_departure" />
        <col className="train_list_col_arrival" />
        <col className="train_list_col_arrival_time" />
      </colgroup>
      <tbody>
        <tr className="train_list_row">
          <th className="train_list_cell">Juna</th>
          <th className="train_list_cell">Lahtöasema</th>
          <th className="train_list_cell">Pääteasema</th>
          <th className="train_list_cell">Saapuu</th>
        </tr>
        <TrainListRowContainer
          time="23:22"
          delayed={false}
          cancelled={false}
          arrivalStation="Helsinki"
          departureStation="Takametsä"
          delayedTime=""
          name="train 123"
        />
        <TrainListRowContainer
          time="23:22"
          delayed={true}
          cancelled={false}
          arrivalStation="Helsinki"
          departureStation="Takametsä"
          delayedTime="23:34"
          name="train 123"
        />
        <TrainListRowContainer
          time="23:22"
          delayed={false}
          cancelled={true}
          arrivalStation="Helsinki"
          departureStation="Takametsä"
          delayedTime=""
          name="train 123"
        />
        {props.trainRows}
      </tbody>
    </table>
  </div>
);

export default TrainList;
