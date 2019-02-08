import React from "react";
import TrainList from "./train_list.jsx";
import TrainListRowContainer from "../train_list_row/train_list_row_container.jsx";

/*
  @props:
    stations: stations objects
    trains: trains going through the chosen station
    chosenStationCode: code of chosen station
    stationsSet: function to handle when trainrows are set
*/
class TrainListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);

    this.state = {
      arrivalTrainRows: [],
      departureTrainRows: [],
      displayPage: 0, //0 = arrivals, 1 = departures
      noTrainsFound: false
    };
  }

  componentDidMount() {
    this.setTrainRows(this.props.trains);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trains != this.props.trains) {
      this.setState({
        displayPage: 0
      });
      this.setTrainRows(this.props.trains);
    }
  }

  /*
    Creates a row for each train in both arrival and departure lists.
  */
  setTrainRows(trains) {
    let trainRows = [];
    let arrivalTrainRows = [];
    let departureTrainRows = [];
    for (let i = 0; i < trains.length; i++) {
      let train = trains[i];
      let schedules = this.getArrivalDepartureSchedule(
        this.props.chosenStationCode,
        train.timeTableRows
      );
      if (schedules[0] != null) {
        console.log("acc time before removedates" + schedules[0].actualTime);
      }
      //first check if train's arrival/departure time is in the past
      schedules = this.removeDatesInPast(schedules);
      if (schedules[0] == null && schedules[1] == null) {
        continue;
      }

      //get departure and arrival station's names
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

      //schedule entry being null, means time of train at station
      //was not fit to be shown
      if (schedules[0] != null) {
        //name, dStation, aStation, time, delayedTime, cancelled, delayed
        arrivalTrainRows.push([
          this.createRow(
            train.trainType + " " + train.trainNumber,
            depStationName,
            arrivalStationName,
            schedules[0].scheduledTime,
            this.configureTime(schedules[0].actualTime),
            schedules[0].cancelled ? true : false,
            schedules[0].actualTime != undefined &&
              schedules[0].actualTime != null
              ? true
              : false
          ),
          schedules[0].scheduledTime
        ]);
      }
      if (schedules[1] != null) {
        departureTrainRows.push([
          this.createRow(
            train.trainType + " " + train.trainNumber,
            depStationName,
            arrivalStationName,
            schedules[1].scheduledTime,
            this.configureTime(schedules[1].actualTime),
            schedules[1].cancelled ? true : false,
            schedules[1].actualTime != undefined &&
              schedules[1].actualTime != null
              ? true
              : false
          ),
          schedules[1].scheduledTime
        ]);
      }
    } //end of forloop
    //order created train rows by date
    arrivalTrainRows = this.addTrainRows(arrivalTrainRows);
    departureTrainRows = this.addTrainRows(departureTrainRows);

    this.setState({
      arrivalTrainRows: arrivalTrainRows,
      departureTrainRows: departureTrainRows
    });
    //tell parent stations are seo_title
    this.props.stationsSet();
  }

  /*
    Checks is train's arrival and/or departure time is in past.
    Returns an array with values of the schedules.
    Times in past in schedule will be replaced by null.
  */
  removeDatesInPast(schedules) {
    let arr = [
      this.checkIsScheduleInPast(schedules[0]) ? null : schedules[0],
      this.checkIsScheduleInPast(schedules[1]) ? null : schedules[0]
    ];
    return arr;
  }

  /*
    Returns true if train's time at station is in the past.
  */
  checkIsScheduleInPast(schedule) {
    if (schedule == null) {
      return true;
    }

    let time = schedule.scheduledTime;
    if (schedule.actualTime != undefined && schedule.actualTime != null) {
      time = schedule.actualTime;
    }

    let arr = this.getDateAsArray(time);

    let date = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);

    //if moment is in past, return true
    if (
      date.valueOf() +
        Math.abs(date.getTimezoneOffset() * 60 * 1000) -
        Date.now() <
      0
    ) {
      return true;
    }
    return false;
  }

  /*
    Time format: 2018-11-02T10:31:29.000Z
    => [2018, 11, 2, 10, 31, 29]
  */
  getDateAsArray(date) {
    let arr = [];
    arr[0] = parseInt(date.substring(0, 4));
    arr[1] = parseInt(date.substring(5, 7)) - 1; //month is 0 based
    arr[2] = parseInt(date.substring(8, 10));
    arr[3] = parseInt(date.substring(11, 13));
    arr[4] = parseInt(date.substring(14, 16));
    arr[5] = parseInt(date.substring(17, 19));
    return arr;
  }

  /*
    Orders the timed train rows of form [(), ()], and makes them of form ()
    (without date attached in)
  */
  addTrainRows(timedTrainRows, headerTimeText) {
    //this will create order list of rows, but object is still of form [(), ()]
    let tempRows = this.orderTrainRows(timedTrainRows);

    //creates the actual list of rows initiated with header row
    let trainRows = [this.createHeaderRow(headerTimeText)];

    //add rows to the rows list
    for (let i = 0; i < tempRows.length; i++) {
      trainRows.push(tempRows[i][0]);
    }

    return trainRows;
  }

  /*
    Returns the arrival and departue) timetable object in given city
    as an array. If no entry is found, return array with null.
  */
  getArrivalDepartureSchedule(stationCode, timeTable) {
    let schedules = [];
    let stationCodeLowerCase = stationCode.toLowerCase();
    for (let i = 0; i < timeTable.length; i++) {
      let t = timeTable[i];
      //if code matches, check whether it's arrival or departure after
      if (t.stationShortCode.toLowerCase() === stationCodeLowerCase) {
        //if it is the first entry, it is a departure and not an arrival
        if (i == 0) {
          schedules.push(null);
          schedules.push(t);
          return schedules;
        }
        //otherwise it is an arrival
        schedules.push(t);
        //if arrival is last entry, there is no departure
        if (i < timeTable.length - 1) {
          schedules.push(timeTable[i + 1]);
        } else {
          schedules.push(null);
        }
        return schedules;
      } //end of if code matches
    } //end of forloop
    schedules.push(null);
    schedules.push(null);
    return schedules;
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
    if(day == null) {
      return null;
    }
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
    Time format: 2018-11-02T10:31:29.000Z
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
    Create a train list row with given attributes
  */
  createRow(name, dStation, aStation, time, delayedTime, cancelled, delayed) {
    return (
      <TrainListRowContainer
        name={name}
        departureStation={dStation}
        arrivalStation={aStation}
        time={this.configureTime(time)}
        delayedTime={delayedTime}
        cancelled={cancelled}
        delayed={delayed}
        key={this.generateKey()}
      />
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

  /*
    Handles change between arrivals and departures pages.
  */
  changePage(pageNum) {
    console.log("Showing in list page num: " + pageNum);
    this.setState({
      displayPage: pageNum
    });
  }

  render() {
    return (
      <TrainList
        displayPage={this.state.displayPage}
        handlePageChange={this.changePage}
        trainRows={
          this.state.displayPage == 0
            ? this.state.arrivalTrainRows
            : this.state.departureTrainRows
        }
      />
    );
  }
}

export default TrainListContainer;
