import React from "react";
import TrainsSearch from "./trains_search.jsx";

/*
  @props:
    stations: all station's info
*/
class TrainsSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.url = "https://rata.digitraffic.fi/api/v1/live-trains/station/?minutes_before_departure=400&minutes_after_departure=0&minutes_before_arrival=400&minutes_after_arrival=0";

    this.state = {
      foundTrains: []
    };
  }

  componentDidMount() {
    this.getTrains("TPE");
  }

  /*
    Gets trains of given city from the url
  */
  getTrains(station) {
    fetch(this.url.replace("station/", "station/" + station))
      .then(res => res.json())
      .then(json => {
        console.log(json[0]);
        this.setState({ foundTrains: json });
      });
  }

  searchTrains(station) {
    console.log("searching trains for: #{station}");
  }

  render() {
    return (
      <TrainsSearch
        chosenStationCode="TPE"
        onSubmitSearch={station => this.searchTrains(station)}
        stations={this.props.stations}
        foundTrains={this.state.foundTrains}
      />
    );
  }
}

export default TrainsSearchContainer;
