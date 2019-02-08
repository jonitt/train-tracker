import React from "react";
import Style from "./style.scss";

/*
  clickArrivals: handler for clicking arrivals button
  clickDepartures: handler for clicking departures button
  classArrivals: class for arrivals button
  classDepartures: class for departures button
*/
const TrainListPagination = (props) => (
  <div className="train_list_pagination">
    <div onClick={(e) => props.clickArrivals(e, props.arrivalsKey)} className={props.classArrivals}>
      Saapuvat
    </div>
    <div onClick={(e) => props.clickDepartures(e, props.departuresKey)} className={props.classDepartures}>
      Lähtevät
    </div>
  </div>
);

export default TrainListPagination;
