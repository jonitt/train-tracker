import React from "react";
import Style from "./style.scss";
import TrainListPaginatinoContainer from "../train_list_pagination/train_list_pagination_container.jsx";
import TrainListRowContainer from "../train_list_row/train_list_row_container.jsx";

/*
  @props:
    trainRows: row components of trains
*/
const TrainList = props => (
  <div className="train_list">
    <TrainListPaginatinoContainer
      displayPage={props.displayPage}
      handleChange={props.handlePageChange}
    />
    <table className="train_list_trains">
      <colgroup>
        <col className="train_list_col_train" />
        <col className="train_list_col_departure" />
        <col className="train_list_col_arrival" />
        <col className="train_list_col_arrival_time" />
      </colgroup>
      <tbody>{props.trainRows}</tbody>
    </table>
    {props.trainRows.length < 2 ? (
      <div className="train_list_no_trains">
        Haetulta asemalta ei löytynyt ajankohtaisia junia.
      </div>
    ) : null}
  </div>
);

export default TrainList;
