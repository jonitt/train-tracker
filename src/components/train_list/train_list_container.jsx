import React from "react";
import TrainList from "./train_list.jsx";
import TrainListRowContainer from "../train_list_row/train_list_row_container.jsx";

/*
  @props:
    stations: stations objects
    trains: trains going through the chosen station
    chosenStationCode: code of chosen station
*/
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

  /*
    Creates the header row, and sets it first in stations.
  */
  setHeaderRow() {
    this.state.arrivalTrainRows[0] = (
      <TrainListRowContainer
        isHeader={true}
        name={"Juna"}
        departureStation={"Lähtöasema"}
        arrivalStation={"Pääteasema"}
        time={"Saapuu"}
        key={this.generateKey()}
      />
    );
    this.state.departureTrainRows[0] = (
      <TrainListRowContainer
        isHeader={true}
        name={"Juna"}
        departureStation={"Lähtöasema"}
        arrivalStation={"Pääteasema"}
        time={"Lähtee"}
        key={this.generateKey()}
      />
    );
    this.setState({
      arrivalTrainRows: this.state.arrivalTrainRows,
      departureTrainRows: this.state.departureTrainRows
    });
  }

  /*
    Creates a row for each train in both arrival and departure lists.
  */
  setTrainRows(trains) {
    let train_name,
      dep_station,
      arr_station,
      arr_time = "";
    for (let i = 0; i < trains.length; i++) {
      let train = trains[i];
      let depStation = train.timeTableRows[0];
      let depStationName = this.getStationName(
        depStation.stationShortCode,
        this.props.stations
      );
      let arrivalStation = this.getArrivalStation(train.timeTableRows);
      let arrivalStationName = this.getStationName(
        arrivalStation.stationShortCode,
        this.props.stations
      );
      let schedules = this.getArrivalDepartureSchedule(
        this.props.chosenStationCode,
        train.timeTableRows
      );

      this.state.arrivalTrainRows[i + 1] = (
        <TrainListRowContainer
          name={train.trainType + " " + train.trainNumber}
          departureStation={depStationName}
          arrivalStation={arrivalStationName}
          time={this.formatTime(schedules[0].scheduledTime)}
          delayedTime={""}
          cancelled={""}
          delayed={""}
          key={this.generateKey()}
        />
      );
    }
    this.setState({
      arrivalTrainRows: this.state.arrivalTrainRows
    });
  }

  /*
    Returns the arrival (and departure) timetable object in given city
    as an array.
  */
  getArrivalDepartureSchedule(stationCode, timeTable) {
    let schedules = [];
    let stationCodeLowerCase = stationCode.toLowerCase();
    for (let i = 0; i < timeTable.length; i++) {
      let t = timeTable[i];
      if (t.stationShortCode.toLowerCase() === stationCodeLowerCase) {
        schedules.push(t);
        if (i < timeTable.length) {
          console.log(t.stationShortCode + " " + i);
          schedules.push(timeTable[i + 1]);
        }
        return schedules;
      }
    }
  }

  /*
    Returns timetable object of last station
  */
  getArrivalStation(timeTable) {
    return timeTable[timeTable.length - 1];
  }

  /*
    Finds stations name by code from props station objects.
  */
  getStationName(code, stations) {
    let codeLowerCase = code.toLowerCase();
    for (let i = 0; i < stations.length; i++) {
      if (codeLowerCase === stations[i].stationShortCode.toLowerCase()) {
        return stations[i].stationName.replace(" asema", "");
      }
    }
  }

  /*
    Get hours and minutes from train time.
  */
  formatTime(day) {
    return day.substring(day.indexOf('T') + 1, day.indexOf('T') + 6);
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
