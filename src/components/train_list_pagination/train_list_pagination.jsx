import React from "react";
import Style from "./style.scss";

const TrainListPagination = () => (
  <div className="train_list_pagination">
    <div className="train_list_pagination_chosen train_list_pagination_entry">
      Saapuvat
    </div>
    <div className="train_list_pagination_unchosen train_list_pagination_entry">
      Lähtevät
    </div>
  </div>
);

export default TrainListPagination;
