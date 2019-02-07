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
    this.setTrainRows(this.props.trains);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trains != this.props.trains) {
      this.setTrainRows(this.props.trains);
    }
  }

  /*
    Creates a row for each train in both arrival and departure lists.
  */
  setTrainRows(trains) {
    let trainRows = [];
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
      //log times of train to console
      console.log(
        train.trainType +
          " " +
          train.trainNumber +
          " " +
          "\n DEPART: " +
          this.configureTime(train.timeTableRows[0].scheduledTime) +
          "\n CHOSEN: " +
          this.configureTime(schedules[0].scheduledTime) +
          "\n ARR: " +
          this.configureTime(
            train.timeTableRows[train.timeTableRows.length - 1].scheduledTime
          )
      );
      console.log(schedules[0]);

      //lajittele ajan mukaa, tallenna eka ulkosee var
      trainRows[i] = [
        <TrainListRowContainer
          name={train.trainType + " " + train.trainNumber}
          departureStation={depStationName}
          arrivalStation={arrivalStationName}
          time={this.configureTime(schedules[0].scheduledTime)}
          delayedTime={""}
          cancelled={""}
          delayed={""}
          key={this.generateKey()}
        />,
        schedules[0].scheduledTime
      ];
    }
    //order created train rows by date
    trainRows = this.orderTrainRows(trainRows);
    //add header row first to list
    this.state.arrivalTrainRows = [this.createHeaderRow("saapuu")];
    //get row components from array, and add after header row
    for(let i = 0; i < trainRows.length; i++) {
      this.state.arrivalTrainRows.push(trainRows[i][0]);
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
    Change train time to Finland's timezone and get hours and minutes only.
  */
  configureTime(day) {
    let time = this.formatTime(day);
    //change timezone to Finland's
    let hours = parseInt(time.slice(0, 2));
    hours += 2;
    if (hours == 24) {
      hours = 0;
    } else if (hours == 25) {
      hours = 1;
    } else if (hours == 26) {
      hours = 2;
    }
    if (hours < 10) {
      return "0" + hours + time.slice(2);
    }
    return hours + time.slice(2);
  }

  /*
    Get hours and minutes from train time.
  */
  formatTime(day) {
    return day.substring(day.indexOf("T") + 1, day.indexOf("T") + 6);
  }

  /*
    Order train rows by times array's values.
    Trainrows should be an array, with date in second pos
    Time format: 2018-11-02T10:31:29.000Z
  */
  orderTrainRows(trainRows) {
    //first sort the given times, placing earliest time first
    trainRows.sort((a, b) => this.compareTimes(a[1], b[1]));
    return trainRows;
  }

  /*
    Compares time a to time b, and returns -1 if a is earlier than b, and
    returns 1 in other cases.
    Time format: 2018-11-02T10:31:29.000Z
    Date is turned into one number:
    2018-12-12 => 20181212
    because:
    20181102 < 20181103
    20181131 < 20181201
    20181231 < 20190101
    Same with time:
    12:12 => 1212
  */
  compareTimes(a, b) {
    // we will compare date of times (and hours + minutes of time)
    let aDate = this.getDateAsInt(a);
    let bDate = this.getDateAsInt(b);

    //if day is different, smaller day is first regardless of time,
    //unless month is changed
    if (aDate < bDate) {
      return -1;
    } else if (aDate > bDate) {
      return 1;
    }

    // hours and minutes are combined to one number eg. 23:12 => 2312
    let aTime = this.getTimeAsInt(a);
    let bTime = this.getTimeAsInt(b);

    //as the date is same, smaller time comes first
    if (aTime < bTime) {
      return -1;
    }
    return 1;
  }

  /*
    Time format: 2018-11-02T10:31:29.000Z
    2012-12-12 => 20121212
  */
  getDateAsInt(date) {
    return parseInt(
      date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10)
    );
  }

  /*
    Time format: 2018-11-02T10:31:29.000Z
    23:23 => 2323
  */
  getTimeAsInt(time) {
    let timeIndex = time.indexOf("T") + 1;
    return parseInt(
      time.substring(timeIndex, timeIndex + 2) +
        time.substring(timeIndex + 3, timeIndex + 5)
    );
  }

  /*
    Creates a header row with timeText as 4th heading.
  */
  createHeaderRow(timeText) {
    return (
      <TrainListRowContainer
        isHeader={true}
        name={"Juna"}
        departureStation={"Lähtöasema"}
        arrivalStation={"Pääteasema"}
        time={timeText}
        key={this.generateKey()}
      />
    );
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
