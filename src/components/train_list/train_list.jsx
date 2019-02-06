import React from "react";
import Style from "./style.scss";

const TrainList = props => (
  <div className="train_list">
    <div className="train_list_pagination">
      <div className="train_list_pagination_chosen train_list_pagination_entry">
        Saapuvat
      </div>
      <div className="train_list_pagination_unchosen train_list_pagination_entry">
        Lähtevät
      </div>
    </div>
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
          <td className="train_list_cell">ASD 123</td>
          <td className="train_list_cell">ASD 123</td>
          <td className="train_list_cell">ASD 123</td>
          <td className="train_list_cell">ASD 123</td>
        </tr>
        <tr className="train_list_row">
          <td className="train_list_cell">ASD 123</td>
          <td className="train_list_cell">ASD 123</td>
          <td className="train_list_cell">ASD 123</td>
          <td className="train_list_cell">ASD 123</td>
        </tr>
        {props.trains}
      </tbody>
    </table>
  </div>
);

export default TrainList;
