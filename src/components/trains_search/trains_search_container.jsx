import React from "react";
import TrainsSearch from "./trains_search.jsx";

/*
  @props:
    stations: all station's info
*/
class TrainsSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.url =
      "https://rata.digitraffic.fi/api/v1/live-trains/station/?minutes_before_departure=30&minutes_after_departure=300&minutes_before_arrival=300&minutes_after_arrival=30";
    //this.url = "https://rata.digitraffic.fi/api/v1/live-trains?station=TPE";
    this.state = {
      foundTrains: [],
      chosenStationCode: "",
      stationsAreSet: true
    };
  }
/*
  componentDidMount() {
    this.getTrains("TPE");
  }
*/
  /*
    Gets trains of given city from the url
  */
  getTrains(stationCode) {
    fetch(this.url.replace("station/", "station/" + stationCode))
      .then(res => res.json())
      .then(json => {
        console.log(json[0]);
        this.setState({ foundTrains: json, chosenStationCode: stationCode });
      });
  }

  searchTrains(stationCode) {
    console.log("searching trains for: " + stationCode);
    this.setState({
      stationsAreSet: false
    });
    this.getTrains(stationCode);
  }

  /*
    To call when train list has fiinished setting station rows.
  */
  finishSettingStations() {
    this.setState({
      stationsAreSet: true
    });
  }

  render() {
    return (
      <TrainsSearch
        chosenStationCode={this.state.chosenStationCode}
        onSubmitSearch={stationCode => this.searchTrains(stationCode)}
        stations={this.props.stations}
        foundTrains={this.state.foundTrains}
        stationsSet={() => this.finishSettingStations()}
        stationsAreSet={this.state.stationsAreSet}
      />
    );
  }
}

export default TrainsSearchContainer;
