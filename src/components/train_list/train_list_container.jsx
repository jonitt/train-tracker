import React from "react";
import TrainList from "./train_list.jsx";
import TrainListRowContainer from "../train_list_row/train_list_row_container.jsx";

class TrainListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivalTrainRows: [],
      departureTrainRows: []
    };
  }

  componentDidMount() {
    this.setTrainRows(this.props.trains);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trains != this.props.trains) {
      this.setTrainRows(this.props.trains);
    }
  }

  setTrainRows(trains) {
    let train_name,
      dep_station,
      arr_station,
      arr_time = "";
    for (let i = 0; i < trains.length; i++) {
      console.log(trains[i].trainType + " " + trains[i].trainNumber);
      this.state.arrivalTrainRows[i] =
        <tr key={this.generateKey()}>
          <td></td>
          <td></td>
        </tr>;
    }
  }

  //create random key
  generateKey() {
    return Math.random()
      .toString(36)
      .substr(2, 16);
  }

  render() {
    return <TrainList trainRows={this.state.arrivalTrainRows} />;
  }
}

export default TrainListContainer;
