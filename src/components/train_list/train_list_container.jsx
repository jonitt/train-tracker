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
    this.setHeaderRow();
    this.setTrainRows(this.props.trains);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trains != this.props.trains) {
      this.setTrainRows(this.props.trains);
    }
  }

  setHeaderRow() {
    this.state.arrivalTrainRows[0] = (
      <TrainListRowContainer
        key={this.generateKey()}
        isHeader={true}
        name={"Juna"}
        departureStation={"Lähtöasema"}
        arrivalStation={"Pääteasema"}
        time={"Saapuu"}
        delayedTime={""}
        cancelled={""}
        delayed={""}
      />
    );
    this.setState({
      arrivalTrainRows: this.state.arrivalTrainRows
    });
  }

  setTrainRows(trains) {
    let train_name,
      dep_station,
      arr_station,
      arr_time = "";
    for (let i = 0; i < trains.length; i++) {
      let train = trains[i];
      console.log(train.trainType + " " + train.trainNumber);
      this.state.arrivalTrainRows[i + 1] = (
        <TrainListRowContainer
          key={this.generateKey()}
          name={train.trainType + " " + train.trainNumber}
          departureStation={""}
          arrivalStation={""}
          time={""}
          delayedTime={""}
          cancelled={""}
          delayed={""}
        />
      );
    }
    this.setState({
      arrivalTrainRows: this.state.arrivalTrainRows
    });
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
