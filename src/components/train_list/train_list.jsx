import React from "react";
import Style from "./style.scss";
import TrainListPaginatinoContainer from "../train_list_pagination/train_list_pagination_container.jsx";

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
        <tr className="train_list_row">
          <td className="train_list_cell">SH 243</td>
          <td className="train_list_cell">Oulu</td>
          <td className="train_list_cell">Tampere</td>
          <td className="train_list_cell">20:20</td>
        </tr>
        <tr className="train_list_row">
          <td className="train_list_cell">AJ 231</td>
          <td className="train_list_cell">Jyväskylä</td>
          <td className="train_list_cell">Helsinki</td>
          <td className="train_list_cell train_list_cell_delayed">
            <p className="trains_list_cell_delayed_content">22:30</p>
            <p className="trains_list_cell_delayed_content">(22:24)</p>
          </td>
        </tr>
        <tr className="train_list_row">
          <td className="train_list_cell train_list_cell_cancelled">SH 333</td>
          <td className="train_list_cell train_list_cell_cancelled">
            Rovaniemi
          </td>
          <td className="train_list_cell train_list_cell_cancelled">Turku</td>
          <td className="train_list_cell train_list_cell_cancelled_time train_list_cell_cancelled">
            <p className="train_list_cell_cancelled_time_content">23:21</p>
            <p className="train_list_cell_cancelled_time_content">Cancelled</p>
          </td>
        </tr>
        {props.trainRows}
      </tbody>
    </table>
  </div>
);

export default TrainList;
