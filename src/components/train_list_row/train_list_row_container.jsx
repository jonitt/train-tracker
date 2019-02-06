import React from "react";
import TrainListRow from "./train_list_row.jsx";

/*
  @props:
    cancelled: is train cancelled
    delayed: is train delayed
    delayedTime: new time train is delayed to
    name: trains name / code number
    departureStation: station leaving from at first
    arrivalStation: station arriving to at last
    time: time train is scheduled for
*/
class TrainListRowContainer extends React.Component {
  constructor(props) {
    super(props);

    this.delayedTimeClass = "train_list_cell train_list_cell_delayed";

    this.cancelledTimeClass =
      "train_list_cell train_list_cell_cancelled_time train_list_cell_cancelled";

    this.cancelledClass = "train_list_cell train_list_cell_cancelled";

    this.cellClass = "train_list_cell";

    this.timeCellClass = "train_list_cell";

    this.timeContent = this.props.time;

    this.modifyUnscheduled();
  }

  /*
    Set content of time cell and modify class of all cells, if the train
    is not moving on schedule
  */
  modifyUnscheduled() {
    if (this.props.delayed) {
      this.timeCellClass = this.delayedTimeClass;
      this.timeContent = (
        <div>
          <p className="trains_list_cell_delayed_content">
            {this.props.delayedTime}
          </p>
          <p className="trains_list_cell_delayed_content">
            {"(" + this.props.time + ")"}
          </p>
        </div>
      );
    } else if (this.props.cancelled) {
      this.cellClass = this.cancelledClass;
      this.timeCellClass = this.cancelledTimeClass;
      this.timeContent = (
        <div>
          <p className="train_list_cell_cancelled_time_content">
            {this.props.time}
          </p>
          <p className="train_list_cell_cancelled_time_content">Cancelled</p>
        </div>
      );
    }
  }

  render() {
    return (
      <TrainListRow
        name={this.props.name}
        departureStation={this.props.departureStation}
        arrivalStation={this.props.arrivalStation}
        cellClass={this.cellClass}
        timeCellClass={this.timeCellClass}
        timeContent={this.timeContent}
      />
    );
  }
}

export default TrainListRowContainer;
