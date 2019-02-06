import React from "react";
import TrainsSearch from "./trains_search.jsx";

/*
  @props:
    stations: all station's info
*/
class TrainsSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.url = "https://rata.digitraffic.fi/api/v1/live-trains?station=";

    this.state = {
      foundTrains: []
    };
  }

  componentDidMount() {
    console.log("MOUNTED");
    this.getTrains("TPE");
  }

  /*
    Gets trains of given city from the url
  */
  getTrains(city) {
    fetch(this.url + city)
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
        onSubmitSearch={station => this.searchTrains(station)}
        stations={this.props.stations}
        foundTrains={this.state.foundTrains}
      />
    );
  }
}

export default TrainsSearchContainer;
