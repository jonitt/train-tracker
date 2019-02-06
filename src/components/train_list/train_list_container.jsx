import React from "react";
import TrainList from "./train_list.jsx";

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

      this.state.arrivalTrainRows[i] = <tr key={this.generateKey()}/>;
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
